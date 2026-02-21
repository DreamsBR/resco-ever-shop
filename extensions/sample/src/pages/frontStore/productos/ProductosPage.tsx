import React, { useState, useMemo } from 'react';
import { AddToCart } from '@components/frontStore/cart/AddToCart.js';
import { toast } from 'react-toastify';

interface ProductImage {
  url: string;
  alt?: string;
}

interface Product {
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
}

interface CategoryWithProducts {
  categoryId: number;
  name: string;
  url: string;
  image?: ProductImage | null;
  products?: {
    items: { productId: string }[];
    total: number;
  };
}

interface ProductosPageProps {
  allProducts?: {
    items: Product[];
    total: number;
  };
  categories?: {
    items: CategoryWithProducts[];
  };
}

// Inline ProductCard to avoid cross-directory import issues
function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.image;
  const secondImage =
    (product.gallery && product.gallery.length > 0)
      ? product.gallery[0]
      : (product.images && product.images.length > 1)
        ? product.images[1]
        : null;
  const hasSecondImage = !!secondImage;

  return (
    <div className={`product-card ${hasSecondImage ? 'has-hover-image' : ''}`}>
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
      <div className="product-card__info">
        <h3 className="product-card__name">
          <a href={product.url}>{product.name}</a>
        </h3>
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
        <div className="product-card__actions">
          <a href={product.url} className="product-card__info-btn">INFO</a>
          <AddToCart
            product={{ sku: product.sku, isInStock: product.inventory.isInStock }}
            qty={1}
            onError={(error: string) => toast.error(error)}
          >
            {(state: any, actions: any) => (
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
    </div>
  );
}

export default function ProductosPage({ allProducts, categories }: ProductosPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const products = allProducts?.items || [];
  const categoryList = categories?.items || [];

  // Build a map: categoryId -> Set of productIds
  const categoryProductMap = useMemo(() => {
    const map = new Map<number, Set<string>>();
    categoryList.forEach((cat) => {
      const productIds = new Set<string>();
      cat.products?.items?.forEach((p) => {
        productIds.add(p.productId);
      });
      map.set(cat.categoryId, productIds);
    });
    return map;
  }, [categoryList]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === null) {
      return products;
    }
    const productIds = categoryProductMap.get(selectedCategoryId);
    if (!productIds) return products;
    return products.filter((p) => productIds.has(p.productId));
  }, [products, selectedCategoryId, categoryProductMap]);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="productos-page">
      {/* Page Header */}
      <div className="productos-page__header">
        <span className="productos-page__tagline">CATÁLOGO</span>
        <h1 className="productos-page__title">Todos los Productos</h1>
        <p className="productos-page__subtitle">
          Explora nuestra selección completa de productos frescos y de calidad
        </p>
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="productos-page__content">
        {/* Sidebar */}
        <aside className="productos-page__sidebar">
          <div className="productos-page__filter-panel">
            <h3 className="productos-page__filter-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Categorías
            </h3>

            <ul className="productos-page__filter-list">
              {/* "All" option */}
              <li>
                <button
                  className={`productos-page__filter-item ${selectedCategoryId === null ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(null)}
                >
                  <span className="productos-page__filter-name">Todas las Categorías</span>
                  <span className="productos-page__filter-count">{products.length}</span>
                </button>
              </li>

              {/* Category options */}
              {categoryList.map((cat) => (
                <li key={cat.categoryId}>
                  <button
                    className={`productos-page__filter-item ${selectedCategoryId === cat.categoryId ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.categoryId)}
                  >
                    <span className="productos-page__filter-name">{cat.name}</span>
                    <span className="productos-page__filter-count">
                      {cat.products?.total || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Section */}
        <div className="productos-page__main">
          {/* Results bar */}
          <div className="productos-page__results-bar">
            <span className="productos-page__results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Producto' : 'Productos'}
              {selectedCategoryId !== null && (
                <> en <strong>{categoryList.find(c => c.categoryId === selectedCategoryId)?.name}</strong></>
              )}
            </span>
            {selectedCategoryId !== null && (
              <button
                className="productos-page__clear-filter"
                onClick={() => handleCategoryClick(null)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Limpiar filtro
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="productos-page__grid" key={selectedCategoryId ?? 'all'}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.productId}
                  className="productos-page__grid-item"
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.45)}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="productos-page__empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5" style={{ opacity: 0.3 }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <p>No se encontraron productos en esta categoría</p>
              <button
                className="productos-page__empty-btn"
                onClick={() => handleCategoryClick(null)}
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ============================================
           PRODUCTOS PAGE - Pencil Design System
           ============================================ */

        .productos-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }

        /* Page Header */
        .productos-page__header {
          text-align: center;
          padding: 3rem 0 2.5rem;
        }

        .productos-page__tagline {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #95151c;
          opacity: 0.7;
          display: block;
          margin-bottom: 12px;
        }

        .productos-page__title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: normal;
          color: #95151c;
          margin: 0 0 12px;
          letter-spacing: 1px;
        }

        .productos-page__subtitle {
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          color: #9a9a8a;
          margin: 0;
        }

        /* Content Layout */
        .productos-page__content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .productos-page__content {
            grid-template-columns: 260px 1fr;
            gap: 2.5rem;
          }
        }

        /* Sidebar */
        .productos-page__sidebar {
          width: 100%;
        }

        .productos-page__filter-panel {
          background: #ffffff;
          border: 1px solid #e8e6e3;
          border-radius: 8px;
          padding: 1.5rem;
          position: sticky;
          top: 100px;
        }

        .productos-page__filter-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #95151c;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e8e6e3;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .productos-page__filter-title svg {
          color: #95151c;
          flex-shrink: 0;
        }

        .productos-page__filter-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .productos-page__filter-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          text-align: left;
        }

        .productos-page__filter-item:hover {
          background: #f8f6f3;
        }

        .productos-page__filter-item.active {
          background: #95151c;
        }

        .productos-page__filter-name {
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          transition: color 0.2s ease;
        }

        .productos-page__filter-item.active .productos-page__filter-name {
          color: #ffffff;
          font-weight: 600;
        }

        .productos-page__filter-count {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #9a9a8a;
          background: #f0ece9;
          padding: 2px 8px;
          border-radius: 10px;
          min-width: 24px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .productos-page__filter-item.active .productos-page__filter-count {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        /* Results Bar */
        .productos-page__results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e8e6e3;
        }

        .productos-page__results-count {
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          color: #9a9a8a;
        }

        .productos-page__results-count strong {
          color: #95151c;
        }

        .productos-page__clear-filter {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #95151c;
          background: none;
          border: 1px solid #95151c;
          padding: 6px 14px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .productos-page__clear-filter:hover {
          background: #95151c;
          color: #ffffff;
        }

        /* Product Grid */
        .productos-page__grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }

        @media (min-width: 640px) {
          .productos-page__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .productos-page__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .productos-page__grid-item {
          opacity: 0;
          animation: productFadeInUp 0.4s ease forwards;
        }

        @keyframes productFadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Empty State */
        .productos-page__empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .productos-page__empty p {
          font-family: 'Manrope', sans-serif;
          font-size: 16px;
          color: #9a9a8a;
          margin: 1rem 0 1.5rem;
        }

        .productos-page__empty-btn {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #ffffff;
          background: #95151c;
          border: none;
          padding: 12px 32px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }

        .productos-page__empty-btn:hover {
          background: #7a1017;
        }

        /* ============================================
           PRODUCT CARD STYLES (inline)
           ============================================ */

        .product-card {
          background: #ffffff;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
        }

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

        .product-card__img-primary {
          position: relative;
          z-index: 1;
        }

        .product-card__img-secondary {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 2;
        }

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

        .product-card__info {
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

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

        .product-card__unit {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: normal;
          color: #9a9a8a;
        }

        .product-card__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding-top: 8px;
        }

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

        /* Mobile adjustments */
        @media (max-width: 767px) {
          .productos-page__header {
            padding: 2rem 0 1.5rem;
          }

          .productos-page__title {
            font-size: 32px;
          }

          .productos-page__filter-panel {
            position: static;
          }

          .productos-page__filter-list {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 6px;
          }

          .productos-page__filter-item {
            padding: 8px 14px;
            border: 1px solid #e8e6e3;
            border-radius: 20px;
            flex: 0 0 auto;
          }

          .productos-page__filter-item.active {
            border-color: #95151c;
          }

          .productos-page__filter-count {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    allProducts: products(filters: []) {
      items {
        ...Product
      }
      total
    }
    categories(filters: []) {
      items {
        categoryId
        name
        url
        image {
          alt
          url
        }
        products(filters: []) {
          items {
            productId
          }
          total
        }
      }
    }
  }
`;

export const fragments = `
  fragment Product on Product {
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
      alt
      url
    }
    gallery {
      alt
      url
    }
  }
`;
