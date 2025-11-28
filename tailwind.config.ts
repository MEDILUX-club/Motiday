import type { Config } from 'tailwindcss'
import { colors } from './src/assets/styles/colors'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}

export default config
