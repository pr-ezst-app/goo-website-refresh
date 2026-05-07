import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/9d674486-baf8-4ff0-a3f9-d15928a308ce/files/887e1d7b-5210-4fe4-a522-af92540ed967.jpg";

const MENU_CATEGORIES = ["All", "Burgers", "Bowls", "Tacos", "Sides", "Drinks"];

const MENU_ITEMS = [
  { id: 1, category: "Burgers", name: "The OG Smash", price: 14.90, badge: "🔥 Bestseller", desc: "Double smash patty, aged cheddar, house sauce, pickled onion", emoji: "🍔" },
  { id: 2, category: "Burgers", name: "Crispy Bird", price: 13.50, badge: "⚡ New", desc: "Buttermilk fried chicken, slaw, jalapeño honey, brioche bun", emoji: "🍗" },
  { id: 3, category: "Bowls", name: "Green Goddess", price: 12.90, badge: "🌿 Vegan", desc: "Quinoa, roasted chickpeas, avocado, lemon tahini, microgreens", emoji: "🥗" },
  { id: 4, category: "Bowls", name: "BBQ Pulled", price: 14.50, badge: null, desc: "Slow-cooked pork, smoky BBQ, pickles, crispy shallots, rice", emoji: "🍖" },
  { id: 5, category: "Tacos", name: "Fish Baja", price: 11.90, badge: "❤️ Fan Fav", desc: "Beer-battered cod, chipotle crema, mango salsa, cabbage", emoji: "🌮" },
  { id: 6, category: "Tacos", name: "Birria Bomb", price: 13.90, badge: "🔥 Spicy", desc: "Braised beef, consomé, oaxaca cheese, cilantro, white onion", emoji: "🌯" },
  { id: 7, category: "Sides", name: "Waffle Fries", price: 5.90, badge: null, desc: "Hand-cut waffle fries, smoked paprika salt, house aioli", emoji: "🍟" },
  { id: 8, category: "Sides", name: "Street Corn", price: 6.50, badge: "🌽 Seasonal", desc: "Elote-style, cotija, lime, chili dust, fresh herbs", emoji: "🌽" },
  { id: 9, category: "Drinks", name: "Ube Lemonade", price: 5.50, badge: "💜 Viral", desc: "Freshly squeezed lemon, ube syrup, sparkling water", emoji: "🍹" },
  { id: 10, category: "Drinks", name: "Mango Lassi", price: 5.90, badge: null, desc: "Alphonso mango, yogurt, cardamom, rose water", emoji: "🥭" },
];

const REVIEWS = [
  { name: "Sarah M.", rating: 5, text: "The Smash Burger is genuinely life-changing. I've ordered 3 times this week.", avatar: "S" },
  { name: "James T.", rating: 5, text: "Fast delivery, food arrived hot. The Birria Tacos are absolutely insane.", avatar: "J" },
  { name: "Priya K.", rating: 5, text: "Finally a place that gets vegan food right. Green Goddess bowl is perfection.", avatar: "P" },
  { name: "Mike R.", rating: 5, text: "Best waffle fries in the city, no contest. And that house aioli?! 🤌", avatar: "M" },
];

const STATS = [
  { value: "4.9★", label: "Average Rating" },
  { value: "15min", label: "Avg Delivery" },
  { value: "50k+", label: "Happy Customers" },
  { value: "100%", label: "Fresh Daily" },
];

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

  const filteredItems = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (item: typeof MENU_ITEMS[0]) => {
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

      {/* NAV */}
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
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
            style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 600 }}
          >
            <Icon name="ShoppingBag" size={16} />
            {cartCount > 0 && <span>{cartCount}</span>}
            <span className="hidden sm:inline">Order</span>
          </button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name="Menu" size={22} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 text-2xl font-display" style={{ background: "rgba(10,8,4,0.98)" }}>
          <button onClick={() => scrollTo("menu")} className="hover:text-goo-orange transition-colors">Menu</button>
          <button onClick={() => scrollTo("about")} className="hover:text-goo-orange transition-colors">About</button>
          <button onClick={() => scrollTo("reviews")} className="hover:text-goo-orange transition-colors">Reviews</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-goo-orange transition-colors">Contact</button>
          <button onClick={() => setMobileMenuOpen(false)} className="mt-4"><Icon name="X" size={28} /></button>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Goo's Food" className="w-full h-full object-cover opacity-30" style={{ objectPosition: "center top" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,8,4,0.95) 0%, rgba(10,8,4,0.7) 50%, rgba(10,8,4,0.85) 100%)" }} />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--goo-orange)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "var(--goo-yellow)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-6 animate-fade-up" style={{ background: "rgba(255,107,26,0.15)", border: "1px solid rgba(255,107,26,0.3)", color: "var(--goo-orange)", fontWeight: 600 }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "var(--goo-orange)" }} />
              Open Now · Delivers in 15 min
            </div>

            <h1 className="text-5xl md:text-7xl font-display leading-none mb-6 animate-fade-up delay-100" style={{ fontWeight: 800 }}>
              Food That<br />
              <span className="gradient-text">Hits Different</span>
            </h1>

            <p className="text-lg mb-8 animate-fade-up delay-200" style={{ color: "#A09070", maxWidth: "420px" }}>
              Bold flavors, fresh ingredients, no compromises. Order online and get it delivered hot to your door.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <button
                onClick={() => scrollTo("menu")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 700, boxShadow: "0 8px 32px rgba(255,107,26,0.4)" }}
              >
                <Icon name="Utensils" size={18} />
                Order Now
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base transition-all hover:bg-white/10"
                style={{ border: "1px solid var(--goo-border)", color: "#F5EFE0" }}
              >
                <Icon name="Play" size={16} />
                Our Story
              </button>
            </div>

            <div className="flex gap-8 mt-12 animate-fade-up delay-400">
              {STATS.map(stat => (
                <div key={stat.label}>
                  <div className="text-xl font-display gradient-text" style={{ fontWeight: 800 }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: "#6B5A40" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-float">
            <div className="relative">
              <div className="w-72 h-72 rounded-3xl overflow-hidden goo-glow" style={{ border: "1px solid var(--goo-border)" }}>
                <img src={HERO_IMG} alt="Delicious food" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-6 px-4 py-2 rounded-2xl text-sm" style={{ background: "var(--goo-yellow)", color: "#0A0804", fontWeight: 700, boxShadow: "0 8px 24px rgba(255,217,61,0.4)" }}>
                🔥 Fresh Today
              </div>
              <div className="absolute -bottom-4 -left-6 px-4 py-3 rounded-2xl text-sm" style={{ background: "var(--goo-card)", border: "1px solid var(--goo-border)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <div className="text-xs" style={{ fontWeight: 600 }}>Express Delivery</div>
                    <div className="text-xs" style={{ color: "#A09070" }}>Est. 12–18 min</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs" style={{ color: "#6B5A40" }}>Scroll to explore</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--goo-orange)" }}>What We Make</span>
            <h2 className="text-4xl md:text-5xl font-display mt-2" style={{ fontWeight: 800 }}>
              The <span className="gradient-text">Menu</span>
            </h2>
            <p className="mt-3 text-base" style={{ color: "#A09070" }}>All made fresh, every single order.</p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center mb-10">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm transition-all"
                style={{
                  fontWeight: 600,
                  background: activeCategory === cat ? "var(--goo-orange)" : "var(--goo-card)",
                  color: activeCategory === cat ? "#0A0804" : "#A09070",
                  border: activeCategory === cat ? "1px solid var(--goo-orange)" : "1px solid var(--goo-border)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <div key={item.id} className="card-hover rounded-2xl p-5 flex flex-col gap-3" style={{ background: "var(--goo-card)", border: "1px solid var(--goo-border)" }}>
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{item.emoji}</span>
                    {item.badge && (
                      <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,107,26,0.12)", color: "var(--goo-orange)", border: "1px solid rgba(255,107,26,0.2)" }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-lg" style={{ fontWeight: 700 }}>{item.name}</h3>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: "#7A6850" }}>{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="font-display text-xl gradient-text" style={{ fontWeight: 800 }}>${item.price.toFixed(2)}</span>
                    {inCart ? (
                      <div className="flex items-center gap-3">
                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110" style={{ background: "rgba(255,107,26,0.15)", color: "var(--goo-orange)" }}>
                          -
                        </button>
                        <span className="text-sm" style={{ fontWeight: 600 }}>{inCart.qty}</span>
                        <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110" style={{ background: "var(--goo-orange)", color: "#0A0804" }}>
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
                        style={{ background: "rgba(255,107,26,0.15)", color: "var(--goo-orange)", border: "1px solid rgba(255,107,26,0.3)", fontWeight: 600 }}
                      >
                        <Icon name="Plus" size={14} />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ background: "var(--goo-card)" }}>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--goo-orange)" }}>Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display mt-2 mb-6 leading-tight" style={{ fontWeight: 800 }}>
              Made With<br /><span className="gradient-text">Real Passion</span>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "#A09070" }}>
              Goo's started with one obsession: make food that people actually crave. No shortcuts, no freezer bags, no boring plates. Just bold, honest cooking that makes you feel something.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#A09070" }}>
              Every recipe is tested until it's perfect. Every ingredient is sourced fresh. Every order is made with the same care as if you were eating at our table.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Leaf", label: "Farm Fresh", desc: "Ingredients sourced daily" },
                { icon: "Zap", label: "Fast & Hot", desc: "15 min avg delivery" },
                { icon: "Heart", label: "Made with Love", desc: "Every single order" },
                { icon: "Award", label: "Award-Winning", desc: "Best new restaurant 2024" },
              ].map(feat => (
                <div key={feat.label} className="p-4 rounded-xl" style={{ background: "rgba(255,107,26,0.06)", border: "1px solid rgba(255,107,26,0.1)" }}>
                  <Icon name={feat.icon} size={20} className="mb-2" style={{ color: "var(--goo-orange)" }} />
                  <div className="text-sm" style={{ fontWeight: 600 }}>{feat.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#6B5A40" }}>{feat.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid var(--goo-border)" }}>
              <img src={HERO_IMG} alt="Our kitchen" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl" style={{ background: "var(--goo-dark)", border: "1px solid var(--goo-border)" }}>
              <div className="font-display text-3xl gradient-text" style={{ fontWeight: 800 }}>50k+</div>
              <div className="text-sm mt-1" style={{ color: "#7A6850" }}>Happy customers<br />and counting</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--goo-orange)" }}>What People Say</span>
            <h2 className="text-4xl md:text-5xl font-display mt-2" style={{ fontWeight: 800 }}>
              Real <span className="gradient-text">Reviews</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl card-hover" style={{ background: "var(--goo-card)", border: "1px solid var(--goo-border)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 700 }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "var(--goo-yellow)" }}>{"★".repeat(r.rating)}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#A09070" }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6" style={{ background: "var(--goo-card)" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--goo-orange)" }}>Easy as 1-2-3</span>
          <h2 className="text-4xl md:text-5xl font-display mt-2 mb-14" style={{ fontWeight: 800 }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "UtensilsCrossed", title: "Pick Your Meal", desc: "Browse our full menu and add your favorites to cart" },
              { step: "02", icon: "CreditCard", title: "Pay Securely", desc: "Checkout with card, Apple Pay, or Google Pay" },
              { step: "03", icon: "Truck", title: "Track & Enjoy", desc: "Real-time tracking. Food arrives hot, every time." },
            ].map(step => (
              <div key={step.step} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,107,26,0.12)", border: "1px solid rgba(255,107,26,0.2)" }}>
                  <Icon name={step.icon} size={28} style={{ color: "var(--goo-orange)" }} />
                </div>
                <div className="text-xs mb-2" style={{ color: "var(--goo-orange)", fontWeight: 600 }}>{step.step}</div>
                <h3 className="font-display text-lg mb-2" style={{ fontWeight: 700 }}>{step.title}</h3>
                <p className="text-sm" style={{ color: "#7A6850" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center" style={{ background: "linear-gradient(135deg, rgba(255,107,26,0.15) 0%, rgba(255,217,61,0.08) 100%)", border: "1px solid rgba(255,107,26,0.25)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: "var(--goo-orange)" }} />
            <h2 className="text-4xl md:text-5xl font-display mb-4" style={{ fontWeight: 800 }}>
              Ready to <span className="gradient-text">Order?</span>
            </h2>
            <p className="mb-8" style={{ color: "#A09070" }}>Join 50,000+ happy customers who've made Goo's their go-to.</p>
            <button
              onClick={() => scrollTo("menu")}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg transition-all hover:scale-105"
              style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 700, boxShadow: "0 8px 32px rgba(255,107,26,0.4)" }}
            >
              <Icon name="ShoppingBag" size={20} />
              Start Your Order
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section id="contact" className="py-16 px-6" style={{ background: "var(--goo-card)", borderTop: "1px solid var(--goo-border)" }}>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-2xl font-display gradient-text mb-3" style={{ fontWeight: 800 }}>Goo's</div>
            <p className="text-sm" style={{ color: "#7A6850" }}>Bold flavors. Fresh ingredients. Fast delivery. That's our promise.</p>
          </div>
          <div>
            <div className="text-sm mb-4" style={{ fontWeight: 600, color: "#A09070" }}>Contact</div>
            <div className="flex flex-col gap-3 text-sm" style={{ color: "#7A6850" }}>
              <a href="https://maps.google.com/?q=230+Shellard+Ln,+Brantford,+ON+N3T+0B9" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-white transition-colors">
                <Icon name="MapPin" size={14} style={{ color: "var(--goo-orange)", marginTop: "2px", flexShrink: 0 }} />
                230 Shellard Ln, Brantford, ON N3T 0B9
              </a>
              <a href="tel:+15197521111" className="flex items-center gap-2 hover:text-white transition-colors">
                <Icon name="Phone" size={14} style={{ color: "var(--goo-orange)" }} />
                (519) 752-1111
              </a>

            </div>
          </div>
          <div>
            <div className="text-sm mb-4" style={{ fontWeight: 600, color: "#A09070" }}>Hours</div>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "#7A6850" }}>
              <div className="flex justify-between"><span>Opens at</span><span>11:00 a.m.</span></div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#FF4444", flexShrink: 0 }} />
                <span style={{ color: "#FF6666" }}>Currently Closed</span>
              </div>
              <div className="mt-2 text-xs" style={{ color: "#6B5A40" }}>$10–$20 per person</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl mt-10 pt-6 flex items-center justify-between text-xs" style={{ borderTop: "1px solid var(--goo-border)", color: "#4A3C28" }}>
          <span>© 2025 Goo's Food. All rights reserved.</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </section>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-sm flex flex-col h-full" style={{ background: "var(--goo-card)", borderLeft: "1px solid var(--goo-border)" }}>
            <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid var(--goo-border)" }}>
              <h3 className="font-display text-xl" style={{ fontWeight: 700 }}>Your Order</h3>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
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
                <button onClick={() => setCartOpen(false)} className="mt-2 px-6 py-3 rounded-full text-sm transition-all hover:scale-105" style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 600 }}>
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
                        <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(255,107,26,0.15)", color: "var(--goo-orange)" }}>-</button>
                        <span className="text-sm w-4 text-center">{item.qty}</span>
                        <button onClick={() => addToCart(MENU_ITEMS.find(m => m.id === item.id)!)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "var(--goo-orange)", color: "#0A0804" }}>+</button>
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
                    onClick={handleOrder}
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

      {/* Floating cart button (mobile) */}
      {cartCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full text-sm shadow-2xl transition-all hover:scale-105 md:hidden"
          style={{ background: "var(--goo-orange)", color: "#0A0804", fontWeight: 700, boxShadow: "0 8px 32px rgba(255,107,26,0.5)" }}
        >
          <Icon name="ShoppingBag" size={18} />
          {cartCount} item{cartCount > 1 ? "s" : ""} · ${cartTotal.toFixed(2)}
        </button>
      )}
    </div>
  );
}