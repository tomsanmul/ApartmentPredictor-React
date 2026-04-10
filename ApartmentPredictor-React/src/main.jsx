import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_RxivNkxWJ",
  client_id: "3oq8aq4m5avt94d0qho82gmk5u",
  redirect_uri: "http://localhost:5173/apartments",
  response_type: "code",
  scope: "openid email phone",
};

createRoot(document.getElementById("root")).render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);