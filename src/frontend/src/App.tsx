import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  Coffee,
  ExternalLink,
  Fish,
  MapPin,
  Menu,
  Phone,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/* ─────────────────────────────────────────────── */
/*  Data                                           */
/* ─────────────────────────────────────────────── */

const MENU_ITEMS = [
  // Khana
  {
    name: "Chicken Khana",
    nepali: "चिकन खाना",
    description:
      "Tender chicken curry with steamed rice, lentil dal, and seasonal vegetables.",
    category: "Khana",
    icon: "🍗",
    price: "NPR 280",
  },
  {
    name: "Veg Khana",
    nepali: "भेज खाना",
    description:
      "Fresh vegetable curry with fragrant rice, creamy dal, and pickled achar.",
    category: "Khana",
    icon: "🥦",
    price: "NPR 180",
  },
  {
    name: "Mutton Khana",
    nepali: "खसी खाना",
    description:
      "Slow-cooked mutton in rich masala gravy with steamed rice, dal, and salad.",
    category: "Khana",
    icon: "🍖",
    price: "NPR 380",
  },
  {
    name: "Macha Khana",
    nepali: "माछा खाना",
    description:
      "Fresh fish curry with aromatic spices, steamed rice, dal, and seasonal greens.",
    category: "Khana",
    icon: "🐟",
    price: "NPR 280",
  },
  {
    name: "Roti + Veg Khana Combo",
    nepali: "रोटी + भेज खाना",
    description: "5 pcs roti paired with veg khana — a hearty combo meal.",
    category: "Khana",
    icon: "🫓",
    price: "NPR 200",
  },
  // Plates
  {
    name: "Mutton Plate (8 pcs)",
    nepali: "खसी प्लेट",
    description:
      "8 pieces of tender mutton — perfect for sharing or a satisfying solo meal.",
    category: "Plates",
    icon: "🍖",
    price: "NPR 400",
  },
  {
    name: "Chicken Plate (8 pcs)",
    nepali: "चिकन प्लेट",
    description: "8 pieces of juicy chicken, seasoned with Nepali spices.",
    category: "Plates",
    icon: "🍗",
    price: "NPR 250",
  },
  {
    name: "Macha (1 pc)",
    nepali: "माछा",
    description: "One piece of freshly cooked fish with house spices.",
    category: "Plates",
    icon: "🐟",
    price: "NPR 100",
  },
  // Snacks
  {
    name: "Chicken Momo",
    nepali: "चिकन मम:",
    description:
      "Steamed dumplings filled with spiced chicken, served with tomato-sesame sauce.",
    category: "Snacks",
    icon: "🥟",
    price: "NPR 100",
  },
  {
    name: "Veg Chowmin",
    nepali: "भेज चाउमिन",
    description:
      "Wok-tossed noodles with crisp vegetables and Nepali seasoning.",
    category: "Snacks",
    icon: "🍜",
    price: "NPR 60",
  },
  {
    name: "Chicken Chowmin",
    nepali: "चिकन चाउमिन",
    description: "Stir-fried noodles with tender chicken and fresh vegetables.",
    category: "Snacks",
    icon: "🍜",
    price: "NPR 100",
  },
  {
    name: "Egg Chowmin",
    nepali: "अण्डा चाउमिन",
    description: "Noodles tossed with egg and vegetables in savory seasoning.",
    category: "Snacks",
    icon: "🍳",
    price: "NPR 95",
  },
  {
    name: "Chana Cheura",
    nepali: "चना चिउरा",
    description:
      "Roasted chickpeas with flattened rice — a classic Nepali snack.",
    category: "Snacks",
    icon: "🫘",
    price: "NPR 50",
  },
  {
    name: "Dahi Cheura",
    nepali: "दही चिउरा",
    description:
      "Creamy yogurt with flattened rice — light, fresh, and satisfying.",
    category: "Snacks",
    icon: "🥣",
    price: "NPR 65",
  },
  {
    name: "Cooked Chau Chau",
    nepali: "पकाएको चाउचाउ",
    description: "Hot cooked instant noodles, a quick and comforting snack.",
    category: "Snacks",
    icon: "🍝",
    price: "NPR 50",
  },
  {
    name: "Egg Boil / Omelette",
    nepali: "उमालेको / अमलेट अण्डा",
    description: "Boiled or pan-fried omelette egg, simple and nutritious.",
    category: "Snacks",
    icon: "🥚",
    price: "NPR 35",
  },
  {
    name: "Curd (Small Cup)",
    nepali: "दही",
    description: "Fresh small cup of creamy homestyle curd.",
    category: "Snacks",
    icon: "🥛",
    price: "NPR 45",
  },
  // Beverages
  {
    name: "Coca Cola / Fanta / Sprite / Slice / Dew",
    nepali: "कोल्ड ड्रिंक्स",
    description: "Chilled soft drinks — your choice of brand.",
    category: "Beverages",
    icon: "🥤",
    price: "NPR 60",
  },
  {
    name: "Red Bull",
    nepali: "रेड बुल",
    description: "Energy drink to keep you going.",
    category: "Beverages",
    icon: "⚡",
    price: "NPR 120",
  },
  {
    name: "Badam Juice",
    nepali: "बदाम जुस",
    description: "Refreshing almond juice, naturally sweet and nourishing.",
    category: "Beverages",
    icon: "🥜",
    price: "NPR 110",
  },
  {
    name: "Frooti Juice",
    nepali: "फ्रूटी जुस",
    description: "Sweet mango fruit drink.",
    category: "Beverages",
    icon: "🥭",
    price: "NPR 25",
  },
  {
    name: "Mineral Water",
    nepali: "मिनरल वाटर",
    description: "Pure bottled drinking water.",
    category: "Beverages",
    icon: "💧",
    price: "NPR 25",
  },
  {
    name: "Mohi (Butter Milk)",
    nepali: "मोही",
    description: "Traditional Nepali buttermilk — cool, tangy, and refreshing.",
    category: "Beverages",
    icon: "🥛",
    price: "NPR 35",
  },
  {
    name: "Black Tea",
    nepali: "कालो चिया",
    description: "Simple brewed black tea — light and warm.",
    category: "Beverages",
    icon: "🍵",
    price: "NPR 20",
  },
  {
    name: "Milk Tea",
    nepali: "दूध चिया",
    description: "Freshly brewed Nepali milk tea with aromatic spices.",
    category: "Beverages",
    icon: "☕",
    price: "NPR 25",
  },
  {
    name: "Milk Coffee",
    nepali: "दूध कफी",
    description: "Creamy coffee brewed with fresh milk.",
    category: "Beverages",
    icon: "☕",
    price: "NPR 90",
  },
  {
    name: "Black Coffee",
    nepali: "कालो कफी",
    description: "Strong, pure black coffee — bold and energising.",
    category: "Beverages",
    icon: "☕",
    price: "NPR 40",
  },
];

const CATEGORIES = ["All", "Khana", "Plates", "Snacks", "Beverages"];

/* ─────────────────────────────────────────────── */
/*  Navigation                                     */
/* ─────────────────────────────────────────────── */

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll listener via passive event
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 50), {
      passive: true,
    });
  }

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-amber-950/95 backdrop-blur-md shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-5 flex items-center justify-between max-w-5xl">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <UtensilsCrossed className="h-6 w-6 text-amber-300 transition-transform group-hover:scale-110" />
          <span className="font-display text-lg font-bold text-amber-50 tracking-wide">
            Hotel <span className="text-amber-300">Lopsang</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid="nav.link"
              className="nav-link text-sm font-medium text-amber-100/80 hover:text-amber-100 transition-colors font-sans-body"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Phone CTA desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:9804048699"
            data-ocid="nav.primary_button"
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-4 py-2 transition-all duration-300 font-sans-body"
          >
            <Phone className="h-3.5 w-3.5" />
            9804048699
          </a>
          <a
            href="tel:9842136091"
            data-ocid="nav.secondary_button"
            className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 transition-all duration-300 font-sans-body"
          >
            <Phone className="h-3.5 w-3.5" />
            9842136091
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-amber-100 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-amber-950/98 border-t border-amber-800/40"
          >
            <nav className="container mx-auto px-5 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  className="font-sans-body text-amber-100/80 hover:text-amber-300 transition-colors py-2 border-b border-amber-800/30"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:9804048699"
                data-ocid="nav.primary_button"
                className="flex items-center gap-2 bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 mt-2 justify-center font-sans-body"
              >
                <Phone className="h-4 w-4" />
                Call 9804048699
              </a>
              <a
                href="tel:9842136091"
                data-ocid="nav.secondary_button"
                className="flex items-center gap-2 bg-amber-800 text-white text-sm font-semibold px-4 py-2.5 justify-center font-sans-body"
              >
                <Phone className="h-4 w-4" />
                Call 9842136091
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────── */
/*  Hero Section                                   */
/* ─────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/assets/generated/hero-restaurant.dim_1200x600.jpg"
        alt="Hotel Lopsang hotel"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/60 via-amber-900/70 to-amber-950/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-12 h-px bg-amber-400" />
          <span className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase font-sans-body">
            Biratnagar, Nepal
          </span>
          <span className="w-12 h-px bg-amber-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl font-bold text-amber-50 leading-tight mb-4"
        >
          Hotel <span className="text-amber-400 italic">Lopsang</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans-body text-lg md:text-xl text-amber-100/85 mb-3 max-w-xl mx-auto leading-relaxed"
        >
          Authentic Nepali flavours made with love
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans-body text-sm text-amber-200/70 mb-10 flex items-center justify-center gap-1.5"
        >
          <MapPin className="h-4 w-4 text-amber-400" />
          Biratnagar-5, Near Life Guard Hospital
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#menu"
            data-ocid="hero.primary_button"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 text-base transition-all duration-300 font-sans-body shadow-lg hover:shadow-amber-500/30"
          >
            <UtensilsCrossed className="h-4 w-4" />
            View Our Menu
          </a>
          <a
            href="#contact"
            data-ocid="hero.secondary_button"
            className="inline-flex items-center justify-center gap-2 border border-amber-400/60 text-amber-100 hover:bg-amber-400/10 hover:border-amber-400 px-8 py-3.5 text-base transition-all duration-300 font-sans-body"
          >
            <Phone className="h-4 w-4" />
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Scroll bounce */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-300/60"
      >
        <ChevronDown className="h-7 w-7" />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────── */
/*  Notice Banner                                  */
/* ─────────────────────────────────────────────── */

function NoticeBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-amber-700 py-5 px-5"
      data-ocid="notice.section"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 text-center md:text-left">
          <p className="font-sans-body text-amber-50 text-sm md:text-base leading-relaxed">
            <span className="font-bold text-amber-200">
              📋 Pre-Order Notice:
            </span>{" "}
            For orders of more than{" "}
            <span className="font-bold text-amber-200">20 plates</span>, please
            contact us in advance. Call{" "}
            <a
              href="tel:9804048699"
              className="font-bold text-white underline underline-offset-2 hover:text-amber-200 transition-colors"
              data-ocid="notice.primary_button"
            >
              9804048699
            </a>{" "}
            or{" "}
            <a
              href="tel:9842136091"
              className="font-bold text-white underline underline-offset-2 hover:text-amber-200 transition-colors"
              data-ocid="notice.secondary_button"
            >
              9842136091
            </a>
          </p>
          <div className="hidden md:block w-px h-8 bg-amber-500/50" />
          <p className="font-sans-body text-amber-50 text-sm md:text-base leading-relaxed">
            <span className="font-bold text-amber-200">
              🚫 Alcohol Restricted
            </span>
          </p>
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────── */
/*  Menu Section                                   */
/* ─────────────────────────────────────────────── */

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-amber-50">
      <div className="container mx-auto px-5 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3 font-sans-body">
            <span className="w-5 h-px bg-amber-600" />
            What We Serve
            <span className="w-5 h-px bg-amber-600" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Our Menu
          </h2>
          <p className="font-sans-body text-amber-800/70 max-w-xl mx-auto text-base leading-relaxed">
            Fresh, flavourful Nepali dishes crafted daily with local
            ingredients. No online orders — walk in or call ahead.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-ocid="menu.tab"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              data-ocid="menu.tab"
              className={`px-5 py-2 text-sm font-semibold transition-all duration-200 font-sans-body ${
                activeCategory === cat
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-800 border border-amber-200 hover:border-amber-400 hover:text-amber-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-none overflow-hidden shadow-xl mb-12 aspect-[16/7]"
        >
          <img
            src="/assets/generated/food-spread.dim_800x500.jpg"
            alt="Hotel Lopsang hotel food spread"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Menu Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="menu.list"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-amber-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-3"
                data-ocid={`menu.item.${i + 1}`}
              >
                {/* Emoji + category badge */}
                <div className="flex items-start justify-between">
                  <span className="text-3xl" role="img" aria-label={item.name}>
                    {item.icon}
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-700 font-semibold font-sans-body uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>

                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-amber-950 mb-0.5">
                      {item.name}
                    </h3>
                    <span className="font-display text-base font-bold text-amber-600 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="font-sans-body text-xs text-amber-500 font-medium mb-2">
                    {item.nepali}
                  </p>
                  <p className="font-sans-body text-sm text-amber-800/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────── */
/*  About Section                                  */
/* ─────────────────────────────────────────────── */

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-amber-950 overflow-hidden">
      <div className="container mx-auto px-5 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 font-sans-body">
              <span className="w-5 h-px bg-amber-400" />
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-50 leading-tight mb-6">
              A Family Hotel with{" "}
              <span className="text-amber-400 italic">Heart</span>
            </h2>
            <div className="space-y-4 font-sans-body text-amber-100/70 leading-relaxed text-sm">
              <p>
                Hotel Lopsang is a family-run hotel nestled in Biratnagar-5,
                just steps from Life Guard Hospital. We serve hearty, home-style
                Nepali meals made fresh every day.
              </p>
              <p>
                Whether you're stopping in for a quick cup of tea, enjoying a
                full dal-bhat set, or ordering a plate of steaming momos — every
                dish is cooked with care and Nepali tradition.
              </p>
              <p>
                Our kitchen is open to everyone. Come as you are, eat well, and
                feel at home.
              </p>
            </div>

            {/* Divider quote */}
            <div className="flex items-center gap-3 mt-8">
              <div className="w-10 h-px bg-amber-500" />
              <span className="font-display text-sm italic text-amber-400">
                — Niru & Santosh, Hotel Lopsang
              </span>
            </div>
          </motion.div>

          {/* Owner cards */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            {/* Owner card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-amber-900/60 border border-amber-700/40 p-6 flex items-center gap-5"
              data-ocid="about.card"
            >
              <div className="w-14 h-14 bg-amber-600 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white font-display">
                N
              </div>
              <div>
                <p className="font-display font-bold text-amber-50 text-lg">
                  Niru Tamang
                </p>
                <p className="font-sans-body text-amber-400 text-xs font-semibold uppercase tracking-widest mt-0.5">
                  Owner
                </p>
                <p className="font-sans-body text-amber-100/60 text-sm mt-1">
                  Passionate about bringing authentic Nepali flavours to every
                  table.
                </p>
              </div>
            </motion.div>

            {/* Co-owner card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-amber-900/60 border border-amber-700/40 p-6 flex items-center gap-5"
              data-ocid="about.card"
            >
              <div className="w-14 h-14 bg-amber-700 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white font-display">
                S
              </div>
              <div>
                <p className="font-display font-bold text-amber-50 text-lg">
                  Santosh Tamang
                </p>
                <p className="font-sans-body text-amber-400 text-xs font-semibold uppercase tracking-widest mt-0.5">
                  Co-owner
                </p>
                <p className="font-sans-body text-amber-100/60 text-sm mt-1">
                  The heart of our kitchen — ensuring every meal is cooked with
                  love.
                </p>
              </div>
            </motion.div>

            {/* Location highlight */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-amber-600/20 border border-amber-500/30 p-5 flex items-start gap-4"
            >
              <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-sans-body text-sm font-semibold text-amber-50">
                  Biratnagar-5, Near Life Guard Hospital
                </p>
                <p className="font-sans-body text-xs text-amber-100/60 mt-1">
                  Koshi Province, Nepal
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────── */
/*  Contact Section                                */
/* ─────────────────────────────────────────────── */

function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-amber-50">
      <div className="container mx-auto px-5 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3 font-sans-body">
            <span className="w-5 h-px bg-amber-600" />
            Reach Us
            <span className="w-5 h-px bg-amber-600" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Get in Touch
          </h2>
          <p className="font-sans-body text-amber-800/70 max-w-md mx-auto text-base">
            We're here to answer your questions. Call us or visit us in
            Biratnagar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Phone cards */}
          <div className="flex flex-col gap-3">
            <motion.a
              href="tel:9804048699"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-ocid="contact.primary_button"
              className="flex items-center gap-4 bg-amber-600 p-5 text-white hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 group"
            >
              <div className="w-11 h-11 bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans-body text-xs font-semibold uppercase tracking-widest text-amber-200 mb-0.5">
                  Call Us
                </p>
                <p className="font-display text-xl font-bold">9804048699</p>
              </div>
            </motion.a>
            <motion.a
              href="tel:9842136091"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              data-ocid="contact.secondary_button"
              className="flex items-center gap-4 bg-amber-800 p-5 text-white hover:bg-amber-700 transition-all duration-300 shadow-lg hover:-translate-y-1 group"
            >
              <div className="w-11 h-11 bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans-body text-xs font-semibold uppercase tracking-widest text-amber-300 mb-0.5">
                  Call Us
                </p>
                <p className="font-display text-xl font-bold">9842136091</p>
              </div>
            </motion.a>
          </div>

          {/* Address card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            data-ocid="contact.card"
            className="flex flex-col items-center text-center gap-4 bg-white border border-amber-200 p-8 shadow-sm"
          >
            <div className="w-14 h-14 bg-amber-100 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="font-sans-body text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">
                Find Us
              </p>
              <p className="font-display text-xl font-bold text-amber-950">
                Biratnagar-5
              </p>
              <p className="font-sans-body text-sm text-amber-800/70 mt-1 leading-relaxed">
                Near Life Guard Hospital,
                <br />
                Koshi Province, Nepal
              </p>
            </div>
          </motion.div>
        </div>

        {/* Opening hours */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl mx-auto bg-white border border-amber-200 p-5 shadow-sm flex items-center gap-4"
          data-ocid="contact.panel"
        >
          <div className="w-12 h-12 bg-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🕗</span>
          </div>
          <div>
            <p className="font-sans-body text-xs font-semibold uppercase tracking-widest text-amber-600 mb-0.5">
              Opening Hours
            </p>
            <p className="font-display text-lg font-bold text-amber-950">
              8:00 AM – 8:30 PM
            </p>
            <p className="font-sans-body text-xs text-amber-800/60 mt-0.5">
              Open every day
            </p>
          </div>
        </motion.div>

        {/* Notice box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-amber-100 border-l-4 border-amber-600 p-5 max-w-2xl mx-auto"
          data-ocid="contact.panel"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-sans-body font-bold text-amber-900 mb-1">
                Bulk Order Notice
              </p>
              <p className="font-sans-body text-sm text-amber-800/80 leading-relaxed">
                For catering or orders of more than <strong>20 plates</strong>,
                please contact us in advance. Call{" "}
                <a
                  href="tel:9804048699"
                  className="font-bold text-amber-700 underline underline-offset-2 hover:text-amber-600"
                  data-ocid="contact.panel"
                >
                  9804048699
                </a>{" "}
                or{" "}
                <a
                  href="tel:9842136091"
                  className="font-bold text-amber-700 underline underline-offset-2 hover:text-amber-600"
                >
                  9842136091
                </a>{" "}
                to arrange.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────── */
/*  Footer                                         */
/* ─────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-amber-950 py-10 px-5">
      <div className="container mx-auto max-w-5xl">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-amber-400" />
            <span className="font-display text-lg font-bold text-amber-50">
              Hotel <span className="text-amber-400">Lopsang</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-5">
            {[
              { label: "Home", href: "#home" },
              { label: "Menu", href: "#menu" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="font-sans-body text-sm text-amber-300/70 hover:text-amber-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-1 items-center md:items-end">
            <a
              href="tel:9804048699"
              data-ocid="footer.primary_button"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-sans-body text-sm"
            >
              <Phone className="h-4 w-4" />
              9804048699
            </a>
            <a
              href="tel:9842136091"
              data-ocid="footer.secondary_button"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-sans-body text-sm"
            >
              <Phone className="h-4 w-4" />
              9842136091
            </a>
          </div>
        </div>

        <Separator className="bg-amber-800/40 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="font-sans-body text-xs text-amber-500">
            © {year} Hotel Lopsang · Biratnagar-5, Near Life Guard Hospital,
            Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────── */
/*  App Root                                       */
/* ─────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <NoticeBanner />
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
