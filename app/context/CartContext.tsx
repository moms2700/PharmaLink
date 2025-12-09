'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

export type CartItem = { id: number; name: string; price: number; imageUrl?: string; qty: number };
type CartCtx = { items: CartItem[]; add: (item: Omit<CartItem,'qty'>) => void; remove: (id: number) => void; clear: () => void; };

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (item: Omit<CartItem,'qty'>) =>
    setItems(prev => {
      const i = prev.findIndex(p => p.id === item.id);
      if (i >= 0) { const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + 1 }; return next; }
      return [...prev, { ...item, qty: 1 }];
    });
  const remove = (id: number) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);
  const value = useMemo(() => ({ items, add, remove, clear }), [items]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCart = () => { const v = useContext(Ctx); if (!v) throw new Error('useCart must be used within CartProvider'); return v; }
