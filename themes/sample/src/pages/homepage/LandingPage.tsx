import React, { useEffect, useRef } from 'react';

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

// ============ BANNER CAROUSEL SECTION ============
interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
}

function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const banners: Banner[] = [
    {
      id: 1,
      title: 'CORTES PREMIUM',
      subtitle: 'La mejor carne para tu mesa',
      image: 'https://images.unsplash.com/photo-1602470521006-aaea8b2fcc36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
          <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6s-7.56-2.54-8.5-6Z" />
          <path d="M18 5a46.7 46.7 0 0 1-1.45 4.88M14.41 10.75a.57.57 0 0 1-.6.36.57.57 0 0 1-.52-.47.57.57 0 0 1 .36-.6c.47-.18.82-.64 1-.95a.57.57 0 0 1 .77-.25.57.57 0 0 1 .24.77c-.24.52-.7 1.05-1.24 1.14Z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'CALIDAD GARANTIZADA',
      subtitle: 'Directo de los mejores ganaderos',
      image: 'https://images.unsplash.com/photo-1759150595639-d128196ab6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'TRADICIÓN ARTESANAL',
      subtitle: 'Maduración perfecta en cada corte',
      image: 'https://images.unsplash.com/photo-1600180786608-28d06391d25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'SABOR INCOMPARABLE',
      subtitle: 'Para paladares exigentes',
      image: 'https://images.unsplash.com/photo-1708388464912-d4ad82dca990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'FRESCURA DIARIA',
      subtitle: 'Productos frescos cada día',
      image: 'https://images.unsplash.com/photo-1584448327102-5617ccc71ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'VARIEDAD EXCLUSIVA',
      subtitle: 'Encuentra el corte perfecto',
      image: 'https://images.unsplash.com/photo-1611038333075-2efd28705f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-14 h-14">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
      )
    }
  ];

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-advance carousel every 8 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-hidden mt-16 sm:mt-20">
      {/* Banners */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${banner.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-6 px-4">
            {/* Icon */}
            <div className="text-[#f0ece9] animate-fade-up">
              {banner.icon}
            </div>

            {/* Title */}
            <h1 className="text-[#f0ece9] font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-7xl font-bold text-center tracking-[2px] animate-fade-up delay-1">
              {banner.title}
            </h1>

            {/* Subtitle */}
            <p className="text-[#f0ece9] font-['Manrope'] text-lg sm:text-xl lg:text-2xl text-center opacity-90 animate-fade-up delay-2">
              {banner.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Previous Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-[#f0ece9] p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Anterior banner"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-[#f0ece9] p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Siguiente banner"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-3.5 h-3.5 bg-[#f0ece9]'
                : 'w-3 h-3 bg-[#f0ece9]/30 hover:bg-[#f0ece9]/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
        <h3 className="text-[#647257] font-['Playfair_Display'] text-lg font-semibold tracking-[1px] uppercase">
          {name}
        </h3>
        <a
          href={url}
          className="border border-[#647257] text-[#647257] font-['Manrope'] text-[11px] font-medium tracking-[1px] px-6 py-2 hover:bg-[#647257] hover:text-[#f0ece9] transition-colors"
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
    <section className="bg-[#f0ece9] px-4 sm:px-8 lg:px-20 py-12 lg:py-20">
      <div ref={ref} className="max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-12 animate-section">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 animate-fade-up">
          <h2 className="text-[#647257] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[42px]">NUESTRAS</h2>
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#647257]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <h2 className="text-[#647257] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[42px]">CATEGORÍAS</h2>
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
            <p className="text-[#7a8a6d] font-['Manrope']">No hay categorías disponibles</p>
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
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 bg-[#647257] px-6 sm:px-12 lg:px-20 py-12 lg:py-20">
        <span className="text-[#f0ece9] font-['Manrope'] text-xs font-semibold tracking-[3px] opacity-70 animate-fade-up delay-1">
          NUESTRA CARNE
        </span>
        <h2 className="text-[#f0ece9] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl leading-[1.15] animate-fade-up delay-2">
          Tradición y
          <br />
          Calidad en
          <br />
          Cada Corte
        </h2>
        <p className="text-[#f0ece9] font-['Manrope'] text-sm lg:text-[15px] leading-[1.7] opacity-90 max-w-[420px] animate-fade-up delay-3">
          Trabajamos directamente con los mejores ganaderos de la región, garantizando carnes de primera
          calidad con trazabilidad completa. Nuestro proceso de maduración en seco realza el sabor y la
          terneza de cada pieza.
        </p>
        <a
          href="/about"
          className="border border-[#f0ece9] text-[#f0ece9] font-['Manrope'] text-xs font-medium tracking-[1px] px-7 py-3.5 w-fit hover:bg-[#f0ece9] hover:text-[#647257] transition-colors animate-fade-up delay-4"
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
      className={`flex flex-col items-center gap-4 lg:gap-5 w-full sm:w-[280px] p-6 lg:p-8 border border-[#64725730] animate-fade-up`}
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      <div className="text-[#647257] w-8 h-8 lg:w-10 lg:h-10">
        {icon}
      </div>
      <h3
        className="text-[#647257] font-['Playfair_Display'] text-xl lg:text-[22px] leading-[1.2] text-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="text-[#7a8a6d] font-['Manrope'] text-xs lg:text-sm leading-[1.5] text-center max-w-[220px]">
        {description}
      </p>
    </div>
  );
}

// ============ SOSTENIBILIDAD SECTION ============
function SostenibilidadSection() {
  const ref = useIntersectionObserver();

  return (
    <section className="bg-[#f0ece9] px-4 sm:px-8 lg:px-20 py-12 lg:py-[100px]">
      <div ref={ref} className="max-w-7xl mx-auto flex flex-col items-center gap-10 lg:gap-[60px] animate-section">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 lg:gap-5">
          <span className="text-[#647257] font-['Manrope'] text-xs font-semibold tracking-[3px] animate-fade-up delay-1">
            COMPROMISO AMBIENTAL
          </span>
          <h2 className="text-[#647257] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl animate-fade-up delay-2">
            Sostenibilidad
          </h2>
          <p className="text-[#7a8a6d] font-['Manrope'] text-sm lg:text-base leading-[1.6] text-center max-w-[600px] px-4 animate-fade-up delay-3">
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
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 bg-[#e8e4e0] px-6 sm:px-12 lg:px-20 py-12 lg:py-20 order-2 lg:order-1">
        <span className="text-[#647257] font-['Manrope'] text-xs font-semibold tracking-[3px] animate-fade-up delay-1">
          CONTACTO
        </span>
        <h2 className="text-[#647257] font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] animate-fade-up delay-2">
          ¿Listo para
          <br />
          Probar lo Mejor?
        </h2>
        <p className="text-[#7a8a6d] font-['Manrope'] text-sm lg:text-[15px] leading-[1.6] max-w-[400px] animate-fade-up delay-3">
          Contáctanos para pedidos mayoristas, consultas sobre nuestros productos o para conocer más
          sobre nuestro proceso.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 lg:gap-4 animate-fade-up delay-4">
          <div className="flex items-center gap-3">
            <svg className="w-[18px] h-[18px] text-[#647257]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[#647257] font-['Manrope'] text-sm">+57 300 123 4567</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-[18px] h-[18px] text-[#647257]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-[#647257] font-['Manrope'] text-sm">pedidos@mariasmeat.com</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-[18px] h-[18px] text-[#647257]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[#647257] font-['Manrope'] text-sm">Bogotá, Colombia</span>
          </div>
        </div>

        <a
          href="/contact"
          className="bg-[#647257] text-[#f0ece9] font-['Manrope'] text-xs font-semibold tracking-[1px] px-7 py-3.5 w-fit hover:bg-[#556348] transition-colors animate-fade-up delay-5"
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

// ============ CUSTOM FOOTER ============
function CustomFooter() {
  return (
    <footer className="bg-[#647257] px-4 sm:px-8 lg:px-20 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-[#f0ece9] font-['Playfair_Display'] text-xl font-bold tracking-[2px]">
            MARIA'S MEAT MARKET
          </span>
          <span className="text-[#f0ece9] font-['Manrope'] text-[10px] tracking-[1.5px] opacity-70">
            DISTRIBUIDORA DE CARNES
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 lg:gap-8">
          <a href="/" className="text-[#f0ece9] font-['Manrope'] text-xs tracking-[1px] opacity-80 hover:opacity-100 transition-opacity">
            HOME
          </a>
          <a href="/productos" className="text-[#f0ece9] font-['Manrope'] text-xs tracking-[1px] opacity-80 hover:opacity-100 transition-opacity">
            COMPRAR
          </a>
          <a href="#nuestra-carne" className="text-[#f0ece9] font-['Manrope'] text-xs tracking-[1px] opacity-80 hover:opacity-100 transition-opacity">
            NUESTRA CARNE
          </a>
          <a href="#contacto" className="text-[#f0ece9] font-['Manrope'] text-xs tracking-[1px] opacity-80 hover:opacity-100 transition-opacity">
            CONTACTO
          </a>
        </nav>

        {/* Copyright */}
        <span className="text-[#f0ece9] font-['Manrope'] text-xs opacity-60">
          © 2024 Maria's Meat Market
        </span>
      </div>
    </footer>
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
    `}} />
  );
}

// ============ MAIN LANDING PAGE COMPONENT ============
export default function LandingPage({ categories }: LandingPageProps) {
  const categoryList = categories?.items || [];

  return (
    <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
      <AnimationStyles />
      <BannerCarousel />
      <CategoriesSection categories={categoryList} />
      <section id="nuestra-carne">
        <NuestraCarneSection />
      </section>
      <section id="sostenibilidad">
        <SostenibilidadSection />
      </section>
      <section id="contacto">
        <ContactSection />
      </section>
      <CustomFooter />
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
