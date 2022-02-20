import RouteMap from './routes';
import PageMap from './pages';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
// util
import Sitemap from '../../Lib/Sitemap';

const {
  ChangePassword,
  ErrorPage,
  ForgotPasswordPage,
  LoginPage,
  LogoutPage,
  SetPasswordPage,
  ResetPasswordPage,
  ResetPasswordTokenExpiredPage,
  PageNotFoundPage,
  ForbiddenPage,
  SendMailSuccessfullyPage,
  UnauthorizedPage,
  VerifyUserPage,
  ProfilePage,
  LoggedInOtherSessionPage,
  SignUpPage,
  SignUpSendMailSuccessfullyPage,
  SignUpConfirmPage,
  SignUpConfirmExpiredPage
} = PageMap;

const {
  DefaultLayoutRoute,
  ErrorLayoutRoute,
  AuthLayoutRoute,
  VerifyTokenRoute,
  FullLayoutRoute,
  NoFoundLayoutRoute,
  SignUpConfirmVerifyTokenRoute
} = RouteMap;

// set sitemap default route
Sitemap.DefaultRoute = DefaultLayoutRoute;

/**
 * Warning ！！！
 * Please don't use render directly here ，
 * like :
 *  ({ match, location }) => (
      <xxxx id={match.params._id} />
    )
   Please use PageMap！
 */

const DefaultRouter = [
  {
    to: '/login',
    hideMenu: true,
    skipNetAuth: true,
    route: AuthLayoutRoute,
    component: LoginPage
  }
];

if (process.env.REACT_APP_USER_AVATAR_ENABLE === 'true') {
  DefaultRouter.push({
    to: '/profile',
    skipNetAuth: true,
    auth: [],
    hideMenu: true,
    localeId: 'nav.user_detail',
    component: ProfilePage
  });
}
if (process.env.REACT_APP_AUTH_USER_ONE_TIME_PASSWORD !== 'true') {
  DefaultRouter.push(
    {
      to: '/change-password',
      skipNetAuth: true,
      icon: MdLock,
      auth: [],
      localeId: 'nav.change_password',
      component: ChangePassword
    },
    {
      to: '/auth/forgot-password',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: ForgotPasswordPage
    },
    {
      to: '/auth/send-mail-successfully',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: SendMailSuccessfullyPage
    },
    {
      to: '/auth/verify-user',
      hideMenu: true,
      route: VerifyTokenRoute,
      component: VerifyUserPage,
      auth: []
    },
    {
      to: '/auth/set-password',
      hideMenu: true,
      route: VerifyTokenRoute,
      component: SetPasswordPage,
      auth: []
    },
    {
      to: '/auth/reset-password',
      hideMenu: true,
      route: VerifyTokenRoute,
      component: ResetPasswordPage,
      auth: []
    },
    {
      to: '/auth/confirm-user',
      hideMenu: true,
      route: VerifyTokenRoute,
      component: ResetPasswordPage
    },
    {
      to: '/auth/sign-up',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: SignUpPage
    },
    {
      to: '/auth/sign-up-send-mail-successfully',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: SignUpSendMailSuccessfullyPage
    },
    {
      to: '/sign-up-connect-expired',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: SignUpConfirmExpiredPage
    },
    {
      to: '/providers/workspace/confirm',
      hideMenu: true,
      skipNetAuth: true,
      route: SignUpConfirmVerifyTokenRoute,
      component: SignUpConfirmPage
    },
    {
      to: '/logged-in-other-session',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: LoggedInOtherSessionPage
    },
    {
      to: '/connect-expired',
      hideMenu: true,
      skipNetAuth: true,
      route: FullLayoutRoute,
      component: ResetPasswordTokenExpiredPage
    },
    {
      to: '/unauthorized',
      hideMenu: true,
      skipNetAuth: true,
      route: ErrorLayoutRoute,
      component: UnauthorizedPage
    },
    {
      to: '/error',
      hideMenu: true,
      skipNetAuth: true,
      route: ErrorLayoutRoute,
      component: ErrorPage
    }
  );
}

DefaultRouter.push({
  to: '/logout',
  skipNetAuth: true,
  icon: FaSignOutAlt,
  localeId: 'nav.logout',
  component: LogoutPage
});

// PageNotFound
DefaultRouter.push({
  to: '/403',
  skipNetAuth: true,
  hideMenu: true,
  route: ErrorLayoutRoute,
  component: ForbiddenPage
});

// PageNotFound
DefaultRouter.push({
  to: '*',
  hideMenu: true,
  route: NoFoundLayoutRoute,
  component: PageNotFoundPage
});

const siteMapObj = new Sitemap(DefaultRouter);

siteMapObj.setSitemapFromApi = sitemap => {
  const fillRoutes = routes =>
    routes.map(r => ({
      ...r,
      ...(r.component ? { component: PageMap[r.component] } : {}),
      ...(r.route ? { route: RouteMap[r.route] } : {}),
      // for id => _id
      id: r._id,
      items: r.items && r.items.length > 0 && fillRoutes(r.items)
    }));
  const fillSitemap = fillRoutes(
    (Array.isArray(sitemap) ? sitemap : []).filter(r => r)
  );
  siteMapObj.setSitemap([...fillSitemap, ...DefaultRouter]);
};
export default siteMapObj;
