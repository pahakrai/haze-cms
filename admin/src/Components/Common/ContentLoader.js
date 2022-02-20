import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactContentLoader, {
  BulletList,
  Code,
  List
} from 'react-content-loader';

export const ContentType = {
  BULLET_LIST: 'bullet-list',
  CODE: 'code',
  CUSTOM: 'custom',
  LIST: 'list'
};

const ContentMap = new Map([
  [ContentType.BULLET_LIST, BulletList],
  [ContentType.CODE, Code],
  [ContentType.CUSTOM, ReactContentLoader],
  [ContentType.LIST, List]
]);

export default class ContentLoader extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(ContentType))
  };
  static defaultProps = {
    type: ContentType.CUSTOM,
    primaryColor: 'rgba(0, 0, 0, 0.2)',
    secondaryColor: 'rgba(0, 0, 0, 0.3)'
  };

  render() {
    const {
      type,
      children,
      primaryColor,
      secondaryColor,
      height,
      width,
      ...rest
    } = this.props;
    const Loader = ContentMap.get(type);

    return (
      <Loader
        height={height}
        width={width}
        backgroundColor={primaryColor}
        foregroundColor={secondaryColor}
        {...rest}
      >
        {children}
      </Loader>
    );
  }
}

ContentLoader.Input = () => (
  <ContentLoader
    width="100%"
    height={43}
    speed={1.5}
    primaryColor="#f3f3f3"
    secondaryColor="#ececec"
    style={{ marginTop: -6, position: 'relative', top: 6 }}
  >
    <rect x="0" y="0" rx="0.25" ry="0.25" width="100%" height="43" />
  </ContentLoader>
);
