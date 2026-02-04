import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-10 bg-[#12366a] px-20 py-[60px]">
      {/* Main Footer */}
      <div className="flex justify-between w-full">
        {/* Brand */}
        <div className="flex flex-col gap-4 w-[300px]">
          <span className="text-[#f0ece9] font-['Playfair_Display'] text-xl font-bold tracking-[1px]">
            MARIA'S MEAT MARKET
          </span>
          <p className="text-[#f0ece9] font-['Manrope'] text-[13px] leading-[1.5] opacity-70">
            Distribuidora de carnes premium para los paladares más exigentes desde 1985.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#f0ece9] hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#f0ece9] hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-[#f0ece9] hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-20">
          {/* Navigation Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[#f0ece9] font-['Manrope'] text-[11px] font-semibold tracking-[2px]">
              NAVEGACIÓN
            </span>
            <a href="/" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Home
            </a>
            <a href="/categories" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Comprar
            </a>
            <a href="#nuestra-carne" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Nuestra Carne
            </a>
            <a href="#sostenibilidad" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Sostenibilidad
            </a>
          </div>

          {/* Products Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[#f0ece9] font-['Manrope'] text-[11px] font-semibold tracking-[2px]">
              PRODUCTOS
            </span>
            <a href="/categories" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Cortes Premium
            </a>
            <a href="/categories" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Hamburguesas
            </a>
            <a href="/categories" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Embutidos
            </a>
            <a href="/categories" className="text-[#f0ece9] font-['Manrope'] text-[13px] opacity-70 hover:opacity-100 transition-opacity">
              Ofertas
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between w-full pt-5 border-t border-[#f0ece930]">
        <span className="text-[#f0ece9] font-['Manrope'] text-xs opacity-50">
          © {currentYear} Maria's Meat Market. Todos los derechos reservados.
        </span>
        <div className="flex gap-6">
          <a href="/terms" className="text-[#f0ece9] font-['Manrope'] text-xs opacity-50 hover:opacity-100 transition-opacity">
            Términos y Condiciones
          </a>
          <a href="/privacy" className="text-[#f0ece9] font-['Manrope'] text-xs opacity-50 hover:opacity-100 transition-opacity">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}

// Layout configuration - render at the bottom of body
export const layout = {
  areaId: 'body',
  sortOrder: 100
};
