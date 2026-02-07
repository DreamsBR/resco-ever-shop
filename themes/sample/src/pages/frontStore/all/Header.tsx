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
      <div className="flex items-center justify-between w-full h-16 sm:h-20 px-4 sm:px-8 lg:px-20 bg-[#f0ece9]">
        {/* Logo */}
        <a href="/" className="flex flex-col gap-0.5">
          <span className="text-[#647257] font-['Playfair_Display'] text-lg sm:text-2xl font-bold tracking-[1px] sm:tracking-[2px]">
            MARIA'S MEAT MARKET
          </span>
          <span className="text-[#647257] font-['Manrope'] text-[8px] sm:text-[10px] tracking-[1px] sm:tracking-[1.5px]">
            DISTRIBUIDORA DE CARNES
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          <a href="/" className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all">
            HOME
          </a>
          <a href="/productos" className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all">
            COMPRAR
          </a>
          <a href="#nuestra-carne" className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all">
            NUESTRA CARNE
          </a>
          <a href="#sostenibilidad" className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all">
            SOSTENIBILIDAD
          </a>
          <a href="#contacto" className="text-[#647257] font-['Manrope'] text-xs font-medium tracking-[1px] hover:font-semibold transition-all">
            CONTACTO
          </a>
        </nav>

        {/* Right Section: Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            className="cart-toggle relative text-[#647257] hover:opacity-80 transition-opacity p-1"
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
              <span className="absolute -top-1 -right-1 bg-[#647257] text-[#f0ece9] text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {cartQty > 99 ? '99+' : cartQty}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle lg:hidden text-[#647257] p-1"
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
              backgroundColor: '#f0ece9',
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
                color: '#647257',
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
                  color: '#647257',
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
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#647257" strokeWidth="1.5" style={{ opacity: 0.3, marginBottom: '16px' }}>
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  <p style={{ color: '#647257', fontFamily: "'Manrope', sans-serif", fontSize: '16px', marginBottom: '8px' }}>
                    Tu carrito está vacío
                  </p>
                  <p style={{ color: '#9a9a8a', fontFamily: "'Manrope', sans-serif", fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
                    Agrega productos para comenzar
                  </p>
                  <a
                    href="/productos"
                    onClick={closeCart}
                    style={{
                      backgroundColor: '#647257',
                      color: '#f0ece9',
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
                          backgroundColor: '#e8e4e0',
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
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#647257" strokeWidth="1.5" style={{ opacity: 0.3 }}>
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
                              color: '#647257',
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
                              color: '#7a8a6d',
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
                                color: removingItemId === item.cartItemId ? '#647257' : '#9a9a8a',
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
                    backgroundColor: '#f0ece9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ color: '#647257', fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 500 }}>
                        Subtotal:
                      </span>
                      <span style={{ color: '#647257', fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600 }}>
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
                          border: '1px solid #647257',
                          color: '#647257',
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
                          backgroundColor: '#647257',
                          color: '#f0ece9',
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
        <div className="mobile-menu fixed inset-0 top-16 bg-[#f0ece9] z-50 lg:hidden">
          <nav className="flex flex-col items-center gap-8 pt-12">
            <a href="/" className="text-[#647257] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              HOME
            </a>
            <a href="/productos" className="text-[#647257] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              COMPRAR
            </a>
            <a href="#nuestra-carne" className="text-[#647257] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              NUESTRA CARNE
            </a>
            <a href="#sostenibilidad" className="text-[#647257] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
              SOSTENIBILIDAD
            </a>
            <a href="#contacto" className="text-[#647257] font-['Manrope'] text-lg font-medium tracking-[1px]" onClick={() => setIsMenuOpen(false)}>
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
