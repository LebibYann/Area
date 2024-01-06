/**
 * Interface representing the response containing tokens from an OAuth2 flow.
 */
 export interface TokenResponse {
  /**
   * The access token used to authenticate requests.
   */
  access_token: string;

  /**
   * The time, in seconds, until the access token expires.
   */
  expires_in: number;

  /**
   * A token that can be used to obtain a new access token using the same authorization grant.
   */
  refresh_token: string;

  /**
   * The scope of the access token, indicating the permissions granted.
   */
  scope: string;

  /**
   * The type of the token, usually 'Bearer'.
   */
  token_type: string;
}