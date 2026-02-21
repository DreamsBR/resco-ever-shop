import React from 'react';

export default function ContactPage() {
  const whatsappNumber = '51970520507';
  const whatsappMessage = encodeURIComponent('Hola, me gustaría obtener más información sobre sus productos.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="contact-page">
      <div className="contact-page__card">
        {/* Icon */}
        <div className="contact-page__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <span className="contact-page__tagline">CONTACTO</span>
        <h1 className="contact-page__title">¿Necesitas más información?</h1>
        <p className="contact-page__text">
          ¿Deseas comunicarte con nosotros? Estamos aquí para ayudarte.
          Haz clic en el botón de WhatsApp y te responderemos a la brevedad.
        </p>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-page__whatsapp-btn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          Escribir por WhatsApp
        </a>
      </div>

      <style>{`
        .contact-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
        }

        .contact-page__card {
          text-align: center;
          background: #ffffff;
          border: 1px solid #e8e6e3;
          border-radius: 12px;
          padding: 3.5rem 2.5rem;
          width: 100%;
        }

        .contact-page__icon {
          margin-bottom: 1.5rem;
        }

        .contact-page__tagline {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #95151c;
          opacity: 0.7;
          display: block;
          margin-bottom: 12px;
        }

        .contact-page__title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: normal;
          color: #95151c;
          margin: 0 0 16px;
          letter-spacing: 0.5px;
        }

        .contact-page__text {
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          color: #666;
          line-height: 1.8;
          margin: 0 0 2.5rem;
        }

        .contact-page__whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #ffffff;
          background: #25D366;
          padding: 16px 36px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .contact-page__whatsapp-btn:hover {
          background: #1ebe57;
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
        }

        @media (max-width: 767px) {
          .contact-page {
            padding: 2.5rem 1rem 3rem;
          }

          .contact-page__card {
            padding: 2.5rem 1.5rem;
          }

          .contact-page__title {
            font-size: 26px;
          }

          .contact-page__whatsapp-btn {
            padding: 14px 28px;
            font-size: 14px;
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
