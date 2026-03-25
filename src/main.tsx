import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/index.tsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const client = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
