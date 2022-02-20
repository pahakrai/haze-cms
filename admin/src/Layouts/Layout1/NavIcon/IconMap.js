import * as IconAi from 'react-icons/ai';
import * as IconFa from 'react-icons/fa';
import * as IconMd from 'react-icons/md';
import * as IconIo from 'react-icons/io';

// file is too large
// import * as IconDi from 'react-icons/di';
// import * as IconTi from 'react-icons/ti';
// import * as IconWi from 'react-icons/wi';
// import * as IconFi from 'react-icons/fi';
// import * as IconGi from 'react-icons/gi';
// import * as IconGo from 'react-icons/go';

// list the required icons separately
import IconGi from './IconGi';
import IconGo from './IconGo';

const IconMap = {
  ...IconAi,
  ...IconFa,
  ...IconMd,
  ...IconGo,
  ...IconIo,
  ...IconGi
};

export default IconMap;
