import React from 'react';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { toast } from 'react-toastify';

interface ProductImage {
  url: string;
  alt?: string;
}

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
    image?: ProductImage;
    images?: ProductImage[];
    gallery?: ProductImage[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  // Get primary image and second image for hover effect
  const primaryImage = product.image;
  // Try to get second image from gallery first, then from images array
  const secondImage =
    (product.gallery && product.gallery.length > 0)
      ? product.gallery[0]  // gallery contains additional images (not the main one)
      : (product.images && product.images.length > 1)
        ? product.images[1]  // images includes main + additional, so use index 1
        : null;

  // Only apply hover effect if there's a second image
  const hasSecondImage = !!secondImage;

  return (
    <div className={`product-card ${hasSecondImage ? 'has-hover-image' : ''}`}>
      {/* Product Image */}
      <div className="product-card__image">
        <a href={product.url}>
          {primaryImage ? (
            <>
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                loading="lazy"
                className="product-card__img-primary"
              />
              {hasSecondImage && (
                <img
                  src={secondImage!.url}
                  alt={secondImage!.alt || product.name}
                  loading="lazy"
                  className="product-card__img-secondary"
                />
              )}
            </>
          ) : (
            <div className="product-card__no-image">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5" opacity="0.3">
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
          transition: opacity 0.4s ease, transform 0.5s ease;
        }

        /* Primary image - visible by default */
        .product-card__img-primary {
          position: relative;
          z-index: 1;
        }

        /* Secondary image - hidden by default, shown on hover */
        .product-card__img-secondary {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 2;
        }

        /* Only fade primary image when there IS a secondary image */
        .product-card.has-hover-image:hover .product-card__img-primary {
          opacity: 0;
        }

        .product-card.has-hover-image:hover .product-card__img-secondary {
          opacity: 1;
        }

        .product-card:hover .product-card__image img {
          transform: scale(1.02);
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

        /* Product Name - Playfair Display, 18px, weight 600, #95151c */
        .product-card__name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #95151c;
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

        /* Price - Manrope, 14px, #000000 */
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
          color: #000000;
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

        /* INFO Button - Border 1px #95151c, padding 8px 24px */
        .product-card__info-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #95151c;
          background: transparent;
          border: 1px solid #95151c;
          padding: 8px 24px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
        }

        .product-card__info-btn:hover {
          background: #95151c;
          color: #ffffff;
          transform: scale(1.05);
        }

        /* Cart Button - Icon 18x18, #95151c */
        .product-card__cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #95151c;
          background: transparent;
          border: 1px solid #95151c;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .product-card__cart-btn:hover {
          background: #95151c;
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
