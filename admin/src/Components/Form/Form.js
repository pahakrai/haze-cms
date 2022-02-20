import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withReduxForm } from 'redux-form/es/ReduxFormContext'

class Form extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func
  }

  static defaultProps = {
    onSubmitSuccess: () => true,
    onSubmitFail: () => true
  }

  static contextTypes = {
    _reduxForm: PropTypes.object
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.formSucceed &&
      this.props.onSubmitSuccess &&
      prevProps.formSucceed !== this.props.formSucceed
    ) {
      // if form succeeded, trigger onSubmitSuccess event
      this.props.onSubmitSuccess()
    }
    if (
      this.props.onSubmitFail &&
      this.props.formSubmitting !== prevProps.formSubmitting &&
      !this.props.formSubmitting &&
      this.props.formFailed
    ) {
      // if form failed, trigger onSubmitFail event
      this.props.onSubmitFail(this.props.formError)
    }
  }

  onFormKeyDown = (event) => {
    if (event.keyCode === 13 && event.target.tagName !== 'TEXTAREA') {
      // disabled enter key submit
      event && event.preventDefault()
      return false
    }
  }

  render() {
    const _onSubmit = (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      const {
        _reduxForm: { touch, valid, registeredFields }
      } = this.props
      if (!valid) {
        touch(...Object.keys(registeredFields))
        return false
      }
      const {
        onSubmit,
        _reduxForm: { getValues }
      } = this.props
      onSubmit(getValues(), ev)
    }
    return (
      <form
        name={this.props.name}
        onSubmit={_onSubmit}
        onKeyDown={this.onFormKeyDown}
      >
        {this.props.children}
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    formSucceed: ownProps._reduxForm.submitSucceeded,
    formFailed: ownProps._reduxForm.submitFailed,
    formSubmitting: ownProps._reduxForm.submitting,
    formError: ownProps._reduxForm.error
  }
}

export default withReduxForm(connect(mapStateToProps)(Form))
