/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      /*typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.foreground'),
              '[class~="lead"]': {
                color: theme('colors.muted-foreground'),
              },
              a: {
                color: theme('colors.primary-foreground'),
              },
              strong: {
                color: theme('colors.primary-foreground'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.primary'),
              },
              hr: {
                borderColor: theme('colors.border'),
              },
              blockquote: {
                color: theme('colors.foreground'),
                borderLeftColor: theme('colors.border'),
              },
              h1: {
                color: theme('colors.foreground'),
              },
              h2: {
                color: theme('colors.foreground'),
              },
              h3: {
                color: theme('colors.foreground'),
              },
              h4: {
                color: theme('colors.foreground'),
              },
              code: {
                color: theme('colors.foreground'),
              },
              'a code': {
                color: theme('colors.primary-foreground'),
              },
              pre: {
                color: theme('colors.muted-foreground'),
                backgroundColor: theme('colors.background'),
              },
              thead: {
                color: theme('colors.foreground'),
                borderBottomColor: theme('colors.border'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.border'),
              },
            },
          },
        };
      },*/
    },
  },

  variants: {
    extend: {
      typography: ["dark"]
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}