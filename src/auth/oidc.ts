export const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: `${window.location.origin}/callback`,
  response_type: "code",
  // IMPORTANT: needed so Access Token can call Cognito GetUser
  scope: "openid email profile aws.cognito.signin.user.admin",
};
