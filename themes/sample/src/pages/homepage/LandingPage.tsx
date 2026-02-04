import React from 'react';

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

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section className="flex items-center gap-[60px] h-[600px] px-20 py-20 bg-[#f0ece9]">
      {/* Hero Content */}
      <div className="flex flex-col gap-8 flex-1">
        <span className="text-[#647257] font-['Manrope'] text-xs font-semibold tracking-[3px]">
          CALIDAD PREMIUM
        </span>
        <h1 className="text-[#647257] font-['Playfair_Display'] text-[56px] leading-[1.1] w-[500px]">
          Carnes de Alta
          <br />
          Calidad para
          <br />
          Paladares Exigentes
        </h1>
        <p className="text-[#7a8a6d] font-['Manrope'] text-base leading-[1.6] w-[450px]">
          Distribuidora de carnes premium para restaurantes y hogares de alto estándar.
          Seleccionamos los mejores cortes con dedicación artesanal.
        </p>
        <a
          href="/categories"
          className="inline-flex bg-[#647257] text-[#f0ece9] font-['Manrope'] text-xs font-semibold tracking-[1px] px-8 py-4 w-fit hover:bg-[#556348] transition-colors"
        >
          VER PRODUCTOS
        </a>
      </div>

      {/* Hero Image */}
      <div
        className="w-[550px] h-[450px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1690983323501-66dd0049181f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
        }}
      />
    </section>
  );
}

// ============ CATEGORY CARD ============
interface CategoryCardProps {
  name: string;
  image: string;
  url: string;
}

function CategoryCard({ name, image, url }: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-4 w-[280px]">
      <div
        className="w-full h-[320px] bg-cover bg-center"
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
  return (
    <section className="flex flex-col items-center gap-12 px-20 py-20 bg-[#f0ece9]">
      {/* Section Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-[#647257] font-['Playfair_Display'] text-[42px]">NUESTRAS</h2>
        <svg className="w-8 h-8 text-[#647257]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
        <h2 className="text-[#647257] font-['Playfair_Display'] text-[42px]">CATEGORÍAS</h2>
      </div>

      {/* Categories Grid */}
      <div className="flex justify-center gap-6 w-full flex-wrap">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.categoryId}
              name={category.name}
              image={getCategoryImage(category)}
              url={category.url}
            />
          ))
        ) : (
          <p className="text-[#7a8a6d] font-['Manrope']">No hay categorías disponibles</p>
        )}
      </div>
    </section>
  );
}

// ============ NUESTRA CARNE SECTION ============
function NuestraCarneSection() {
  return (
    <section className="flex h-[550px]">
      {/* Image */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1765295218807-2d58d3b01123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
        }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center gap-8 bg-[#647257] px-20 py-20">
        <span className="text-[#f0ece9] font-['Manrope'] text-xs font-semibold tracking-[3px] opacity-70">
          NUESTRA CARNE
        </span>
        <h2 className="text-[#f0ece9] font-['Playfair_Display'] text-5xl leading-[1.15] w-[400px]">
          Tradición y
          <br />
          Calidad en
          <br />
          Cada Corte
        </h2>
        <p className="text-[#f0ece9] font-['Manrope'] text-[15px] leading-[1.7] opacity-90 w-[420px]">
          Trabajamos directamente con los mejores ganaderos de la región, garantizando carnes de primera
          calidad con trazabilidad completa. Nuestro proceso de maduración en seco realza el sabor y la
          terneza de cada pieza.
        </p>
        <a
          href="/about"
          className="border border-[#f0ece9] text-[#f0ece9] font-['Manrope'] text-xs font-medium tracking-[1px] px-7 py-3.5 w-fit hover:bg-[#f0ece9] hover:text-[#647257] transition-colors"
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
}

function SustainabilityCard({ icon, title, description }: SustainabilityCardProps) {
  return (
    <div className="flex flex-col items-center gap-5 w-[280px] p-8 border border-[#64725730]">
      <div className="text-[#647257] w-10 h-10">
        {icon}
      </div>
      <h3
        className="text-[#647257] font-['Playfair_Display'] text-[22px] leading-[1.2] text-center w-[200px]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="text-[#7a8a6d] font-['Manrope'] text-sm leading-[1.5] text-center w-[220px]">
        {description}
      </p>
    </div>
  );
}

// ============ SOSTENIBILIDAD SECTION ============
function SostenibilidadSection() {
  return (
    <section className="flex flex-col items-center gap-[60px] px-20 py-[100px] bg-[#f0ece9]">
      {/* Header */}
      <div className="flex flex-col items-center gap-5">
        <span className="text-[#647257] font-['Manrope'] text-xs font-semibold tracking-[3px]">
          COMPROMISO AMBIENTAL
        </span>
        <h2 className="text-[#647257] font-['Playfair_Display'] text-5xl">
          Sostenibilidad
        </h2>
        <p className="text-[#7a8a6d] font-['Manrope'] text-base leading-[1.6] text-center w-[600px]">
          Creemos en una producción responsable que respeta el medio ambiente y el bienestar animal.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex justify-center gap-10 w-full">
        <SustainabilityCard
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
    </section>
  );
}

// ============ CONTACT SECTION ============
function ContactSection() {
  return (
    <section className="flex h-[500px]">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center gap-8 bg-[#e8e4e0] px-20 py-20">
        <span className="text-[#647257] font-['Manrope'] text-xs font-semibold tracking-[3px]">
          CONTACTO
        </span>
        <h2 className="text-[#647257] font-['Playfair_Display'] text-[44px] leading-[1.15] w-[380px]">
          ¿Listo para
          <br />
          Probar lo Mejor?
        </h2>
        <p className="text-[#7a8a6d] font-['Manrope'] text-[15px] leading-[1.6] w-[400px]">
          Contáctanos para pedidos mayoristas, consultas sobre nuestros productos o para conocer más
          sobre nuestro proceso.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
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
          className="bg-[#647257] text-[#f0ece9] font-['Manrope'] text-xs font-semibold tracking-[1px] px-7 py-3.5 w-fit hover:bg-[#556348] transition-colors"
        >
          ENVIAR MENSAJE
        </a>
      </div>

      {/* Image */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564068358866-3f1ccefcfbc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
        }}
      />
    </section>
  );
}

// ============ MAIN LANDING PAGE COMPONENT ============
export default function LandingPage({ categories }: LandingPageProps) {
  const categoryList = categories?.items || [];

  return (
    <div className="w-full">
      <HeroSection />
      <CategoriesSection categories={categoryList} />
      <NuestraCarneSection />
      <SostenibilidadSection />
      <ContactSection />
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
