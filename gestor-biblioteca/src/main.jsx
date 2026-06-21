import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GestorPrestamos from './GestorPrestamos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GestorPrestamos />
  </StrictMode>,
)
