import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Products} from './Pages/Dashboard/Products'
import { Header } from './Pages/Dashboard/Header'
import { Footer } from './Pages/Dashboard/Footer'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../public/stylesheets/general.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Header />
      <Products />
      <Footer/>

  </StrictMode>
)
