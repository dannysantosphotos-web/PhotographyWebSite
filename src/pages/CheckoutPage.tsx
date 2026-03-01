import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-store';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const { items, shippingAddress, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-primary-foreground" />
          </div>
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Payment</p>
          <h1 className="text-display text-4xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="bg-card border border-border rounded-sm p-8 space-y-6">
          <div>
            <h2 className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Order Summary</h2>
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between py-2 border-b border-border">
                <span className="text-body text-sm text-foreground">{item.title} ({item.size}) ×{item.quantity}</span>
                <span className="text-body text-sm text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <span className="text-body text-sm font-semibold text-foreground uppercase tracking-widest">Total</span>
              <span className="text-display text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {shippingAddress && (
            <div>
              <h2 className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-3">Shipping To</h2>
              <p className="text-body text-sm text-foreground">{shippingAddress.fullName}</p>
              <p className="text-body text-sm text-muted-foreground">
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}, {shippingAddress.country}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-border text-center space-y-4">
            <p className="text-body text-sm text-muted-foreground">
              Stripe payment integration will be enabled next. Your order will be fulfilled by Gelato print-on-demand.
            </p>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 px-8 py-3 gradient-gold text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
