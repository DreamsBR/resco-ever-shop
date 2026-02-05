import React from 'react';

// Override Evershop's default MiniCartIcon to disable it
// We use our own cart sidebar in Header.tsx
export default function MiniCartIcon() {
  return null;
}

export const layout = {
  areaId: 'headerMiddleRight',
  sortOrder: 20
};
