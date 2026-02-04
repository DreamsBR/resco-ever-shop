import React from 'react';

// The cart data is already provided by Evershop's Base layout through CartProvider
// We can access it via the myCart prop that gets passed from the parent query
interface HeaderProps {
  myCart?: {
    totalQty: number;
  } | null;
}

export default function Header({ myCart }: HeaderProps) {
  const cartQty = myCart?.totalQty || 0;

  return (
    <header className="flex items-center justify-between h-20 px-20 bg-[#f0ece9]">
      {/* Logo */}
      <a href="/" className="flex flex-col gap-0.5">
        <span className="text-[#647257] font-['Playfair_Display'] text-2xl font-bold tracking-[2px]">
          MARIA'S MEAT MARKET
        </span>
        <span className="text-[#647257] font-['Manrope'] text-[10px] tracking-[1.5px]">
          DISTRIBUIDORA DE CARNES
        </span>
      </a>

      {/* Navigation */}
      <nav className="flex items-center gap-12">
        <a
          href="/"
          className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all"
        >
          HOME
        </a>
        <a
          href="/categories"
          className="text-[#647257] font-['Manrope'] text-xs font-semibold tracking-[1px] hover:opacity-80 transition-opacity"
        >
          COMPRAR
        </a>
        <a
          href="#nuestra-carne"
          className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all"
        >
          NUESTRA CARNE
        </a>
        <a
          href="#sostenibilidad"
          className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all"
        >
          SOSTENIBILIDAD
        </a>
        <a
          href="#contacto"
          className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all"
        >
          CONTACTO
        </a>
      </nav>

      {/* Cart Icon */}
      <a href="/cart" className="relative text-[#647257] hover:opacity-80 transition-opacity">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        {cartQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#647257] text-[#f0ece9] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartQty}
          </span>
        )}
      </a>
    </header>
  );
}

// Layout configuration - render at the top of body
export const layout = {
  areaId: 'body',
  sortOrder: 5
};

// Use myCart which is already available from Evershop's base query
// This query gets the cart using the session (no ID required)
export const query = `
  query Query {
    myCart {
      totalQty
    }
  }
`;
