import { parse } from 'url';
import match from './match';

export function redirectIfAuthenticated(req, res) {
  if (req.user) {
    const { pathname } = parse(req.url, true);
    const guards: RegExp[] = [
      /\/auth\/login$/,
      /\/auth\/signup$/
    ];
    match(pathname, guards) && res.redirect('/');
  }
}
