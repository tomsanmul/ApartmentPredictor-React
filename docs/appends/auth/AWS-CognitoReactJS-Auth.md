# Custom AWS Cognito ReactJS Auth

## Summary

> This is a **simple, practical guide** to add **custom AWS Cognito login** (username + password only, no registration / sign-up in the UI) to a React application. 

We'll protect routes/pages so only logged-in users can access them.

This uses the **low-level** `amazon-cognito-identity-js` library (~6.3.x in 2026) for full control over the login form — no Amplify UI components.

- [AlbertProfe/authReactCognitoJS · GitHub](https://github.com/AlbertProfe/authReactCognitoJS)
- [AlbertProfe/authReactCognito · GitHub](https://github.com/AlbertProfe/authReactCognito)
- [AlbertProfe/authReactCognitoHosted · GitHub](https://github.com/AlbertProfe/authReactCognitoHosted)

## Guide step-by-step

Just 3 steps: 

1. Configure `AWS Cognito`
2. `MockUp` + Flow
3. `Project structure` + PseudoCode

### 1. Configure AWS Cognito (create User Pool + App Client)

Go to AWS Console → **Cognito** → **User pools** → **Create user pool**

**Step-by-step minimal setup (2026 style):**

- **Sign-in experience**  
  → Email (or username — both work)  
  → Choose **Email** (most common) or **Username**  
  → No social providers needed

- **Password policy** — use defaults or make it simple (min 8 chars)

- **MFA and verifications**  
  → No MFA (for simplicity)  
  → **Email** self sign-up → but we'll **disable self-registration** later

- **User account recovery** — defaults ok

- **Attributes** — keep defaults (email required)

- **App integration → App client**  
  → Create new app client  
  → App type: **Public client** (very important — no client secret for browser apps)  
  → App client name: e.g. "my-react-app"  
  → **Allowed callback URLs**: http://localhost:3000 (add https://yourdomain.com later)  
  → **Allowed sign-out URLs**: http://localhost:3000  
  → **Authentication flows**: Enable **ALLOW_USER_SRP_AUTH** and **ALLOW_REFRESH_TOKEN_AUTH**  
  → **OAuth 2.0 grant types**: only **Implicit grant** or **Authorization code grant** if needed (but we use SRP so not critical)

- **Advanced settings** — leave defaults

#### Create new user and verify

<mark>Important post-creation changes:</mark>

1. In the **User pool** → **Sign-up experience** → **Self-service account creation** → **Disable self sign-up** (so no one can register via API/UI — admin creates users only)

2. Copy these values (you'll need them):
   
   - **User Pool ID**        e.g. `us-east-1_abc123xyz`
   - **App Client ID**       e.g. `3f4g5h6j7k8l9m0n1o2p3q4r5s6t`
   - **Region**              e.g. `us-east-1`

3. Create a new user (`verified`) and at web Cognito CLI to invalidate `Foirce Change Password`:

```tex
aws cognito-idp admin-set-user-password \
  --user-pool-id "eu-central-1_akXek7LBv" \
  --username "tomas" \
  --password "NewP@ssw0rd123" \
  --permanent
```

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/appends/auth/images/auth-aws-1.png)

### 2. Simple flow, feature & mock-up

> **Goal**: Custom login form → on success store tokens → protect routes → show Dashboard / SecretPage only when logged in.

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/appends/auth/images/auth-2.png)

That's the minimal custom `Cognito` login → protected pages setup without registration/signup in the frontend.

```
┌──────────────────────────────┐
│           Sign In            │
├──────────────────────────────┤
│        Username / Email      │
│        [ input field ]       │
│                              │
│           Password           │
│        [ input field ]       │
│                              │
│       [ Login button ]       │
└──────────────────────────────┘
```

After login → redirect to `/dashboard` (protected page)

```
┌──────────────────────────────┐
│           /dashboard         │
├──────────────────────────────┤
│        Welcome john.doe      │
│        You are logged in     │
│ → this is protected content. │
│                              │
│                              │
│       [ Logout button ]      │
│                              │
└──────────────────────────────┘
```

Complete flow

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/appends/auth/images/auth-flow.png) 

### 3. Project structure

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/appends/auth/images/auth-projectStructure.png)

**Architecture (simple context-based auth):**

```
App.jsx
  ↳ AuthContext (provides user, login, logout, isAuthenticated)
      ↳ Login page (public)
      ↳ ProtectedRoute component
          ↳ Dashboard / Home / Secret pages (only if logged in)
```

**Install dependencies**

- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)

Install the [oidc-client-ts](https://github.com/authts/oidc-client-ts)  and [react-oidc-context](https://github.com/authts/react-oidc-context)  libraries or the or the AWS SDK for JavaScript v3:

```bash
// deprecated
npm install oidc-client-ts react-oidc-context --save
// js v3
npm install @aws-sdk/client-cognito-identity-provider
```

### 4. Code

#### Example#1: draft

<mark>It is just a draft</mark>

**Create AuthContext.jsx** (recommended structure)

```jsx
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_abc123xyz',      // ← your value
  ClientId:   '3f4g5h6j7k8l9m0n1o2p3q4r5s6t'   // ← your value
};

const userPool = new CognitoUserPool(poolData);
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ...
  }, []);

  const login = (username, password) =>
    // ...
    });

  const logout = () => {
   // ...
  };

  const isAuthenticated = !!user && !!session;

  const value = {
    user,
    session,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

**Protect routes – ProtectedRoute.jsx**

```jsx
// src/components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
```

**Login page example (Login.jsx)**

```jsx
// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
   //...
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

**App.jsx – wiring it together (React Router v6+)**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';   // your protected page
// import Home from './pages/Home';           // public page

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* add more protected routes here */}
          </Route>

          <Route path="*" element={<Login />} />  {/* fallback */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

**Dashboard.jsx** (example protected page)

```jsx
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.getUsername()}</h1>
      <p>You are logged in → this is protected content.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

#### Example#2: AWS sample

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_B6ZsT2FGC",
  client_id: "26unnXXXXXXXXXXXXau6n7",
  redirect_uri: "<redirect uri>",
  response_type: "code",
  scope: "<scopes>",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// App.js
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "26unnahlf86jXXXXXXXXu6n7";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://<user pool domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
```
