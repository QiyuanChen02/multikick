import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "kick-green": "#53FC18"
      }
    },
  },
  plugins: [],
} satisfies Config;
