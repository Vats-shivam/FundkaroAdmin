import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="916922630529-5d4tht0o78mm15092u60l0eio4u1p7nj.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>,
)
