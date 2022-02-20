const {
  name: { lc, uc, fu }
} = require('../../../constant');

const e = (module.exports = {});

e.content = `
import React from 'react';
import { connect } from 'react-redux';
// import { change as formValueChange } from 'redux-form';
import { toast } from '../../Lib/Toast';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import ${uc}Form from '../../Components/App/${uc}/${uc}Form';
import Loading from '../../Components/Common/Loading';
// import { sycnMTField } from '../../Components/Form/MultiLanguageTextInput';

import { ${uc}Actions } from '../../Redux/${uc}/actions';

import { get${uc}ById } from '../../Redux/selectors';

import FormName from '../../Constants/Form';

class ${uc}FormContainer extends React.PureComponent {
  static defaultProps = {
    onSubmitSuccess: () => true
  };
  componentDidMount() {
    const { ${lc}Id, get${uc}ById } = this.props;

    if (${lc}Id) get${uc}ById(${lc}Id);
  }
  componentDidUpdate(prevProps) {
    const { get${uc}Errors, history } = this.props;

    if (get${uc}Errors) {
      history.push('/error');
    }
  }

  onSubmit(${lc}) {
    const { create${uc}, update${uc} } = this.props;
    const fn = ${lc}._id ? update${uc} : create${uc};

    if (${lc}._id) {
      fn(${lc});
    } else {
      fn(${lc});
    }
  }

  onSubmitSuccess() {
    const {
      updateMode,
      get${uc}s,
      history,
      onSubmitSuccess
    } = this.props;
    toast.success(\`\${updateMode ? 'Updated' : 'Created'} Successfully\`);
    history.push('/${lc}s');
    get${uc}s({
      query: {},
      refresh: true
    });
    onSubmitSuccess();
  }

  onSubmitFail() {
    const { updateMode } = this.props;
    toast.error(\`\${updateMode ? 'Updated' : 'Created'} with Failure\`);
  }

  getInitialValues = () => {
    const { ${lc}, updateMode } = this.props;
    const createValue = {};
    return updateMode ? { ...${lc} } : createValue;
  };

  render() {
    const key = this.props.${lc} ? this.props.${lc}._id : 'new';
    let isLoading = false; // dummy
    const { updateMode, intl, ${lc}, form } = this.props;

    if (updateMode && !${lc}) {
      isLoading = true;
    }

    const initialValues = this.getInitialValues();

    return isLoading ? (
      <Loading />
    ) : (
      <${uc}Form
        // form props
        key={key}
        form={form}
        updateMode={updateMode}
        initialValues={initialValues}
        onSubmit={this.onSubmit.bind(this)}
        onSubmitFail={this.onSubmitFail.bind(this)}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
        // other props
        intl={intl}
      />
    );
  }
}
const mapStateToProps = (state, { ${lc}Id }) => {
  const { ${fu}_CREATE, ${fu}_UPDATE } = FormName;
  const updateMode = Boolean(${lc}Id);
  const form = updateMode ? ${fu}_UPDATE : ${fu}_CREATE;
  const ${lc} = get${uc}ById(state, ${lc}Id);

  return {
    form,
    ${lc},
    get${uc}Errors: state.error.get${uc},
    updateMode
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create${uc}: ${uc}Actions.create${uc},
      update${uc}: ${uc}Actions.update${uc},
      get${uc}s: ${uc}Actions.get${uc}s,
      get${uc}ById: ${uc}Actions.get${uc}ById,
    },
    dispatch
  );
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(${uc}FormContainer)
);
`.replace(/^\s/, '');
