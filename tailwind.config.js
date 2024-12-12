/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangers: ['bangers', 'sans-serif'],
        general: ['general', 'sans-serif'],
        'mont-semibold': ['mont-semibold', 'sans-serif'],
        'mont-bold': ['mont-bold', 'sans-serif'],
        'mont-normal': ['mont-normal', 'sans-serif'],
      },
      colors: {
        blue: {
          100: '#292D59',
          600: '#292D5999',
          800: '#049C99CC',
          900: '#292D59CC',
          1000: '#03081E',
        },
        brown: {
          100: '#A07F60E5',
          200: '#A07F6080',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
      backgroundImage: {
        'yellowPink-linear': 'linear-gradient(175deg, rgba(247,223,17,1) 0%, rgba(255,0,157,1) 100%)',
        'yellowPink-linear-rev': 'linear-gradient(-175deg, rgba(247,223,17,1) 0%, rgba(255,0,157,1) 100%)',
        'yellowPinkV2-linear': 'linear-gradient(175deg, rgba(247,223,17,1) 0%, rgba(255,0,157,1) 100%)',
        'white-linear': 'linear-gradient(45deg, rgb(238, 241, 240, 55%) 10%, rgba(255, 255, 255, 0.41) 100%)',
        'yellow-linear': 'linear-gradient(175deg, #FFE400 0%, #C8B409 100%)',
        'pink-linear': 'linear-gradient(175deg, #FF009D 0%, #B40C74 100%)',
        'lightBlue-linear': 'linear-gradient(175deg, #01F0F0 0%, #06C2C2 100%)',
        'bg-bottom-shade': 'linear-gradient(to bottom, rgba(41, 45, 89, 1) 34%, rgba(41, 45, 89, 0) 100%)',
        'bg-top-shade': 'linear-gradient(to bottom, rgba(41, 45, 89, 1) 11%, rgba(41, 45, 89, 0) 100%)',
      },
      borderColor: {
        'yellowPink-linear': 'linear-gradient(180deg, rgba(247,223,17,1) 0%, rgba(255,0,157,1) 100%)',
      },
      spacing: {
        'accordion-item': '4rem', // Adjust this value to match the height of .accordion-item
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addBase, addComponents }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply relative max-w-[77.5rem] mx-auto px-5 xl:max-w-[83rem]":
            {},
        },
        ".yellowPink": {
          "@apply bg-yellowPink-linear bg-clip-text text-transparent": {},
        },
        ".yellowPinkRev": {
          "@apply bg-yellowPink-linear-rev bg-clip-text text-transparent": {},
        },
        ".yellowPinkV2": {
          "@apply bg-yellowPinkV2-linear bg-clip-text text-transparent": {},
        },
        ".yellowLinear": {
          "@apply bg-yellow-linear bg-clip-text text-transparent": {},
        },
        ".pinkLinear": {
          "@apply bg-pink-linear bg-clip-text text-transparent": {},
        },
        ".lightBlueLinear": {
          "@apply bg-lightBlue-linear bg-clip-text text-transparent": {},
        },
        ".whiteLinear": {
          "@apply bg-white-linear bg-clip-text text-transparent": {},
        },
        ".bgBottomShade": {
          "@apply bg-bg-bottom-shade absolute bottom-0 left-0 h-[306px] w-full": {},
        },
        ".bgTopShade": {
          "@apply bg-bg-top-shade absolute top-0 left-0 h-[147px] w-full": {},
        },

      });
    }),
  ],
}