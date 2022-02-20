const {
  name: { lc, uc }
} = require('../../constant');

const e = (module.exports = {});

e.import = {
  point: `
} from '../Pages';`,
  content: `,
  ${uc}FormPage,
  ${uc}Page`
};
e.router = {
  point: `
  // creater insert point`,
  content: `
  /** start - ${lc} create ${lc}Id ${lc}s */
  {
    to: '/${lc}s/create',
    hideMenu: true,
    component: ${uc}FormPage,
    auth: [],
    // userType: [],
    priority: 3
  },
  {
    to: '/${lc}s/:${lc}Id',
    hideMenu: true,
    component: ({ match, ...props }) => (
      <${uc}FormPage ${lc}Id={match.params.${lc}Id} />
    ),
    auth: [],
    // userType: [],
    priority: 2
  },
  {
    to: '/${lc}s',
    icon: MdPlaylistAdd,
    localeId: 'nav.${lc}s',
    component: ${uc}Page,
    auth: [],
    // userType: [],
    priority: 1
  },`
};
