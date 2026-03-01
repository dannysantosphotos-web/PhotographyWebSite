import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { items, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      throw new Error("No items in cart");
    }

    if (!shippingAddress) {
      throw new Error("Shipping address is required");
    }

    // Build line items from cart
    const lineItems = items.map((item: { title: string; size: string; price: number; quantity: number; id: string }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.title} — ${item.size}`,
          metadata: {
            print_id: item.id,
            size: item.size,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create checkout session with shipping info in metadata
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      metadata: {
        shipping_name: shippingAddress.fullName,
        shipping_email: shippingAddress.email,
        shipping_address: shippingAddress.address,
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.state,
        shipping_zip: shippingAddress.zipCode,
        shipping_country: shippingAddress.country,
      },
      customer_email: shippingAddress.email,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "DE", "FR", "IT", "ES", "AU", "NL", "BE", "AT", "PT", "SE", "DK", "NO", "FI", "IE", "NZ"],
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
