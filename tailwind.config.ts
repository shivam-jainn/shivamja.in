import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/blog/posts/markdown/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage:{
        'hero-gradient': 'radial-gradient(circle 80vh  at 50% 100%,  rgba(238,148,24,1) 0%, rgba(223,151,21,1) 14%, rgba(238,148,24,1) 39%, rgba(238,108,24,1) 53%, rgba(200,73,24,1) 57%, rgba(191,53,24,1) 62%, rgba(0,0,0,1) 74%, rgba(0,0,0,1) 100%)',
      },
      borderRadius: {
        'blob-radius': '25rem',
      },
      filter: {
        'blur-19': 'blur(19px)',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
