import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Address from './Address.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Address street='l road' number='7' city='Baltimore' state='MD' zip='2'/>
  </StrictMode>,
)
