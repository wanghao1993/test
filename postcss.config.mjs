// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;

export default {
  plugins: {
    "@tailwindcss/postcss": {
      content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
      ]
    }
  }
}
