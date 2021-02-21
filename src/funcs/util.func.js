
function next_state_status(state, new_val) {
  switch (new_val) {
    case 'pending':
      if (['initial', 'failure'].includes(state.status)) {
        state.status = new_val;
      }
      break;
    case 'success':
      if (state.status === 'pending') {
        state.status = new_val;
      }
      break;
    case 'failure':
      if (state.status === 'pending') {
        state.status = new_val;
      }
      break;
    default:
      break;
  }
}

function cover_width(url, val = 0) {
  const ser = 'W300/';
  const rep = val ? `W${val}/` : '';
  return String(url).replace(ser, rep);
}

function href_add_base(path) {
  return `https://${document.domain}${path}`;
}

const funcs = {
  next_state_status,
  cover_width,
  href_add_base,
};
export default funcs;