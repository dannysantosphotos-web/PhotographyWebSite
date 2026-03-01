import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-store';
import type { ShippingAddress } from '@/lib/cart-store';
import { Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, removeItem, totalPrice, setShippingAddress } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShippingAddress(address);
    toast.success('Proceeding to payment...');
    // In future: redirect to Stripe checkout
    navigate('/checkout');
  };

  const fields: { name: keyof ShippingAddress; label: string; span?: boolean }[] = [
    { name: 'fullName', label: 'Full Name', span: true },
    { name: 'email', label: 'Email', span: true },
    { name: 'address', label: 'Street Address', span: true },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State / Province' },
    { name: 'zipCode', label: 'ZIP / Postal Code' },
    { name: 'country', label: 'Country' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24">
        <div className="mb-12">
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Checkout</p>
          <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground">Your Cart</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-3 space-y-4">
            {items.length === 0 ? (
              <p className="text-body text-muted-foreground py-12 text-center">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-card border border-border rounded-sm">
                  <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-sm" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-display text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-body text-xs text-muted-foreground">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-display text-sm font-bold text-primary">${item.price * item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-body text-sm text-muted-foreground uppercase tracking-widest">Total</span>
                <span className="text-display text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Shipping form */}
          <form onSubmit={handleCheckout} className="lg:col-span-2 space-y-4">
            <h2 className="text-display text-xl font-bold text-foreground mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              {fields.map(({ name, label, span }) => (
                <div key={name} className={span ? 'col-span-2' : ''}>
                  <label className="text-body text-xs uppercase tracking-widest text-muted-foreground mb-1 block">{label}</label>
                  <input
                    required
                    value={address[name]}
                    onChange={(e) => setAddress({ ...address, [name]: e.target.value })}
                    className="w-full bg-card border border-border rounded-sm px-3 py-2.5 text-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full mt-4 py-4 gradient-gold text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
            >
              Proceed to Payment <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
