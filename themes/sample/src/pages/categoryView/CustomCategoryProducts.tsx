import React from 'react';
import { useCategory } from '@components/frontStore/catalog/CategoryContext.js';
import { ProductCard } from '../../components/ProductCard';

export default function CustomCategoryProducts() {
  const { showProducts, products } = useCategory();

  if (!showProducts) {
    return null;
  }

  return (
    <div className="custom-product-grid">
      {products.items.map((product: any) => (
        <div key={product.productId} className="custom-product-grid__item">
          <ProductCard product={product} />
        </div>
      ))}

      <style>{`
        .custom-product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }

        @media (min-width: 640px) {
          .custom-product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .custom-product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .custom-product-grid__item {
          opacity: 0;
          animation: fadeInUp 0.4s ease forwards;
        }

        .custom-product-grid__item:nth-child(1) { animation-delay: 0.05s; }
        .custom-product-grid__item:nth-child(2) { animation-delay: 0.1s; }
        .custom-product-grid__item:nth-child(3) { animation-delay: 0.15s; }
        .custom-product-grid__item:nth-child(4) { animation-delay: 0.2s; }
        .custom-product-grid__item:nth-child(5) { animation-delay: 0.25s; }
        .custom-product-grid__item:nth-child(6) { animation-delay: 0.3s; }
        .custom-product-grid__item:nth-child(7) { animation-delay: 0.35s; }
        .custom-product-grid__item:nth-child(8) { animation-delay: 0.4s; }
        .custom-product-grid__item:nth-child(9) { animation-delay: 0.45s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Replace the default category products component
export const layout = {
  areaId: 'categoryRightColumn',
  sortOrder: 20
};

export const query = `
  query Query {
    category: currentCategory {
      showProducts
      products {
        items {
          productId
          name
          sku
          url
          price {
            regular {
              value
              text
            }
            special {
              value
              text
            }
          }
          inventory {
            isInStock
          }
          image {
            url
            alt
          }
        }
        total
      }
    }
  }
`;
