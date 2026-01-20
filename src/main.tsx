import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Check if root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found! Make sure index.html has a div with id='root'");
}

// Create root and render app
try {
  const root = createRoot(rootElement);
  root.render(<App />);
  
  // Only log in development
  if (import.meta.env.DEV) {
    console.log("App rendered successfully!");
  }
} catch (error) {
  // Always log errors, but sanitize in production
  if (import.meta.env.DEV) {
    console.error("Error rendering app:", error);
  } else {
    console.error("Error rendering app");
  }
  
  // Show error message in the UI (sanitized)
  const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: monospace;">
      <h1>Error Rendering App</h1>
      <pre>${errorMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      <p>Please refresh the page or contact support if the problem persists.</p>
    </div>
  `;
}
