import { parse } from 'url';
import match from './match';

export function redirectIfNotAuthenticated(req, res) {
  if (!req.user) {
    const { pathname } = parse(req.url, true);

    const apiGuards: RegExp[] = [
      /\/api\/users(.*)$/
    ];
    const webGuards: RegExp[] = [
      /\/$/
    ];

    match(pathname, apiGuards) && res.json(false); // TODO: use exception
    match(pathname, webGuards) && res.redirect('/auth/login');
  }
}
