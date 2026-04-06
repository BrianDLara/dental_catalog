// src/auth/logout.ts

export function cognitoLogout() {
  const domain =
    "https://us-east-1q3u4ykfue.auth.us-east-1.amazoncognito.com";

  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string | undefined;
  if (!clientId) {
    console.error("Missing VITE_COGNITO_CLIENT_ID in env.");
    return;
  }

  // After logout, return to home (or change to /login if you have it)
  const logoutUri = `${window.location.origin}/`;

  const url =
    `${domain}/logout?client_id=${encodeURIComponent(clientId)}` +
    `&logout_uri=${encodeURIComponent(logoutUri)}`;

  window.location.replace(url);
}
