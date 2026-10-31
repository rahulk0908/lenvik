import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pre-bundle everything up front: a mid-session re-optimisation can leave two React copies
  // in the page (e.g. after browser back), which breaks hooks with "reading 'useContext'"
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'motion/react', 'lucide-react', 'vite-react-ssg'],
  },
  ssgOptions: {
    dirStyle: 'nested',
    // vite-react-ssg preloads the legacy .woff fallbacks too (mislabelled as woff2); browsers only need the woff2 files
    onPageRendered: (_route, html) => html.replace(/<link[^>]+as="font"[^>]+\.woff"[^>]*>/g, ''),
  },
})
