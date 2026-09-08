import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import MySubscriptionPage from './pages/MySubscriptionPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MySubscriptionPage />
  </StrictMode>,
)
