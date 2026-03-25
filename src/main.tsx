import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/index.tsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
    <RouterProvider router={routes} />
    </MantineProvider>
  </StrictMode>,
)
