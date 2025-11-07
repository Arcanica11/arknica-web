/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["Clash Display", "sans-serif"]
      },
      fontSize: {
        h1: ["6rem", { lineHeight: "1.1", fontWeight: "600" }],
        h2: ["4rem", { lineHeight: "1.2", fontWeight: "500" }],
        h3: ["2.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        p: ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        button: ["1.125rem", { lineHeight: "1", fontWeight: "600" }]
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)"
      },
      colors: {
        border: "rgb(var(--color-border))",
        input: "rgb(var(--color-input))",
        ring: "rgb(var(--color-ring))",
        background: "rgb(var(--color-background))",
        foreground: "rgb(var(--color-foreground))",
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          foreground: "rgb(var(--color-primary-foreground))"
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary))",
          foreground: "rgb(var(--color-secondary-foreground))"
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive))",
          foreground: "rgb(var(--color-destructive-foreground))"
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted))",
          foreground: "rgb(var(--color-muted-foreground))"
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent))",
          foreground: "rgb(var(--color-accent-foreground))"
        }
      }
    }
  },
  plugins: []
};
