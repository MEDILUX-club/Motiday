import type { Config } from 'tailwindcss' 
import { colors } from './src/assets/styles/colors'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors, //테일윈드야, 아까 가져온 colors를 여기에 풀어놔
    },
  },
  plugins: [],
}

export default config
