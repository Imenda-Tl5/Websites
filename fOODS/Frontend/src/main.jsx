import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import StoreContextProvider, { StoreContext } from './context/StoreContextProvider.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StoreContextProvider>
<App />
    </StoreContextProvider>
    </BrowserRouter>
  ,
)
