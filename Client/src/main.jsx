import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AdministracionMain } from './Administracion/AdministracionMain';
import { AppPoliEventos } from './AppPoliEventos';
// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppPoliEventos/>
  </StrictMode>,
)
