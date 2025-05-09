/** @type {import('tailwindcss').Config} */
export default {
  // content: [
  //   "./index.html",
  //   "./src/components/*.{js,ts,jsx,tsx}",
  //   "./src/pages/**/*.{js,ts,jsx,tsx}",
  // ],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["mb-5", "bg-blue-500"],
  theme: {
    extend: {
      height: {
        "screen-2": "200vh",
        "screen-3": "150vh",
      },
      width: {
        "screen-2": "68vw",
        "screen-3": "70vw",
        "screen-4": "238vw",
        "screen-5": "116vw",
      },
      top: {
        "full-1": "130vh",
      },
      left: {
        "full-2": "228px",
        "full-3": "128vh",
      },
      right: {
        "full-2": "54vw",
      },
    },
  },

  plugins: [],
};

