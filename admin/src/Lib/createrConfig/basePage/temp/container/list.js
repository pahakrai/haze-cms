const {
  name: { lc, uc }
} = require('../../../constant');

const e = (module.exports = {});

e.content = `
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../Components/Common/Loading';
import ${uc}List from '../../Components/App/${uc}/${uc}List';
import { ${uc}Actions } from '../../Redux/${uc}/actions';
import { get${uc}s } from '../../Redux/selectors';
import { withRouter } from 'react-router-dom';

class ${uc}ListContainer extends React.PureComponent {
  componentDidMount() {
    const { ${lc}s } = this.props;
    if (!${lc}s.length) {
      this.fetch${uc}s({ refresh: true });
    }
  }

  _onLoadMore = () => {
    const { fetch${uc}s } = this.props;
    fetch${uc}s({ append: true });
  };

  fetch${uc}s(options = { querys: {} }) {
    const { fetch${uc}s } = this.props;
    fetch${uc}s({
      ...options,
      query: { ...options.querys, populates: [] }
    });
  }

  onItemClick = ${lc} => {
    this.props.history.push(\`/${lc}s/\${${lc}._id}\`);
  };

  render() {
    const { onItemClick } = this;
    const isLoading = false;
    const {
      ${lc}s,
      locale,
      intl,
      pagination: { fetching, isEnd },
      renderFooter,
      header,
      gutter
    } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <${uc}List
        locale={locale}
        intl={intl}
        isNextPageLoading={fetching}
        isEnd={isEnd}
        onLoadMore={this._onLoadMore}
        onItemClick={onItemClick}
        ${lc}s={${lc}s}
        // onDeleteClick={expense => true}
        renderFooter={renderFooter}
        gutter={gutter}
        header={header}
      />
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  ${lc}s: get${uc}s(state),
  pagination: state.pagination.${lc}s
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetch${uc}s: ${uc}Actions.get${uc}s
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(${uc}ListContainer)
);
`.replace(/^\s/, '');
