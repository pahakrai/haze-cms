import React from 'react';
import styled from 'styled-components';

import RegionTreeListItem from '../../Components/App/Region/RegionTreeListItem';

import RegionTreeList from './RegionTreeList';

const ChildWrapper = styled.div`
  margin-left: 40px;
`;
class RegionTreeListItemWithExpand extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      expand: false
    };
  }

  _onItemClick = () => {
    this.setState(({ expand }) => ({
      expand: !expand
    }));
  };

  render() {
    const {
      region,
      intl,
      onItemCheckboxChange,
      selectItems,
      withCheckBox,
      ancestors,
      deleteRegion,
      ...props
    } = this.props;
    const mutualProps = { selectItems, withCheckBox, onItemCheckboxChange };
    const { expand } = this.state;

    return (
      <React.Fragment>
        <RegionTreeListItem
          region={region}
          onClick={this._onItemClick}
          intl={intl}
          checkbox={withCheckBox}
          deleteRegion={deleteRegion}
          {...mutualProps}
          {...props}
        />
        {expand && ancestors.length < 4 && (
          <ChildWrapper>
            <RegionTreeList
              intl={intl}
              parent={region._id}
              ancestors={ancestors}
              deleteRegion={deleteRegion}
              {...mutualProps}
            />
          </ChildWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default RegionTreeListItemWithExpand;
