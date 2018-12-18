import { parse } from 'url';
import match from './match';

export function redirectIfNotAuthenticated(req, res) {
  if (!req.user) {
    const { pathname } = parse(req.url, true);
    const guards: RegExp[] = [
      /\/api(.*)$/,
      /\/$/
    ];
    match(pathname, guards) && res.redirect('/auth/login');
  }
}
