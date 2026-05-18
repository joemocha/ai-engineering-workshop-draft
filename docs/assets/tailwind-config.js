// Shared Tailwind config for all workshop pages.
// Load AFTER the Tailwind CDN script.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#a04100",
        "primary-container": "#fe6b00",
        "on-primary": "#ffffff",
        "on-primary-container": "#572000",
        "primary-fixed": "#ffdbcc",
        "primary-fixed-dim": "#ffb693",

        "secondary": "#6c5b53",
        "secondary-container": "#f6ded3",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#726159",

        "tertiary": "#00629f",
        "tertiary-container": "#009efc",
        "tertiary-fixed": "#d0e4ff",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#003356",

        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        "background": "#fbf9f9",
        "background-dark": "#221610",
        "background-light": "#f8f6f6",
        "on-background": "#1b1c1c",

        "surface": "#fbf9f9",
        "surface-bright": "#fbf9f9",
        "surface-dim": "#dbdada",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container": "#efeded",
        "surface-container-high": "#e9e8e8",
        "surface-container-highest": "#e4e2e2",
        "surface-variant": "#e4e2e2",
        "surface-tint": "#a04100",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#5a4136",
        "inverse-surface": "#303031",
        "inverse-on-surface": "#f2f0f0",
        "inverse-primary": "#ffb693",

        "outline": "#8e7164",
        "outline-variant": "#e2bfb0",
        "border-primary": "#221610",
        "grid-pattern": "rgba(34, 22, 16, 0.05)"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "edge-margin-desktop": "40px",
        "edge-margin-mobile": "20px",
        "gutter": "24px",
        "container-max": "1024px",
        "base": "4px"
      },
      fontFamily: {
        "display-xl": ["Public Sans"],
        "display-xl-mobile": ["Public Sans"],
        "body-lg": ["Public Sans"],
        "body-sm": ["Public Sans"],
        "label-caps": ["Public Sans"],
        "mono-tag": ["JetBrains Mono"],
        "headline-md": ["Public Sans"]
      },
      fontSize: {
        "display-xl": ["60px", { lineHeight: "1.1", letterSpacing: "-0.05em", fontWeight: "900" }],
        "display-xl-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.05em", fontWeight: "900" }],
        "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "700" }],
        "body-sm": ["14px", { lineHeight: "1.6", fontWeight: "500" }],
        "label-caps": ["12px", { lineHeight: "1.2", letterSpacing: "0.2em", fontWeight: "800" }],
        "mono-tag": ["13px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "700" }],
        "headline-md": ["18px", { lineHeight: "1.4", fontWeight: "700" }]
      }
    }
  }
};
