const AUTHORIZATION_TOKEN_KEY = "authorizationToken";

export const isActiveSession = () => {
  const authToken = getSession();
  return authToken ? true: false;
}

export const getSession = (): string | null => {
  return localStorage.getItem(AUTHORIZATION_TOKEN_KEY);

}

export const closeAuthorizationSession = () => {
  localStorage.removeItem(AUTHORIZATION_TOKEN_KEY) 
}

export const updateAuthorizationToken = (authToken: string) => {
  localStorage.setItem(AUTHORIZATION_TOKEN_KEY, authToken);
}



