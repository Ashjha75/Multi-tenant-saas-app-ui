/** @type {import("tailwindcss").Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        background: '#0A0F1E',
        surface: '#111827',
        card: '#161D31',
        sidebar: '#0E1528',
        primary: '#6366F1',
        primaryHover: '#7C3AED',
        accent: '#8B5CF6',
        accentLight: '#A78BFA',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#06B6D4',
        neutral: '#64748B',
      },
      borderColor: {
        soft: 'rgba(255,255,255,.06)',
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,.2)',
        cardHover: '0 18px 50px rgba(0,0,0,.35)',
        modal: '0 30px 70px rgba(0,0,0,.45)',
      },
      borderRadius: {
        button: '12px',
        input: '14px',
        card: '22px',
        modal: '28px',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
