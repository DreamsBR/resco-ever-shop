import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useCartState, useCartDispatch } from '@components/frontStore/cart/CartContext.js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const prevQtyRef = useRef<number>(-1); // Start at -1 to detect first load
  const hasInitializedRef = useRef(false);

  // Get cart data from Evershop's CartContext
  const { data: cart, syncStatus } = useCartState();
  const { removeItem } = useCartDispatch();

  const cartQty = cart?.totalQty || 0;
  const cartItems = cart?.items || [];
  const cartTotal = cart?.subTotal?.text || '$0.00';

  // Track if component is mounted (for portal)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Open cart when item is added (after initial load)
  useEffect(() => {
    // Skip first render to avoid opening cart on page load
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      prevQtyRef.current = cartQty;
      return;
    }

    // Open cart when quantity increases
    if (cartQty > prevQtyRef.current) {
      setIsCartOpen(true);
    }
    prevQtyRef.current = cartQty;
  }, [cartQty]);

  // Close cart function - also dispatch ESC to close any Evershop dialogs
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    // Dispatch ESC key event to close any other open dialogs (Evershop's MiniCart)
    const escEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true
    });
    document.dispatchEvent(escEvent);
  }, []);

  // Control body scroll
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isCartOpen]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRemoveItem = useCallback(async (itemId: string) => {
    setRemovingItemId(itemId);
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setRemovingItemId(null);
    }
  }, [removeItem]);

  return (
    <>
      <div className="flex items-center justify-between w-full h-16 sm:h-20 px-4 sm:px-8 lg:px-20 bg-[#f9f4e1]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/assets/resco-logo.png" 
            alt="Resco" 
            className="w-20 h-20 sm:w-[120px] sm:h-[120px] object-contain"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-[#95151c] font-['Playfair_Display'] text-lg sm:text-2xl font-bold tracking-[1px] sm:tracking-[2px]">
              RESCO
            </span>
            <span className="text-[#95151c] font-['Manrope'] text-[8px] sm:text-[10px] tracking-[1px] sm:tracking-[1.5px]">
              DISTRIBUIDORA DE CARNES
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          <a href="/" className="text-[#95151c] font-['Manrope'] text-sm font-medium tracking-[1px] hover:font-bold hover:underline transition-all">
            HOME
          </a>
          <a href="/productos" className="text-[#95151c] font-['Manrope'] text-sm font-medium tracking-[1px] hover:font-bold hover:underline transition-all">
            COMPRAR
          </a>
          <a href="/#nuestra-carne" className="text-[#95151c] font-['Manrope'] text-sm font-medium tracking-[1px] hover:font-bold hover:underline transition-all">
            NUESTRA CARNE
          </a>
          <a href="/#sostenibilidad" className="text-[#95151c] font-['Manrope'] text-sm font-medium tracking-[1px] hover:font-bold hover:underline transition-all">
            SOSTENIBILIDAD
          </a>
          <a href="/contact" className="text-[#95151c] font-['Manrope'] text-sm font-medium tracking-[1px] hover:font-bold hover:underline transition-all">
            CONTACTO
          </a>
        </nav>

        {/* Right Section: WhatsApp + Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/51970520507?text=Hola,%20estoy%20interesado%20en%20sus%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:opacity-80 transition-opacity p-1"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Cart Icon */}
          <button
            className="cart-toggle relative text-[#95151c] hover:opacity-80 transition-opacity p-1"
            onClick={() => setIsCartOpen(prev => !prev)}
            aria-label={`Carrito (${cartQty} items)`}
          >
            {syncStatus.syncing ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            )}
            {cartQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#95151c] text-[#f9f4e1] text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {cartQty > 99 ? '99+' : cartQty}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle lg:hidden text-[#95151c] p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Cart Sidebar Portal - only render when cart is open */}
      {isMounted && isCartOpen && createPortal(
        <div
          id="cart-sidebar-container"
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000 }}
        >
          {/* Overlay - clickable to close */}
          <div
            onClick={closeCart}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 10001,
              cursor: 'pointer'
            }}
          />

          {/* Sidebar - max 85% width on mobile to leave space for overlay click */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: '85%',
              maxWidth: '400px',
              backgroundColor: '#f9f4e1',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
              zIndex: 10002,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            {/* Cart Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid rgba(100,114,87,0.12)'
            }}>
              <h2 style={{
                color: '#95151c',
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                fontWeight: 600,
                margin: 0
              }}>
                Tu Carrito
              </h2>
              <button
                onClick={closeCart}
                style={{
                  color: '#95151c',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px'
                }}
                aria-label="Cerrar carrito"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {cartItems.length === 0 ? (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px'
                }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5" style={{ opacity: 0.3, marginBottom: '16px' }}>
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  <p style={{ color: '#95151c', fontFamily: "'Manrope', sans-serif", fontSize: '16px', marginBottom: '8px' }}>
                    Tu carrito está vacío
                  </p>
                  <p style={{ color: '#9a9a8a', fontFamily: "'Manrope', sans-serif", fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
                    Agrega productos para comenzar
                  </p>
                  <a
                    href="/productos"
                    onClick={closeCart}
                    style={{
                      backgroundColor: '#95151c',
                      color: '#f9f4e1',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      padding: '12px 32px',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                  >
                    VER PRODUCTOS
                  </a>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                    {cartItems.map((item: any) => (
                      <div key={item.cartItemId} style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '16px 0',
                        borderBottom: '1px solid rgba(100,114,87,0.12)'
                      }}>
                        {/* Product Image */}
                        <div style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#f9f4e1',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.productName}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#95151c" strokeWidth="1.5" style={{ opacity: 0.3 }}>
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                          )}
                        </div>

                        {/* Product Info */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h3 style={{
                              color: '#95151c',
                              fontFamily: "'Playfair Display', serif",
                              fontSize: '14px',
                              fontWeight: 600,
                              margin: 0,
                              lineHeight: 1.3
                            }}>
                              {item.productName}
                            </h3>
                            <p style={{
                              color: '#9a9a8a',
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: '12px',
                              margin: '4px 0 0 0'
                            }}>
                              Cantidad: {item.qty}
                            </p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{
                              color: '#000000',
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: '14px',
                              fontWeight: 500
                            }}>
                              {item.total?.text || item.productPrice?.text}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.cartItemId)}
                              disabled={removingItemId === item.cartItemId}
                              style={{
                                color: removingItemId === item.cartItemId ? '#95151c' : '#9a9a8a',
                                background: 'none',
                                border: 'none',
                                cursor: removingItemId === item.cartItemId ? 'wait' : 'pointer',
                                padding: '4px',
                                opacity: removingItemId === item.cartItemId ? 0.6 : 1,
                                transition: 'opacity 200ms ease'
                              }}
                              aria-label="Eliminar producto"
                            >
                              {removingItemId === item.cartItemId ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                  <path d="M12 2a10 10 0 0 1 10 10" />
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    padding: '20px 24px',
                    borderTop: '1px solid rgba(100,114,87,0.12)',
                    backgroundColor: '#f9f4e1'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ color: '#95151c', fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 500 }}>
                        Subtotal:
                      </span>
                      <span style={{ color: '#95151c', fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600 }}>
                        {cartTotal}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <a
                        href="/cart"
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'center',
                          border: '1px solid #95151c',
                          color: '#95151c',
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '1px',
                          padding: '12px 24px',
                          textDecoration: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        VER CARRITO ({cartQty})
                      </a>
                      <a
                        href="/checkout"
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'center',
                          backgroundColor: '#95151c',
                          color: '#f9f4e1',
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '1px',
                          padding: '12px 24px',
                          textDecoration: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        CHECKOUT
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu fixed inset-0 top-16 bg-[#f9f4e1] z-50 lg:hidden">
          <nav className="flex flex-col items-center gap-8 pt-12">
            <a href="/" className="text-[#95151c] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              HOME
            </a>
            <a href="/productos" className="text-[#95151c] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              COMPRAR
            </a>
            <a href="/#nuestra-carne" className="text-[#95151c] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              NUESTRA CARNE
            </a>
            <a href="/#sostenibilidad" className="text-[#95151c] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              SOSTENIBILIDAD
            </a>
            <a href="/contact" className="text-[#95151c] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              CONTACTO
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

// Layout configuration - render in headerTop area (inside Evershop's header structure)
export const layout = {
  areaId: 'headerTop',
  sortOrder: 0
};
