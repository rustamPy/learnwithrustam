import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'lwr-dark-blue': '#101828FF',
        'lwr-light-grey': '#cccccc6e',
        'lwr-solid-grey': '#cccccc',
        'lwr-orange-100': '#F6A426',
        'lwr-orange-200': '#db8606'
      }
    },
  },
  plugins: [],
});