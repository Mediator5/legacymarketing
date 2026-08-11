import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pulled from the Legacy logo: deep royal navy + polished gold
        navy: {
          50: '#eef2fa',
          100: '#d6e0f2',
          200: '#adc0e4',
          300: '#7d9bd2',
          400: '#4c72bb',
          500: '#2b539f',
          600: '#1e3f80',
          700: '#173166',
          800: '#11244b',
          900: '#0b1730',
          950: '#060d1c',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0cd',
          200: '#f4de95',
          300: '#eec95c',
          400: '#e5b23a',
          500: '#d4af37',
          600: '#b8912a',
          700: '#8f6d22',
          800: '#6d5220',
          900: '#4d3a18',
        },
        ink: '#050a14',
        // Light editorial palette
        cream: '#fcfaf6',
        sand: '#f4efe6',
        linen: '#eee7db',
        pearl: '#ffffff',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.24em',
      },
      // Finer opacity steps so colour modifiers like white/12 resolve
      opacity: Object.fromEntries(
        [
          2, 3, 4, 6, 7, 8, 9, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65,
          68, 72, 78, 82, 85, 88, 92, 96,
        ].map((n) => [String(n), String(n / 100)]),
      ),
      backgroundImage: {
        'gold-sheen':
          'linear-gradient(100deg, #8f6d22 0%, #d4af37 22%, #f8e9a8 42%, #d4af37 62%, #b8912a 82%, #f4de95 100%)',
        // Darker gold for gradient TEXT on light backgrounds (keeps contrast)
        'gold-ink':
          'linear-gradient(100deg, #8a6a1f 0%, #c9a231 28%, #a37f1c 52%, #d4af37 76%, #8f6d22 100%)',
        'navy-depth':
          'radial-gradient(1200px 600px at 15% -10%, rgba(43,83,159,0.35) 0%, transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(212,175,55,0.12) 0%, transparent 55%), linear-gradient(180deg, #060d1c 0%, #0b1730 55%, #060d1c 100%)',
        'light-depth':
          'radial-gradient(1100px 620px at 12% -8%, rgba(212,175,55,0.16) 0%, transparent 62%), radial-gradient(900px 520px at 92% 4%, rgba(43,83,159,0.10) 0%, transparent 58%), linear-gradient(180deg, #fcfaf6 0%, #f6f1e8 58%, #fcfaf6 100%)',
        'sand-depth':
          'radial-gradient(900px 500px at 85% 0%, rgba(212,175,55,0.14) 0%, transparent 60%), linear-gradient(180deg, #f4efe6 0%, #efe8db 100%)',
      },
      boxShadow: {
        luxe: '0 32px 70px -34px rgba(11,23,48,0.35)',
        card: '0 1px 2px rgba(11,23,48,0.04), 0 12px 32px -18px rgba(11,23,48,0.22)',
        'card-hover': '0 2px 4px rgba(11,23,48,0.05), 0 26px 55px -24px rgba(11,23,48,0.30)',
        'gold-glow': '0 0 0 1px rgba(212,175,55,0.40), 0 18px 40px -18px rgba(184,145,42,0.55)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
