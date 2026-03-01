import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface PrintItem {
  id: string;
  title: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CartContextType {
  items: PrintItem[];
  shippingAddress: ShippingAddress | null;
  addItem: (item: Omit<PrintItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PrintItem[]>([]);
  const [shippingAddress, setShippingAddressState] = useState<ShippingAddress | null>(null);

  const addItem = useCallback((item: Omit<PrintItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const setShippingAddress = useCallback((address: ShippingAddress) => {
    setShippingAddressState(address);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, shippingAddress, addItem, removeItem, setShippingAddress, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
