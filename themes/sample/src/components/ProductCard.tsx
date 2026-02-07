import React from 'react';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: {
    productId: string;
    name: string;
    sku: string;
    url: string;
    price: {
      regular: { value: number; text: string };
      special?: { value: number; text: string };
    };
    inventory: { isInStock: boolean };
    image?: { url: string; alt?: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-card__image">
        <a href={product.url}>
          {product.image ? (
            <img
              src={product.image.url}
              alt={product.image.alt || product.name}
              loading="lazy"
            />
          ) : (
            <div className="product-card__no-image">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#647257" strokeWidth="1.5" opacity="0.3">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </a>
      </div>

      {/* Product Info */}
      <div className="product-card__info">
        {/* Product Name */}
        <h3 className="product-card__name">
          <a href={product.url}>{product.name}</a>
        </h3>

        {/* Price with Unit */}
        <div className="product-card__price">
          {product.price.special && product.price.special.value < product.price.regular.value ? (
            <>
              <span className="product-card__price-old">{product.price.regular.text}</span>
              <span className="product-card__price-current">{product.price.special.text}</span>
            </>
          ) : (
            <span className="product-card__price-current">{product.price.regular.text}</span>
          )}
          <span className="product-card__unit">/ {product.sku}</span>
        </div>

        {/* Actions: INFO Button + Cart Icon */}
        <div className="product-card__actions">
          <a href={product.url} className="product-card__info-btn">
            INFO
          </a>

          <AddToCart
            product={{
              sku: product.sku,
              isInStock: product.inventory.isInStock
            }}
            qty={1}
            onError={(error) => toast.error(error)}
          >
            {(state, actions) => (
              <button
                className="product-card__cart-btn"
                disabled={!state.canAddToCart || state.isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  actions.addToCart();
                }}
                aria-label="Agregar al carrito"
              >
                {state.isLoading ? (
                  <svg className="product-card__spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                )}
              </button>
            )}
          </AddToCart>
        </div>
      </div>

      <style>{`
        .product-card {
          background: #ffffff;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
        }

        /* Product Image */
        .product-card__image {
          position: relative;
          height: 320px;
          width: 100%;
          overflow: hidden;
          background: #f8f6f3;
        }

        .product-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-card__image img {
          transform: scale(1.05);
        }

        .product-card__no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f6f3;
        }

        /* Product Info */
        .product-card__info {
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        /* Product Name - Playfair Display, 18px, weight 600, #647257 */
        .product-card__name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #647257;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-align: center;
          margin: 0;
          line-height: 1.4;
        }

        .product-card__name a {
          color: inherit;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .product-card__name a:hover {
          opacity: 0.8;
        }

        /* Price - Manrope, 14px, #7a8a6d */
        .product-card__price {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .product-card__price-current {
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: normal;
          color: #7a8a6d;
        }

        .product-card__price-old {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          color: #9a9a8a;
          text-decoration: line-through;
        }

        /* Unit - Manrope, 12px, #9a9a8a */
        .product-card__unit {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: normal;
          color: #9a9a8a;
        }

        /* Actions - INFO Button + Cart Icon - Always visible */
        .product-card__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding-top: 8px;
        }

        /* INFO Button - Border 1px #647257, padding 8px 24px */
        .product-card__info-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #647257;
          background: transparent;
          border: 1px solid #647257;
          padding: 8px 24px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
        }

        .product-card__info-btn:hover {
          background: #647257;
          color: #ffffff;
          transform: scale(1.05);
        }

        /* Cart Button - Icon 18x18, #647257 */
        .product-card__cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #647257;
          background: transparent;
          border: 1px solid #647257;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .product-card__cart-btn:hover {
          background: #647257;
          color: #ffffff;
          transform: scale(1.1);
        }

        .product-card__cart-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .product-card__spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .product-card__image {
            height: 280px;
          }
        }

        @media (max-width: 768px) {
          .product-card__image {
            height: 240px;
          }

          .product-card__name {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .product-card__image {
            height: 200px;
          }

          .product-card__name {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
