import React, { useEffect, useRef, useState } from 'react';

// Types for GraphQL data
interface CategoryImage {
  alt: string;
  url: string;
}

interface Category {
  categoryId: number;
  name: string;
  url: string;
  image: CategoryImage | null;
}

interface LandingPageProps {
  categories?: {
    items: Category[];
  };
}

// ============ ANIMATION HOOK ============
function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

// ============ HERO CAROUSEL DATA ============
const heroSlides = [
  {
    id: 1,
    title: "Calidad Premium en Cada Corte",
    subtitle: "Seleccionamos los mejores cortes para que disfrutes del auténtico sabor",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
  },
  {
    id: 2,
    title: "Del Campo a Tu Mesa",
    subtitle: "Ganado criado con los más altos estándares de bienestar animal",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
  },
  {
    id: 3,
    title: "Tradición y Experiencia",
    subtitle: "Más de 30 años ofreciendo las mejores carnes a familias como la tuya",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
  },
  {
    id: 4,
    title: "El Sabor que Une Familias",
    subtitle: "Momentos inolvidables alrededor de la mesa con nuestras carnes selectas",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
  },
  {
    id: 5,
    title: "Maestros Carniceros",
    subtitle: "Expertos dedicados a ofrecerte cortes perfectos en cada visita",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
  }
];

// ============ HERO CAROUSEL ============
function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageTransitioning, setImageTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out text first
      setTextVisible(false);

      // Then transition image
      setTimeout(() => {
        setImageTransitioning(true);
      }, 200);

      // Change slide
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setImageTransitioning(false);
      }, 600);

      // Fade in text
      setTimeout(() => {
        setTextVisible(true);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setTextVisible(false);
      setTimeout(() => setImageTransitioning(true), 200);
      setTimeout(() => {
        setCurrentSlide(index);
        setImageTransitioning(false);
      }, 600);
      setTimeout(() => setTextVisible(true), 800);
    }
  };

  const goToPrev = () => {
    setTextVisible(false);
    setTimeout(() => setImageTransitioning(true), 200);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setImageTransitioning(false);
    }, 600);
    setTimeout(() => setTextVisible(true), 800);
  };

  const goToNext = () => {
    setTextVisible(false);
    setTimeout(() => setImageTransitioning(true), 200);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setImageTransitioning(false);
    }, 600);
    setTimeout(() => setTextVisible(true), 800);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${imageTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${slide.image}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-5xl mx-auto px-4">
          <h1
            className={`text-white font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] mb-4 sm:mb-6 transition-all duration-500 ease-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            {slide.title}
          </h1>
          <p
            className={`text-white/85 font-['Manrope'] text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8 transition-all duration-500 ease-out delay-100 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            {slide.subtitle}
          </p>
          <a
            href="/productos"
            className={`inline-flex bg-[#8B0000] text-white font-['Manrope'] text-xs sm:text-sm font-semibold tracking-[1px] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#a00000] transition-all duration-500 ease-out delay-200 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            Comprar Ahora
          </a>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on small screens */}
      <button
        onClick={goToPrev}
        className="hidden sm:flex absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center transition-colors"
        aria-label="Anterior"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="hidden sm:flex absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center transition-colors"
        aria-label="Siguiente"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/30 px-3 sm:px-4 py-2 rounded-full">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator - Mobile only */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 animate-bounce sm:hidden">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// ============ CATEGORY CARD ============
interface CategoryCardProps {
  name: string;
  image: string;
  url: string;
  index: number;
}

function CategoryCard({ name, image, url, index }: CategoryCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 w-full sm:w-[calc(50%-12px)] lg:w-[280px] animate-fade-up`}
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div
        className="w-full h-[250px] sm:h-[280px] lg:h-[320px] bg-cover bg-center transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="flex flex-col gap-2 items-center w-full">
        <h3 className="text-[#95151c] font-['Playfair_Display'] text-lg font-semibold tracking-[1px] uppercase">
          {name}
        </h3>
        <a
          href={url}
          className="border border-[#95151c] text-[#95151c] font-['Manrope'] text-[11px] font-medium tracking-[1px] px-6 py-2 hover:bg-[#95151c] hover:text-[#f9f4e1] transition-colors"
        >
          VER CATEGORÍA
        </a>
      </div>
    </div>
  );
}

// ============ CATEGORIES SECTION ============
interface CategoriesSectionProps {
  categories: Category[];
}

// Default placeholder images for categories without images
const defaultCategoryImages: Record<string, string> = {
  'carnes': 'https://images.unsplash.com/photo-1758346972605-5261ac0409b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'embutidos': 'https://images.unsplash.com/photo-1609255792418-24d0c20c217b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'mariscos': 'https://images.unsplash.com/photo-1577193120905-21e0c301d5d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'bebidas': 'https://images.unsplash.com/photo-1763688459566-32c3d53f724b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
};

function getCategoryImage(category: Category): string {
  if (category.image?.url) {
    return category.image.url;
  }
  const nameLower = category.name.toLowerCase();
  return defaultCategoryImages[nameLower] || defaultCategoryImages['default'];
}

function CategoriesSection({ categories }: CategoriesSectionProps) {
  const ref = useIntersectionObserver();

  return (
    <section className="bg-[#f9f4e1] px-4 sm:px-8 lg:px-20 py-12 lg:py-20">
      <div ref={ref} className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-12 animate-section">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 animate-fade-up">
          <h2 className="text-[#95151c] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[42px]">NUESTRAS</h2>
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#95151c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <h2 className="text-[#95151c] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[42px]">CATEGORÍAS</h2>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <CategoryCard
                key={category.categoryId}
                name={category.name}
                image={getCategoryImage(category)}
                url={category.url}
                index={index}
              />
            ))
          ) : (
            <p className="text-[#000000] font-['Manrope']">No hay categorías disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
}

// ============ NUESTRA CARNE SECTION ============
function NuestraCarneSection() {
  const ref = useIntersectionObserver();

  return (
    <section ref={ref} className="flex flex-col lg:flex-row min-h-[400px] lg:h-[550px] animate-section">
      {/* Image */}
      <div
        className="h-[300px] lg:h-auto lg:flex-1 bg-cover bg-center animate-fade-right"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1765295218807-2d58d3b01123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
        }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 bg-[#95151c] px-6 sm:px-12 lg:px-20 py-12 lg:py-20">
        <span className="text-[#f9f4e1] font-['Manrope'] text-xs font-semibold tracking-[3px] opacity-70 animate-fade-up delay-1">
          NUESTRA CARNE
        </span>
        <h2 className="text-[#f9f4e1] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl leading-[1.15] animate-fade-up delay-2">
          Tradición y
          <br />
          Calidad en
          <br />
          Cada Corte
        </h2>
        <p className="text-[#f9f4e1] font-['Manrope'] text-sm lg:text-[15px] leading-[1.7] opacity-90 max-w-[420px] animate-fade-up delay-3">
          Trabajamos directamente con los mejores ganaderos de la región, garantizando carnes de primera
          calidad con trazabilidad completa. Nuestro proceso de maduración en seco realza el sabor y la
          terneza de cada pieza.
        </p>
        <a
          href="/about"
          className="border border-[#f9f4e1] text-[#f9f4e1] font-['Manrope'] text-xs font-medium tracking-[1px] px-7 py-3.5 w-fit hover:bg-[#f9f4e1] hover:text-[#95151c] transition-colors animate-fade-up delay-4"
        >
          CONOCER MÁS
        </a>
      </div>
    </section>
  );
}

// ============ SUSTAINABILITY CARD ============
interface SustainabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function SustainabilityCard({ icon, title, description, index }: SustainabilityCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-4 lg:gap-5 w-full sm:w-[280px] p-6 lg:p-8 border border-[#95151c30] animate-fade-up`}
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      <div className="text-[#95151c] w-8 h-8 lg:w-10 lg:h-10">
        {icon}
      </div>
      <h3
        className="text-[#95151c] font-['Playfair_Display'] text-xl lg:text-[22px] leading-[1.2] text-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="text-[#000000] font-['Manrope'] text-xs lg:text-sm leading-[1.5] text-center max-w-[220px]">
        {description}
      </p>
    </div>
  );
}

// ============ SOSTENIBILIDAD SECTION ============
function SostenibilidadSection() {
  const ref = useIntersectionObserver();

  return (
    <section className="bg-[#f9f4e1] px-4 sm:px-8 lg:px-20 py-12 lg:py-[100px]">
      <div ref={ref} className="max-w-7xl mx-auto flex flex-col items-center gap-10 lg:gap-[60px] animate-section">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 lg:gap-5">
          <span className="text-[#95151c] font-['Manrope'] text-xs font-semibold tracking-[3px] animate-fade-up delay-1">
            COMPROMISO AMBIENTAL
          </span>
          <h2 className="text-[#95151c] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl animate-fade-up delay-2">
            Sostenibilidad
          </h2>
          <p className="text-[#000000] font-['Manrope'] text-sm lg:text-base leading-[1.6] text-center max-w-[600px] px-4 animate-fade-up delay-3">
            Creemos en una producción responsable que respeta el medio ambiente y el bienestar animal.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 lg:gap-10 w-full">
          <SustainabilityCard
            index={0}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            }
            title="Ganadería<br/>Responsable"
            description="Trabajamos con productores que practican ganadería regenerativa y bienestar animal."
          />
          <SustainabilityCard
            index={1}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
                <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
                <path d="m14 16-3 3 3 3" />
                <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
                <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
                <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
              </svg>
            }
            title="Empaque<br/>Ecológico"
            description="Utilizamos materiales biodegradables y reciclables en todos nuestros empaques."
          />
          <SustainabilityCard
            index={2}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            title="Producción<br/>Local"
            description="Apoyamos a productores locales reduciendo la huella de carbono en el transporte."
          />
        </div>
      </div>
    </section>
  );
}

// ============ CONTACT SECTION ============
function ContactSection() {
  const ref = useIntersectionObserver();

  return (
    <section ref={ref} className="flex flex-col lg:flex-row min-h-[400px] lg:h-[500px] animate-section">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 bg-[#f9f4e1] px-6 sm:px-12 lg:px-20 py-12 lg:py-20 order-2 lg:order-1">
        <span className="text-[#95151c] font-['Manrope'] text-xs font-semibold tracking-[3px] animate-fade-up delay-1">
          CONTACTO
        </span>
        <h2 className="text-[#95151c] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] animate-fade-up delay-2">
          ¿Listo para
          <br />
          Probar lo Mejor?
        </h2>
        <p className="text-[#000000] font-['Manrope'] text-sm lg:text-[15px] leading-[1.6] max-w-[400px] animate-fade-up delay-3">
          Contáctanos para pedidos mayoristas, consultas sobre nuestros productos o para conocer más
          sobre nuestro proceso.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 lg:gap-4 animate-fade-up delay-4">
          <div className="flex items-center gap-3">
            <svg className="w-[18px] h-[18px] text-[#95151c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[#95151c] font-['Manrope'] text-sm">+51 970 520 507</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-[18px] h-[18px] text-[#95151c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-[#95151c] font-['Manrope'] text-sm">pedidos@resco.com</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-[18px] h-[18px] text-[#95151c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[#95151c] font-['Manrope'] text-sm">Lima, Perú</span>
          </div>
        </div>

        <a
          href="/contact"
          className="bg-[#95151c] text-[#f9f4e1] font-['Manrope'] text-xs font-semibold tracking-[1px] px-7 py-3.5 w-fit hover:bg-[#556348] transition-colors animate-fade-up delay-5"
        >
          ENVIAR MENSAJE
        </a>
      </div>

      {/* Image */}
      <div
        className="h-[250px] lg:h-auto lg:flex-1 bg-cover bg-center order-1 lg:order-2 animate-fade-left"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564068358866-3f1ccefcfbc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
        }}
      />
    </section>
  );
}

// ============ ANIMATION STYLES ============
function AnimationStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* Animation base states */
      .animate-section {
        opacity: 1;
      }

      .animate-fade-up {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeUp 0.8s ease forwards;
      }

      .animate-fade-left {
        opacity: 0;
        transform: translateX(50px);
        animation: fadeLeft 0.8s ease forwards;
      }

      .animate-fade-right {
        opacity: 0;
        transform: translateX(-50px);
        animation: fadeRight 0.8s ease forwards;
      }

      /* Delay classes */
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }
      .delay-5 { animation-delay: 0.5s; }

      /* Keyframes */
      @keyframes fadeUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeLeft {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes fadeRight {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* Intersection observer trigger */
      .animate-section:not(.animate-visible) .animate-fade-up,
      .animate-section:not(.animate-visible) .animate-fade-left,
      .animate-section:not(.animate-visible) .animate-fade-right {
        animation-play-state: paused;
      }

      .animate-visible .animate-fade-up,
      .animate-visible .animate-fade-left,
      .animate-visible .animate-fade-right {
        animation-play-state: running;
      }

      /* Hover animations for cards */
      .hover-scale {
        transition: transform 0.3s ease;
      }

      .hover-scale:hover {
        transform: scale(1.02);
      }

      /* Scroll margin for anchor navigation - compensate for fixed header */
      [id="categorias"],
      [id="nuestra-carne"],
      [id="sostenibilidad"],
      [id="contacto"] {
        scroll-margin-top: 100px;
      }

      /* Smooth scrolling for the entire page */
      html {
        scroll-behavior: smooth;
      }
    `}} />
  );
}

// ============ MAIN LANDING PAGE COMPONENT ============
export default function LandingPage({ categories }: LandingPageProps) {
  const categoryList = categories?.items || [];

  return (
    <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
      <AnimationStyles />
      <HeroCarousel />
      <section id="categorias">
        <CategoriesSection categories={categoryList} />
      </section>
      <section id="nuestra-carne">
        <NuestraCarneSection />
      </section>
      <section id="sostenibilidad">
        <SostenibilidadSection />
      </section>
      <section id="contacto">
        <ContactSection />
      </section>
    </div>
  );
}

// Layout configuration - render in the main content area
export const layout = {
  areaId: 'content',
  sortOrder: 5
};

// GraphQL query to fetch categories - Evershop will execute this on SSR
// Note: operation is an enum (eq, neq, gt, etc.) - no quotes around it
export const query = `
  query Query {
    categories (filters: [{key: "limit", operation: eq, value: "8"}]) {
      items {
        categoryId
        name
        url
        image {
          alt
          url
        }
      }
    }
  }
`;
