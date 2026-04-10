import { useAuth } from "react-oidc-context";

export default function Login() {
  const auth = useAuth();

  // Loading
  if (auth.isLoading) {
    return <p>Cargando...</p>;
  }

  // Error
  if (auth.error) {
    return <p>Error: {auth.error.message}</p>;
  }

  return (
    <div className="homepage-container">
      <div className="login-card">

        <h1 className="login-title">Login</h1>

        {/* ✅ SI ESTÁ LOGUEADO */}
        {auth.isAuthenticated ? (
          <>
            <p>✔ Logged in</p>
            <p>{auth.user?.profile?.email}</p>

            <button
              type="button"
              className="login-button"
              onClick={() => auth.removeUser()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p>Login con AWS Cognito</p>

            {/* 🚀 LOGIN REAL */}
            <button
              type="button"
              className="login-button"
              onClick={() => auth.signinRedirect()}
            >
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}