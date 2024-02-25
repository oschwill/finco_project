import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        inputBorderColor: '#EBEBEB',
        inputBackColor: '#F7F7F7',
        buttonBgGradientFrom: '#00d4ff',
        buttonBgGradientTo: '#1E78FE',
        uploadButtonGradientFrom: '#FFCF53',
        uploadButtonGradientTo: '#FF9900',
        linkColor: '#1E78FE',
      },
    },
  },
  plugins: [],
};
export default config;
