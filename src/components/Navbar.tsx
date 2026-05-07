import Icon from "@/components/ui/icon";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({ cartCount, onCartOpen, mobileMenuOpen, onMobileMenuToggle, scrollTo }: NavbarProps) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: "rgba(10,8,4,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--goo-border)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display" style={{ fontWeight: 800 }}>
            <span className="gradient-text">Goo's</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full text-black" style={{ background: "var(--goo-yellow)", fontWeight: 600 }}>FOOD</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#A09070" }}>
          <button onClick={() => scrollTo("menu")} className="hover:text-white transition-colors">Menu</button>
          <button onClick={() => scrollTo("about")} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollTo("reviews")} className="hover:text-white transition-colors">Reviews</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">Contact</button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
            style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 600 }}
          >
            <Icon name="ShoppingBag" size={16} />
            {cartCount > 0 && <span>{cartCount}</span>}
            <span className="hidden sm:inline">Order</span>
          </button>
          <button className="md:hidden" onClick={onMobileMenuToggle}>
            <Icon name="Menu" size={22} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 text-2xl font-display" style={{ background: "rgba(10,8,4,0.98)" }}>
          <button onClick={() => scrollTo("menu")} className="hover:text-goo-orange transition-colors">Menu</button>
          <button onClick={() => scrollTo("about")} className="hover:text-goo-orange transition-colors">About</button>
          <button onClick={() => scrollTo("reviews")} className="hover:text-goo-orange transition-colors">Reviews</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-goo-orange transition-colors">Contact</button>
          <button onClick={onMobileMenuToggle} className="mt-4"><Icon name="X" size={28} /></button>
        </div>
      )}
    </>
  );
}
