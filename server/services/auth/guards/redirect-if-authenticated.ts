import { parse } from 'url';

export function redirectIfAuthenticated(req, res) {
  if (req.user) {
    const { pathname } = parse(req.url, true);
    const guards: string[] = [
      '/auth/login',
      '/auth/signup'
    ];
    guards.includes(pathname) && res.redirect('/');
  }
}
