/**
 * Interface representing the response received after exchanging an authorization code for an access token.
 */
 export interface AccessTokenResponse {
  /**
   * The access token.
   */
  access_token: string;

  /**
   * The type of token.
   */
  token_type: string;

  /**
   * The duration in seconds for which the access token is valid.
   */
  expires_in: number;

  /**
   * The refresh token used to obtain a new access token.
   */
  refresh_token: string;

  /**
   * The scope of the access token.
   */
  scope: string;

  /**
   * The identity token containing claims about the authenticated user.
   */
  id_token: string;
}