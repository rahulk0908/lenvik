import { ViteReactSSG } from 'vite-react-ssg'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/lexend/latin-400.css'
import '@fontsource/lexend/latin-500.css'
import '@fontsource/lexend/latin-600.css'
import './index.css'
import { routes } from './routes'

export const createRoot = ViteReactSSG({ routes })
