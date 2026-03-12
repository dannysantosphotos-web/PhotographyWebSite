import { useState } from 'react';
import { useCart } from '@/lib/cart-store';
import type { PrintData } from '@/lib/prints-data';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/language-context';
import { TextResources } from '@/lib/i18n';

interface Props {
  print: PrintData;
}

export default function PrintCard({ print }: Props) {
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCart();
  const { language } = useLanguage();
  const i18n = TextResources.get(language);
  const localized = i18n.prints[print.title] ?? { title: print.title, description: print.description };

  const handleAdd = () => {
    const size = print.sizes[selectedSize];
    addItem({
      id: print.id,
      title: localized.title,
      image: print.image,
      size: size.label,
      price: size.price,
    });
    toast.success(`${localized.title} (${size.label}) added to cart`);
  };

  return (
    <div className="group relative bg-card border border-border rounded-sm overflow-hidden transition-all duration-500 hover:border-glow hover:glow-teal">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={print.image}
          alt={print.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-display text-lg font-bold text-foreground">{localized.title}</h3>
            <p className="text-body text-xs uppercase tracking-widest text-muted-foreground mt-1">{print.type}</p>
          </div>
          {/* <span className="text-display text-lg font-bold text-primary">
            ${print.sizes[selectedSize].price}
          </span> */}
        </div>
        <p className="text-body text-sm text-muted-foreground">{localized.description}</p>
        {/* <div className="flex gap-2">
          {print.sizes.map((size, i) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(i)}
              className={`text-body text-xs px-3 py-1.5 border rounded-full transition-all ${
                i === selectedSize
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div> */}
        {/* <button
          onClick={handleAdd}
          className="w-full mt-2 py-3 text-body text-sm font-semibold uppercase tracking-widest gradient-teal text-primary-foreground rounded-full transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
}
