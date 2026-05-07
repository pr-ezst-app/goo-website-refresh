import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/9d674486-baf8-4ff0-a3f9-d15928a308ce/files/887e1d7b-5210-4fe4-a522-af92540ed967.jpg";

const STATS = [
  { value: "4.9★", label: "Average Rating" },
  { value: "15min", label: "Avg Delivery" },
  { value: "50k+", label: "Happy Customers" },
  { value: "100%", label: "Fresh Daily" },
];

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
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
  );
}
