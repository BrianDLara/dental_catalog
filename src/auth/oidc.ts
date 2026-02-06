import { WebStorageStateStore } from "oidc-client-ts";

export const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: `${window.location.origin}/callback`,
  response_type: "code",

  // IMPORTANT: needed so Access Token can call Cognito GetUser
  scope: "openid email profile aws.cognito.signin.user.admin",

  // ✅ Fixes many “No matching state found” cases (especially with Google)
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  stateStore: new WebStorageStateStore({ store: window.sessionStorage }),
};
