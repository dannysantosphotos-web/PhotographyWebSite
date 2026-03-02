import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-store';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-6 pt-28 pb-24 max-w-2xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="w-20 h-20 gradient-teal rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-primary-foreground" />
          </div>
          <p className="text-body text-xs uppercase tracking-[0.3em] text-primary mb-2">Order Confirmed</p>
          <h1 className="text-display text-4xl md:text-5xl font-bold text-foreground mb-6">Thank You!</h1>
          <p className="text-body text-lg text-muted-foreground mb-4 max-w-md mx-auto">
            Your payment was successful. Your prints will be produced and shipped by our print-on-demand partner.
          </p>
          <p className="text-body text-sm text-muted-foreground mb-10">
            You will receive a confirmation email with tracking details shortly.
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 gradient-teal text-primary-foreground text-body text-sm font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
