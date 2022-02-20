import React from 'react';
import styled from 'styled-components';

import Image from '../../../Components/Common/Image';

import IconMap from './IconMap';

const IconImage = styled(Image)`
  position: absolute;
  top: 10px;
  left: 18px;
`;

const NavIcon = ({ size = 20, icon: IconComponent }) => {
  if (typeof IconComponent !== 'string') {
    // if icon component is not a string, just render it
    return <IconComponent size={size} />;
  }
  // it is string
  const isUrl = /^http/.test(IconComponent);
  if (isUrl) {
    // it is url, show icon image
    return (
      <IconImage
        style={{ width: size, height: size }}
        alt={IconComponent}
        src={IconComponent}
      />
    );
  } else {
    const IconComp = IconMap[IconComponent] || (() => {});
    return <IconComp size={size} />;
  }
};

export default NavIcon;
