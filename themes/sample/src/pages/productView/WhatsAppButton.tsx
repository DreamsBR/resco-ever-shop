import React from 'react';
import { useProduct } from '@components/frontStore/catalog/ProductContext.js';

export default function WhatsAppButton() {
  const product = useProduct();
  const productName = product?.name || 'Producto';
  const productSku = product?.sku || '';

  const phoneNumber = '51961109825';
  const message = `Hola, me interesa obtener más información sobre el producto: *${productName}* (SKU: ${productSku}). ¿Podrían ayudarme?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Consultar por WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg
          className="whatsapp-btn__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-btn__text">Pedir información por WhatsApp</span>
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .product-image {
          overflow: hidden;
        }

        .product-image img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
        }

        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 24px;
          margin-top: 12px;
          background-color: #25D366;
          color: #ffffff;
          font-family: 'Manrope', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-decoration: none;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }

        .whatsapp-btn:hover {
          background-color: #1EBE57;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          color: #ffffff;
          text-decoration: none;
        }

        .whatsapp-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.25);
        }

        .whatsapp-btn__icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .whatsapp-btn__text {
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .whatsapp-btn {
            font-size: 13px;
            padding: 12px 20px;
          }
        }
      `}} />
    </>
  );
}

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 35
};
