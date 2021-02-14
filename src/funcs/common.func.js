
const format_limit_html = function (html) {
  const str_onload = `onload="if(window.callback_limit_html_img_onload){window.callback_limit_html_img_onload(this)}"`;
  const str_onerro = `onerror="if(window.callback_limit_html_img_onerror){window.callback_limit_html_img_onerror(this)}"`;
  return String(html || '')
    .replace(/<img\ssrc="([^"]+)"\sclass="limit-html-img"/ig, `<img src="$1" ${str_onload} ${str_onerro} class="limit-html-img"`);
}

const funcs = {
  format_limit_html,
};
export default funcs;