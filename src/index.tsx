import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { assertExists } from './lib/types/assertions'

const container = document.getElementById('root')

assertExists(container, 'Container DOM Node')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
