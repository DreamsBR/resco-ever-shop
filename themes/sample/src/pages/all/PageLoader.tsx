import React, { useState, useEffect } from 'react';

export default function PageLoader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore external links, new tabs, anchors, javascript:, mailto:, tel:
      if (link.target === '_blank') return;
      if (href.startsWith('#')) return;
      if (href.startsWith('javascript:')) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Ignore links to external domains
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        // Ignore if staying on the same page (same pathname, only hash change)
        if (url.pathname === window.location.pathname) return;
      } catch {
        return;
      }

      setShowLoader(true);
    };

    // Handle browser back/forward buttons
    const handlePopState = () => {
      setShowLoader(true);
    };

    // Hide loader when page is loaded
    const handlePageShow = () => {
      setShowLoader(false);
    };

    // Hide loader on load (fallback)
    const handleLoad = () => {
      setShowLoader(false);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('load', handleLoad);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!showLoader) return null;

  return (
    <>
      <div className="page-loader">
        <div className="page-loader__content">
          <div className="page-loader__logo-wrapper">
            <img src="/assets/resco-logo.png" alt="Resco" className="page-loader__logo" />
          </div>
          <span className="page-loader__text">Cargando...</span>
        </div>
      </div>
      <style>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(248, 246, 243, 0.94);
          animation: pageLoaderFadeIn 0.2s ease forwards;
        }

        @keyframes pageLoaderFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .page-loader__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .page-loader__logo-wrapper {
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pageLoaderSpin 1.8s ease-in-out infinite;
        }

        @keyframes pageLoaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .page-loader__logo {
          width: 120px;
          height: 120px;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        .page-loader__text {
          font-family: 'Manrope', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #9a9a8a;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 100
};
