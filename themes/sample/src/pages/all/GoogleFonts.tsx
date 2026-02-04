import React from 'react';

export default function GoogleFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Base styles for the landing page */
            body {
              background-color: #f0ece9;
            }

            /* Font fallbacks */
            .font-playfair {
              font-family: 'Playfair Display', Georgia, serif;
            }

            .font-manrope {
              font-family: 'Manrope', system-ui, sans-serif;
            }
          `
        }}
      />
    </>
  );
}

// Render in the head section
export const layout = {
  areaId: 'head',
  sortOrder: 1
};
