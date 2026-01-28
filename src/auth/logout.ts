export function cognitoLogout() {
  const domain =
    "https://us-east-1q3u4ykfue.auth.us-east-1.amazoncognito.com";
  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
  const logoutUri = window.location.origin + "/";

  window.location.href =
    `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
}
