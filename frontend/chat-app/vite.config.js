import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import daisyui from 'daisyui';
// import theme from 'daisyui/theme/object';


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ]
})
