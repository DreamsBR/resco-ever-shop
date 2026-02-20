import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { ProductData } from '@components/frontStore/catalog/ProductContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

export const ProductListItemRender = ({
  product,
  imageWidth,
  imageHeight,
  layout = 'grid',
  showAddToCart = false,
  customAddToCartRenderer
}: {
  product: ProductData;
  imageWidth?: number;
  imageHeight?: number;
  layout?: 'grid' | 'list';
  showAddToCart?: boolean;
  customAddToCartRenderer?: (product: ProductData) => ReactNode;
}) => {
  // For list layout, keep the original behavior
  if (layout === 'list') {
    return (
      <div className="product__list__item__inner group relative overflow-hidden flex gap-4 p-4">
        <div className="product__list__image flex-shrink-0">
          <a href={product.url}>
            {product.image && (
              <Image
                src={product.image.url}
                alt={product.image.alt || product.name}
                width={imageWidth || 120}
                height={imageHeight || 120}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg"
              />
            )}
            {!product.image && (
              <ProductNoThumbnail width={imageWidth} height={imageHeight} />
            )}
          </a>
        </div>

        <div className="product__list__info flex-1 flex flex-col justify-between">
          <div>
            <h3 className="product__list__name h5 mb-2">
              <a
                href={product.url}
                className="hover:text-primary transition-colors"
              >
                {product.name}
              </a>
            </h3>

            <div className="product__list__sku text-sm text-gray-600 mb-2">
              {_('SKU ${sku}', { sku: product.sku })}
            </div>

            <div className="product__list__price mb-2">
              {product.price.special &&
              product.price.regular < product.price.special ? (
                <div className="flex items-center gap-2">
                  <span
                    className="regular-price text-sm"
                    style={{ textDecoration: 'line-through', color: '#777' }}
                  >
                    {product.price.regular.text}
                  </span>
                  <span
                    className="special-price text-lg font-bold"
                    style={{ color: '#e53e3e' }}
                  >
                    {product.price.special.text}
                  </span>
                </div>
              ) : (
                <span className="regular-price text-lg font-bold">
                  {product.price.regular.text}
                </span>
              )}
            </div>

            <div className="product__list__stock mb-3">
              {product.inventory.isInStock ? (
                <span className="text-green-600 text-sm font-medium">
                  {_('In Stock')}
                </span>
              ) : (
                <span className="text-red-600 text-sm font-medium">
                  {_('Out of Stock')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For grid layout - Custom Pencil Design
  const [isHovering, setIsHovering] = React.useState(false);

  // Get second image from gallery if available (only first 2 images)
  const secondImage = product.gallery && product.gallery.length > 0 ? product.gallery[0] : null;

  return (
    <div
      className="product__list__item__inner group overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Product Image - 320px height as per Pencil design with smooth transition */}
      <div className="product__list__image">
        <a href={product.url} className="product-image-link">
          {/* Primary Image */}
          {product.image && (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.name}
              width={imageWidth || 320}
              height={imageHeight || 320}
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`product-primary-image ${secondImage ? 'has-second-image' : ''}`}
              style={{
                opacity: isHovering && secondImage ? 0 : 1,
                transform: isHovering ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          )}

          {/* Second Image (from gallery) - Shows on hover with fade effect */}
          {secondImage && (
            <Image
              src={secondImage.url}
              alt={secondImage.alt || product.name}
              width={imageWidth || 320}
              height={imageHeight || 320}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="product-secondary-image"
              style={{
                opacity: isHovering ? 1 : 0,
                transform: isHovering ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          )}

          {!product.image && !secondImage && (
            <ProductNoThumbnail width={imageWidth || 320} height={imageHeight || 320} />
          )}
        </a>
      </div>

      {/* Product Info - Gap 8px between elements */}
      <div className="product__list__info">
        {/* Product Name - Playfair Display, 18px, weight 600 */}
        <h3 className="product__list__name">
          <a href={product.url}>{product.name}</a>
        </h3>

        {/* Product Price - Manrope, 14px */}
        <div className="product__list__price">
          {product.price.special &&
          product.price.regular.value > product.price.special.value ? (
            <>
              <span className="regular-price">
                {product.price.regular.text}
              </span>
              <span className="special-price">
                {product.price.special.text}
              </span>
            </>
          ) : (
            <span className="regular-price">
              {product.price.regular.text}
            </span>
          )}
        </div>
      </div>

      {/* Product Actions - INFO button + Cart Icon - Always visible */}
      <div className="product__list__actions">
        {customAddToCartRenderer ? (
          customAddToCartRenderer(product)
        ) : (
          <>
            {/* INFO Button - Border 1px #95151c, padding 8px 24px */}
            <a href={product.url} className="btn">
              {_('INFO')}
            </a>

            {/* Cart Icon - 18x18px - Adds to cart on click */}
            <AddToCart
              product={{
                sku: product.sku,
                isInStock: product.inventory.isInStock
              }}
              qty={1}
              onError={(error) => toast.error(error)}
              onSuccess={() => toast.success(_('Product added to cart'))}
            >
              {(state, actions) => (
                <svg
                  className="cart-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (state.canAddToCart && !state.isLoading) {
                      actions.addToCart();
                    }
                  }}
                  style={{
                    cursor: state.canAddToCart && !state.isLoading ? 'pointer' : 'not-allowed',
                    opacity: state.isLoading ? 0.5 : 1
                  }}
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              )}
            </AddToCart>
          </>
        )}
      </div>
    </div>
  );
};
