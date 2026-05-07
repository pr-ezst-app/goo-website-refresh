import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection, { type MenuItem } from "@/components/MenuSection";
import CartSidebar from "@/components/CartSidebar";

interface CartItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  qty: number;
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, emoji: item.emoji, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const item = prev.find(c => c.id === id);
      if (!item) return prev;
      if (item.qty === 1) return prev.filter(c => c.id !== id);
      return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  };

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setCartOpen(false);
    }, 3000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--goo-dark)", color: "#F5EFE0" }}>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(prev => !prev)}
        scrollTo={scrollTo}
      />
      <HeroSection scrollTo={scrollTo} />
      <MenuSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        cart={cart}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        scrollTo={scrollTo}
      />
      <CartSidebar
        cart={cart}
        cartOpen={cartOpen}
        cartTotal={cartTotal}
        cartCount={cartCount}
        orderPlaced={orderPlaced}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onOrder={handleOrder}
      />
    </div>
  );
}