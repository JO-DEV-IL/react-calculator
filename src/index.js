//React dependencies
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


//ReactDom.render NO LONGER SUPPORTED!!
//Below is new code to render app to root
//new import is: import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)