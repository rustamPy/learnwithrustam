import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
          500: '#112346ff'
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