export const handleOptions = (opts = {}) => ({
  autoDismiss: opts.autoClose !== undefined ? opts.autoClose : true,
  appearance: opts.type,
  content: opts.render,
  onDismiss: opts.onDismiss,
  id: opts.id
});
export const generateToastId = () => +new Date() + '';
