
const _confs = window._ssconfs;

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

/**
 * relaDoc have different format for diferent sites
 * we build it into the same format that will need for <a></a>
 * @param {*} relaDoc 
 */
function get_formated_rela_infos(relaDoc) {
  const infos = {
    https: null,
    cover: null,
    title: null,
  };
  if (!relaDoc?._keyType) {
    return infos;
  }
  const _pks = _confs.common.pageKeys;
  switch (relaDoc._keyType) {

    case _pks.mpark_subject:
      Object.assign(infos, {
        https: relaDoc._https_mpark,
        cover: relaDoc._https_cover,
        title: relaDoc.info?.name,
      });
      break;
    case _pks.mpark_episode:
      Object.assign(infos, {
        https: relaDoc._https_mpark,
        title: relaDoc._short,
      });
      break;

    case _pks.btoto_subject:
      Object.assign(infos, {
        https: relaDoc._https_btoto,
        cover: relaDoc._https_cover,
        title: relaDoc.info?.title,
      });
      break;
    case _pks.btoto_episode:
      Object.assign(infos, {
        https: relaDoc._https_btoto,
        title: relaDoc._short,
      });
      break;

    default:
      break;
  }
  return infos;
}

const funcs = {
  next_state_status,
  cover_width,
  href_add_base,
  get_formated_rela_infos,
};
export default funcs;