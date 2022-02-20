import { toast as utils } from './ToastProvider';
import { handleOptions, generateToastId } from './utils';

const TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'info'
};
const generateToastFunction = type => (content, _opts) => {
  const id = generateToastId();
  const opts = handleOptions({
    render: content,
    type,
    id,
    ..._opts
  });
  utils.addToast(opts.content, opts);
  return id;
};
export let toast = function (content, _opts) {
  return toast.info(content, _opts);
};
toast.TYPE = TYPE;
toast.info = generateToastFunction(toast.TYPE.INFO);
toast.error = generateToastFunction(toast.TYPE.ERROR);
toast.warn = generateToastFunction(toast.TYPE.WARNING);
toast.success = generateToastFunction(toast.TYPE.SUCCESS);
toast.update = (id, opts) => {
  const _opts = handleOptions(opts);

  utils.updateToast(id, {
    ..._opts,
    autoDismiss: opts.autoClose !== undefined ? Boolean(opts.autoClose) : false,
    appearance: _opts.appearance || 'info',
    id
  });
};
