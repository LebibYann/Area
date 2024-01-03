/**
 * Interface representing the payload of a JSON Web Token (JWT).
 */
 export interface JwtPayload {
  /**
   * The email associated with the user.
   */
  email: string;

  /**
   * The subject identifier, typically the user ID.
   */
  sub: string;

  /**
   * The type of token, e.g., 'local' or 'oauth2'.
   */
  token_type: string;
}