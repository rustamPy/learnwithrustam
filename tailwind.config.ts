import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'lwr-dark-blue': '#112346ff',
        'lwr-light-grey': '#cccccc6e',
        'lwr-solid-grey': '#cccccc',
        'lwr-orange-100': '#F6A426',
        'lwr-orange-200': '#db8606'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
      }
    },
  },
  plugins: [],
});