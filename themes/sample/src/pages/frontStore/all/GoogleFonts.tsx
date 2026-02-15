import React from 'react';

export default function GoogleFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Base styles for the site */
            html, body {
              background-color: #f0ece9;
              overflow-x: hidden;
              max-width: 100vw;
            }

            /* Prevent horizontal overflow */
            .content {
              overflow-x: hidden;
            }

            /* Font fallbacks */
            .font-playfair {
              font-family: 'Playfair Display', Georgia, serif;
            }

            .font-manrope {
              font-family: 'Manrope', system-ui, sans-serif;
            }

            /* Hide default Evershop header sections - show only our custom header */
            .header__middle,
            .header__bottom {
              display: none !important;
            }

            /* Style the header container */
            .header {
              padding: 0 !important;
              background: #f0ece9 !important;
            }

            .header__top {
              width: 100%;
            }

            /* Hide default Evershop footer */
            footer.footer {
              display: none !important;
            }

            /* IMPORTANT: Hide ALL Evershop's default MiniCart/Sheet/Dialog elements */
            .mini__cart__wrapper,
            [data-slot="sheet"],
            [data-slot="sheet-portal"],
            [data-slot="sheet-overlay"],
            [data-slot="sheet-content"],
            [data-slot="sheet-close"],
            [data-slot="dialog"],
            [data-slot="dialog-popup"],
            [data-slot="dialog-backdrop"],
            .minicart__items__container,
            [role="dialog"]:not(#cart-sidebar-container *),
            .fixed[data-state] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
            }

            /* Cart sidebar container - don't override internal styles */
            #cart-sidebar-container {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
            }

            /* Spin animation for loading spinners */
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            /* Hide default Evershop product list - we use custom ProductCard */
            .product__grid,
            .product__list {
              display: none !important;
            }

            /* Hide the default product count text */
            .product-count {
              display: none !important;
            }

            /* Ensure our custom grid is visible */
            .custom-product-grid {
              display: grid !important;
            }
          `
        }}
      />
    </>
  );
}

// Render in the head section
export const layout = {
  areaId: 'head',
  sortOrder: 1
};
