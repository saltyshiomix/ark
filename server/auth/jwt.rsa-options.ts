/** @format */

// #region Importa NPM
import { readFileSync } from 'fs';
// #endregion

export const jwtPrivateKey = readFileSync(
  `${__dirname}/../../jwt.private.pem`,
  'utf8',
);
export const jwtPublicKey = readFileSync(
  `${__dirname}/../../jwt.public.pem`,
  'utf8',
);
