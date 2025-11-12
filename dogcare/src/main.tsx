import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/globals.css"
import { AppThemeProvider } from "./providers/theme"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
)
