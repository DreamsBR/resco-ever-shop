import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-page__hero">
        <span className="about-page__tagline">NOSOTROS</span>
        <h1 className="about-page__title">Sobre Resco</h1>
        <p className="about-page__intro">
          Más de 38 años llevando los mejores cortes de carne a hogares y negocios.
        </p>
      </section>

      {/* Divider */}
      <div className="about-page__divider">
        <span></span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span></span>
      </div>

      {/* About Description */}
      <section className="about-page__section">
        <div className="about-page__section-content">
          <h2 className="about-page__section-title">Nuestra Historia</h2>
          <p className="about-page__text">
            RESCO es un negocio familiar peruano con más de 38 años de experiencia en el mercado cárnico, dedicado a ofrecer carne de res de alta calidad con la confianza y compromiso que nuestros clientes merecen.
          </p>
          <p className="about-page__text">
            A lo largo de los años hemos construido una sólida reputación basada en la selección cuidadosa del producto, la frescura y altos estándares de manejo e higiene.
          </p>
          <p className="about-page__text">
            Contamos con la capacidad logística y el manejo de altos volúmenes de carne, lo que nos permite abastecer de manera eficiente tanto a hogares como a negocios gastronómicos, garantizando calidad y cumplimiento en cada pedido.
          </p>
          <p className="about-page__text">
            En RESCO, entendemos la importancia del tiempo y la planificación, por ello trabajamos mediante pedidos realizados con 24 horas de anticipacion, garantizando preparacion adecuada, frescura y entrega confiable.
          </p>
          <p className="about-page__text">
            Mas que una empresa, somos una familia comprometida con brindar seguridad, confianza y calidad en cada compra.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-page__cards">
        {/* Mission */}
        <div className="about-page__card">
          <div className="about-page__card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h2 className="about-page__card-title">MISIÓN</h2>
          <p className="about-page__card-text">
            Brindar carne de res fresca y de alta calidad, garantizando procesos responsables, preparación y entrega, generando confianza en cada cliente. 
          </p>
        </div>

        {/* Vision */}
        <div className="about-page__card">
          <div className="about-page__card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h2 className="about-page__card-title">NUESTRA VISIÓN</h2>
          <p className="about-page__card-text">
            Ser reconocidos como una empresa familiar referente en la comercialización de carne de res en Perú, destacando por nuestra experiencia, compromiso familiar y excelencia en el servicio. 
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-page__values">
        <h2 className="about-page__section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          Nuestros Valores
        </h2>
        <div className="about-page__values-grid">
          <div className="about-page__value">
            <div className="about-page__value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="about-page__value-title">Calidad</h3>
            <p className="about-page__value-text">
              Seleccionamos solo los mejores cortes, garantizando frescura y sabor en cada producto.
            </p>
          </div>
          <div className="about-page__value">
            <div className="about-page__value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="about-page__value-title">Compromiso</h3>
            <p className="about-page__value-text">
              Cada cliente es nuestra prioridad. Trabajamos para superar sus expectativas día a día.
            </p>
          </div>
          <div className="about-page__value">
            <div className="about-page__value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="about-page__value-title">Confianza</h3>
            <p className="about-page__value-text">
              Transparencia y honestidad en cada proceso, desde la selección hasta la entrega final.
            </p>
          </div>
          <div className="about-page__value">
            <div className="about-page__value-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="about-page__value-title">Cercanía</h3>
            <p className="about-page__value-text">
              Mantenemos una relación cercana con nuestros clientes, entendiendo sus necesidades.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-page__cta">
        <h2 className="about-page__cta-title">¿Listo para probar la diferencia?</h2>
        <p className="about-page__cta-text">
          Descubre nuestra selección completa de cortes premium y lleva lo mejor a tu mesa.
        </p>
        <a href="/productos" className="about-page__cta-btn">
          Ver Productos
        </a>
      </section>

      <style>{`
        .about-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
        }

        /* Hero */
        .about-page__hero {
          text-align: center;
          padding: 3rem 0 2rem;
        }

        .about-page__tagline {
          font-family: 'Manrope', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #95151c;
          opacity: 0.7;
          display: block;
          margin-bottom: 12px;
        }

        .about-page__title {
          font-family: 'Playfair Display', serif;
          font-size: 46px;
          font-weight: normal;
          color: #95151c;
          margin: 0 0 16px;
          letter-spacing: 1px;
        }

        .about-page__intro {
          font-family: 'Manrope', sans-serif;
          font-size: 16px;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Divider */
        .about-page__divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 1rem 0 2.5rem;
        }

        .about-page__divider span {
          width: 60px;
          height: 1px;
          background: #e0d6cc;
        }

        /* Section */
        .about-page__section {
          margin-bottom: 3rem;
        }

        .about-page__section-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .about-page__section-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: normal;
          color: #95151c;
          margin: 0 0 1.5rem;
          letter-spacing: 0.5px;
        }

        .about-page__text {
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          color: #555;
          line-height: 1.8;
          margin: 0 0 1.25rem;
        }

        .about-page__text:last-child {
          margin-bottom: 0;
        }

        /* Mission & Vision Cards */
        .about-page__cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 768px) {
          .about-page__cards {
            grid-template-columns: 1fr 1fr;
          }
        }

        .about-page__card {
          background: #ffffff;
          border: 1px solid #e8e6e3;
          border-radius: 8px;
          padding: 2.5rem 2rem;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .about-page__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(149, 21, 28, 0.08);
        }

        .about-page__card-icon {
          margin-bottom: 1.25rem;
        }

        .about-page__card-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: normal;
          color: #95151c;
          margin: 0 0 1rem;
          letter-spacing: 0.5px;
        }

        .about-page__card-text {
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          color: #666;
          line-height: 1.8;
          margin: 0;
        }

        /* Values */
        .about-page__values {
          margin-bottom: 3.5rem;
        }

        .about-page__values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .about-page__values-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .about-page__values-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .about-page__value {
          text-align: center;
          padding: 2rem 1rem;
        }

        .about-page__value-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #f9f4e1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .about-page__value-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #95151c;
          margin: 0 0 0.75rem;
          letter-spacing: 0.5px;
        }

        .about-page__value-text {
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          color: #777;
          line-height: 1.7;
          margin: 0;
        }

        /* CTA */
        .about-page__cta {
          text-align: center;
          background: #95151c;
          border-radius: 8px;
          padding: 3.5rem 2rem;
        }

        .about-page__cta-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: normal;
          color: #f9f4e1;
          margin: 0 0 12px;
        }

        .about-page__cta-text {
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          color: #f9f4e1;
          opacity: 0.8;
          margin: 0 0 2rem;
        }

        .about-page__cta-btn {
          display: inline-block;
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: #95151c;
          background: #f9f4e1;
          padding: 14px 36px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }

        .about-page__cta-btn:hover {
          background: #ffffff;
          transform: scale(1.05);
        }

        /* Responsive */
        @media (max-width: 767px) {
          .about-page__title {
            font-size: 34px;
          }

          .about-page__section-title {
            font-size: 24px;
          }

          .about-page__card {
            padding: 2rem 1.5rem;
          }

          .about-page__card-title {
            font-size: 20px;
          }

          .about-page__cta {
            padding: 2.5rem 1.5rem;
          }

          .about-page__cta-title {
            font-size: 22px;
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
