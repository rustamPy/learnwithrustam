import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
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
          200: '#cccccc6e',
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
        "lwr-blue-color": {
          20: '#8290acff',
          500: 'rgba(17, 35, 70, 1)',
          600: 'rgba(9, 23, 52, 1)'
        },
        "lwr-leetcode-easy": {
          100: "#0f9b0f"
        },
        "lwr-leetcode-medium": {
          100: "#e8cf13"
        },
        "lwr-leetcode-hard": {
          100: "#df3832"
        }
      },
      fontFamily: {
        body: [
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
        ],
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
    },
  },
  plugins: [],
});