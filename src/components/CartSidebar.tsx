import Icon from "@/components/ui/icon";
import { MENU_ITEMS, type MenuItem } from "@/components/MenuSection";

interface CartItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  qty: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  cartOpen: boolean;
  cartTotal: number;
  cartCount: number;
  orderPlaced: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (id: number) => void;
  onOrder: () => void;
}

export default function CartSidebar({
  cart,
  cartOpen,
  cartTotal,
  cartCount,
  orderPlaced,
  onOpen,
  onClose,
  onAddToCart,
  onRemoveFromCart,
  onOrder,
}: CartSidebarProps) {
  return (
    <>
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div className="relative w-full max-w-sm flex flex-col h-full" style={{ background: "var(--goo-card)", borderLeft: "1px solid var(--goo-border)" }}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid var(--goo-border)" }}>
              <h3 className="font-display text-xl" style={{ fontWeight: 700 }}>Your Order</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            {orderPlaced ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-6xl animate-bounce">🎉</div>
                <h3 className="font-display text-2xl gradient-text" style={{ fontWeight: 700 }}>Order Placed!</h3>
                <p style={{ color: "#A09070" }}>We're preparing your food. Estimated delivery: 15 minutes.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-5xl">🛍️</div>
                <p style={{ color: "#A09070" }}>Your cart is empty.<br />Add something delicious!</p>
                <button onClick={onClose} className="mt-2 px-6 py-3 rounded-full text-sm transition-all hover:scale-105" style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 600 }}>
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--goo-border)" }}>
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate" style={{ fontWeight: 600 }}>{item.name}</div>
                        <div className="text-xs" style={{ color: "#A09070" }}>${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onRemoveFromCart(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(255,107,26,0.15)", color: "var(--goo-orange)" }}>-</button>
                        <span className="text-sm w-4 text-center">{item.qty}</span>
                        <button onClick={() => onAddToCart(MENU_ITEMS.find(m => m.id === item.id)!)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--goo-orange)", color: "#0A0804" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5" style={{ borderTop: "1px solid var(--goo-border)" }}>
                  <div className="flex justify-between mb-2 text-sm" style={{ color: "#A09070" }}>
                    <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm" style={{ color: "#A09070" }}>
                    <span>Delivery</span><span style={{ color: "var(--goo-orange)" }}>Free</span>
                  </div>
                  <div className="flex justify-between mb-5 text-lg" style={{ fontWeight: 700 }}>
                    <span>Total</span><span className="gradient-text">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={onOrder}
                    className="w-full py-4 rounded-full text-base flex items-center justify-center gap-2 transition-all hover:scale-105"
                    style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 700, boxShadow: "0 8px 24px rgba(255,107,26,0.4)" }}
                  >
                    <Icon name="CreditCard" size={18} />
                    Checkout · ${cartTotal.toFixed(2)}
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color: "#4A3C28" }}>🔒 Secure payment · Free delivery</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {cartCount > 0 && !cartOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full text-sm shadow-2xl transition-all hover:scale-105 md:hidden"
          style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 700, boxShadow: "0 8px 32px rgba(255,107,26,0.5)" }}
        >
          <Icon name="ShoppingBag" size={18} />
          {cartCount} item{cartCount > 1 ? "s" : ""} · ${cartTotal.toFixed(2)}
        </button>
      )}
    </>
  );
}