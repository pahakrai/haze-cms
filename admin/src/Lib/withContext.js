import React from 'react';

const withContext = contextTypes => Component => {
  /* The context is passed as props. This way the component is
   completely decoupled from the context API.
  */
  const ContextConsumer = (props, context) => (
    <Component {...props} {...context} />
  );
  ContextConsumer.contextTypes = contextTypes;
  return ContextConsumer;
};

export default withContext;
