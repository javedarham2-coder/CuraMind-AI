/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#081B33",
          50: "#E6EBF2",
          100: "#C2CDDE",
          200: "#8A9FBE",
          300: "#52719E",
          400: "#1F447E",
          500: "#081B33",
          600: "#06162A",
          700: "#051121",
          800: "#030B18",
          900: "#02060E",
        },
        medical: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#172554",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
        },
        success: {
          DEFAULT: "#22C55E",
          50: "#F0FDF4",
          100: "#DCFCE7",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F8FAFC",
          muted: "#F1F5F9",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      boxShadow: {
        "soft-sm": "0 1px 2px 0 rgba(8, 27, 51, 0.04)",
        soft: "0 4px 16px -2px rgba(8, 27, 51, 0.06), 0 2px 6px -2px rgba(8, 27, 51, 0.04)",
        "soft-lg": "0 12px 40px -8px rgba(8, 27, 51, 0.10), 0 4px 12px -4px rgba(8, 27, 51, 0.06)",
        "soft-xl": "0 24px 60px -12px rgba(8, 27, 51, 0.18), 0 8px 20px -8px rgba(8, 27, 51, 0.08)",
        glow: "0 0 0 1px rgba(37, 99, 235, 0.15), 0 8px 30px -4px rgba(37, 99, 235, 0.35)",
        "glow-cyan": "0 0 0 1px rgba(34, 211, 238, 0.2), 0 8px 30px -4px rgba(34, 211, 238, 0.35)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #081B33 0%, #1E3A8A 50%, #2563EB 100%)",
        "gradient-soft":
          "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)",
        "gradient-radial":
          "radial-gradient(ellipse at top, rgba(37, 99, 235, 0.15), transparent 60%)",
        "mesh-hero":
          "radial-gradient(at 20% 20%, rgba(37, 99, 235, 0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34, 211, 238, 0.18) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(139, 92, 246, 0.12) 0px, transparent 50%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "card-enter": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(34, 211, 238, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 0 20px rgba(34, 211, 238, 0)",
          },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "ripple": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "card-enter": "card-enter 0.45s ease-out both",
        "slide-in-right": "slide-in-right 0.5s ease-out both",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-out infinite",
        "scan-line": "scan-line 2.4s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "ripple": "ripple 1.6s ease-out infinite",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
