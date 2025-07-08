import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { DataProvider } from './components/DataContext.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider 
        router={router}
        fallbackElement={<div>Loading...</div>}
      />
    </DataProvider>
  </StrictMode>,
)
