export interface IDTokenInfo {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  name?: string;
  given_name?: string;
  family_name?: string;
  gender?: string;
  birthdate?: string;
  email: string;
  picture: string;
}
