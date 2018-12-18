import { parse } from 'url';

export function redirectIfNotAuthenticated(req, res) {
  if (!req.user) {
    const { pathname } = parse(req.url, true);
    const guards: string[] = [
      '/',
      '/preview'
    ];
    guards.includes(pathname) && res.redirect('/auth/login');
  }
}
