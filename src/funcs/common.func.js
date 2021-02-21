
const _confs = window._ssconfs;

const format_limit_html = function (html) {
  if (!html) return html;
  const str_onload = `onload="if(window.callback_limit_html_img_onload){window.callback_limit_html_img_onload(this)}"`;
  const str_onerro = `onerror="if(window.callback_limit_html_img_onerror){window.callback_limit_html_img_onerror(this)}"`;
  return String(html || '')
    .replace(/<img\s+src="([^"]+)"\s+class="limit-html-img"/ig, `<img src="$1" ${str_onload} ${str_onerro} class="limit-html-img"`);
}

const info_from_pageKey = function (pageKey) {
  const info = {
    appName: null,
    docKind: null,
    keyType: null,
    pageKey: null,
  };
  if (!pageKey) return info;
  const _pks = _confs.common.pageKeys;
  const key = String(pageKey).trim();
  const st4 = key.substr(0, 4);
  Object.assign(info, {
    keyType: st4,
    pageKey: key,
  });
  switch (st4) {
    case _pks.btoto_subject:
      Object.assign(info, {
        appName: _confs.common.appNames.btoto,
        docKind: _confs.common.kinds.comic.file,
      });
      break;
    case _pks.mpark_subject:
      Object.assign(info, {
        appName: _confs.common.appNames.mpark,
        docKind: _confs.common.kinds.comic.file,
      });
      break;
    default:
      break;
  }
  return info;
};

const funcs = {
  format_limit_html,
  info_from_pageKey,
};
export default funcs;