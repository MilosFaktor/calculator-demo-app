import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import { AuthProvider } from "react-oidc-context";

const VITE_COGNITO_REDIRECT_URI = import.meta.env.VITE_COGNITO_REDIRECT_URI;
const VITE_COGNITO_AUTHORITY = import.meta.env.VITE_COGNITO_AUTHORITY;
const VITE_COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const cognitoAuthConfig = {
  authority: VITE_COGNITO_AUTHORITY,
  client_id: VITE_COGNITO_CLIENT_ID,
  redirect_uri: VITE_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "email openid phone",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
