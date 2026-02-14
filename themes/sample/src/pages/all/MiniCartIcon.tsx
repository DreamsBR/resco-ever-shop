import React from 'react';

// Override: Disable Evershop's default MiniCart
// We use our own custom cart sidebar in Header.tsx
export default function MiniCartIcon() {
  return null;
}

export const layout = {
  areaId: 'headerMiddleRight',
  sortOrder: 20
};
