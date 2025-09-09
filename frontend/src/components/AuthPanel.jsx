import { useAuth } from "react-oidc-context";
import "../css/AuthPanel.css";

const VITE_COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const VITE_COGNITO_LOG_OUT_URI = import.meta.env.VITE_COGNITO_LOG_OUT_URI;
const VITE_COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;


function AuthPanel() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = VITE_COGNITO_CLIENT_ID;
    const logoutUri = VITE_COGNITO_LOG_OUT_URI;
    const cognitoDomain = VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div className="authpanel-loading">Loading...</div>;
  }

  if (auth.error) {
    return <div className="authpanel-error">Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="authpanel-container">
        <h2 className="authpanel-title">Authentication Info</h2>
        <div className="authpanel-user">
          <div><strong>Hello:</strong> {auth.user?.profile.email}</div>
        </div>
        <button className="authpanel-btn" onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="authpanel-container">
      <h2 className="authpanel-title">You can call API's on /calculator page only through Sign-in. Protected by Amazon Cognito.</h2>
      <h3 className="authpanel-h1">Demo user:</h3>
      <p className="authpanel-text">
        email: demo@mailinator.com<br />
        password: Pass*123
      </p>
      <div className="authpanel-actions">
        <button className="authpanel-btn" onClick={() => auth.signinRedirect()}>Sign in</button>
        <button className="authpanel-btn" onClick={() => signOutRedirect()}>Sign out</button>
      </div>
    </div>
  );
}

export default AuthPanel;