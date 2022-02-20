export default class RouteStrategy {
  unAuthRedirect = '/login';

  authenticate(roles: Array<string>): boolean {
    return true;
  }
}
