import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/9d674486-baf8-4ff0-a3f9-d15928a308ce/files/887e1d7b-5210-4fe4-a522-af92540ed967.jpg";

export const MENU_CATEGORIES = ["All", "Burgers", "Bowls", "Tacos", "Sides", "Drinks"];

export const MENU_ITEMS = [
  { id: 1, category: "Burgers", name: "Hamburger", price: 10.99, badge: null, desc: "Classic beef patty on a fresh bun", emoji: "🍔" },
  { id: 2, category: "Burgers", name: "Cheeseburger", price: 11.99, badge: null, desc: "Classic beef patty with melted cheese", emoji: "🧀" },
  { id: 11, category: "Burgers", name: "Goo Burger", price: 12.99, badge: "🔥 Signature", desc: "Chicken skins, mozzarella", emoji: "🍗" },
  { id: 12, category: "Burgers", name: "Deluxe", price: 12.99, badge: null, desc: "Bacon, cheddar", emoji: "🥓" },
  { id: 13, category: "Burgers", name: "Veggie", price: 12.99, badge: "🌿 Vegan", desc: "Veggie patty, mozzarella, sautéed", emoji: "🥦" },
  { id: 14, category: "Burgers", name: "Barnyard", price: 19.99, badge: "🏆 Loaded", desc: "Cheddar, bacon, pulled pork, and chicken fingers", emoji: "🐔" },

];

const REVIEWS = [
  { name: "Sarah M.", rating: 5, text: "The Smash Burger is genuinely life-changing. I've ordered 3 times this week.", avatar: "S" },
  { name: "James T.", rating: 5, text: "Fast delivery, food arrived hot. The Birria Tacos are absolutely insane.", avatar: "J" },
  { name: "Priya K.", rating: 5, text: "Finally a place that gets vegan food right. Green Goddess bowl is perfection.", avatar: "P" },
  { name: "Mike R.", rating: 5, text: "Best waffle fries in the city, no contest. And that house aioli?! 🤌", avatar: "M" },
];

export type MenuItem = typeof MENU_ITEMS[0];

interface CartItem {
  id: number;
  qty: number;
}

interface MenuSectionProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (id: number) => void;
  scrollTo: (id: string) => void;
}

export default function MenuSection({ activeCategory, onCategoryChange, cart, onAddToCart, onRemoveFromCart, scrollTo }: MenuSectionProps) {
  const filteredItems = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  return (
    <>
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
                onClick={() => onCategoryChange(cat)}
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
                        <button onClick={() => onRemoveFromCart(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110" style={{ background: "rgba(255,107,26,0.15)", color: "var(--goo-orange)" }}>
                          -
                        </button>
                        <span className="text-sm" style={{ fontWeight: 600 }}>{inCart.qty}</span>
                        <button onClick={() => onAddToCart(item)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110" style={{ background: "var(--goo-orange)", color: "#0A0804" }}>
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item)}
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
    </>
  );
}