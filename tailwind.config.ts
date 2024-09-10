import withMT from "@material-tailwind/react/utils/withMT";
import type { Config } from 'tailwindcss'
import { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'lwr-shadow-orange': '0 1px 5px 2px #ffecd0, 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
        'lwr-shadow-red': '0 4px 6px -1px rgba(239, 68, 68, 0.5), 0 2px 4px -1px rgba(239, 68, 68, 0.06)',
        'inner': 'inset 0 12px 24px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        "lwr-gray-color": {
          50: '#fcfcfc',
          60: '#f6f6f6',
          200: '#6666666e',
          300: '#cccccc',
          400: '#303030',
          500: '#262626',
          600: '#030303'
        },
        "lwr-orange-color": {
          20: '#fcdbaa',
          50: '#f5b14a',
          100: '#F6A426',
          200: '#db8606'
        },
        "lwr-logo-light-theme-color": '#091734',
        "lwr-logo-dark-theme-color": "#f4f4f4",
        "lwr-navbar-dark-theme-color": '#6666666e',
        "lwr-blue-color": {
          20: '#8290ac',
          500: '#a4acbc',
          600: '#091734'
        },
        "lwr-general-blue-light-theme-color": {
          1: '#0b2251',
          2: '#052564',
        },
        "lwr-general-gray-dark-theme-color": {
          1: '#dcdcdc',
          2: '#e9e9e9',
          3: '#363636'
        },
        "lwr-wecode-easy": {
          100: "#0f9b0f"
        },
        "lwr-wecode-medium": {
          100: "#e8cf13"
        },
        "lwr-wecode-hard": {
          100: "#df3832"
        }
      },
      fontFamily: {
        light: ['"Times New Roman"', 'serif'],
        sans: [
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      typography: (theme: PluginAPI['theme']) => ({
        DEFAULT: {
          css: {
            color: '#333333',
            h1: {
              color: '#1a202c',
              fontWeight: '700',
            },
            h2: {
              color: '#2d3748',
              fontWeight: '600',
            },
            'h3, h4, h5, h6, li, ul': {
              color: '#4a5568',
            },
            pre: {
              backgroundColor: '#dbdbdb',
              color: '#9aa7c2',
              padding: '1rem',
              borderRadius: '0.375rem',
            },
            code: {
              color: '#006eff',
              backgroundColor: '#fef5ff',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'div.code-block': {
              backgroundColor: '#f7fafc',
              padding: '1rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
            },
            'code.language-python': {
              color: '#006eff',
            }
          },
        },
        dark: {
          css: {
            color: '#e2e8f0',
            h1: {
              color: '#f7fafc',
              fontWeight: '700',
            },
            h2: {
              color: '#edf2f7',
              fontWeight: '600',
            },
            'h3, h4, h5, h6, li, ul, strong': {
              color: '#e2e8f0',
            },
            pre: {
              backgroundColor: '#2d3748',
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '0.375rem',
            },
            code: {
              color: '#ed64a6',
              backgroundColor: '#44337a',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'div.code-block': {
              backgroundColor: '#2d3748',
              padding: '1rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
            },
            'code.language-python': {
              color: '#ed64a6',
              backgroundColor: '#ffffff00'
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default withMT(config);
