/** @type {import("tailwindcss").Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#0B1020',
        surface: '#111827',
        card: '#151C2F',
        primary: '#7C3AED',
        secondary: '#6366F1',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        muted: '#94A3B8',
        border: '#273449',
        accent: '#A855F7',
      },
      borderRadius: {
        xl2: '14px',
        xl3: '20px',
        xl4: '24px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,.15)',
        cardHover: '0 16px 40px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
};
