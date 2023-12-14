// types/global.d.ts

interface Tokens {
  access_token?: string;
  refresh_token?: string;
  authorization_code?: string | string[];
}
export const tokens: {
  tokens?: Tokens;
} = {};
