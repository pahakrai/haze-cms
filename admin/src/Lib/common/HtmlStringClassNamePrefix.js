export default (html, prefixClassName = '') => {
  let originStr = html;
  const styles = html.match(/(<style.*>)[^<>]+(<\/style>)/g);
  if (styles) {
    const newStyles = [...styles];
    styles.forEach((style, index) => {
      const names = style.match(/\s[^{}/*]+{/gi);
      names &&
        names.forEach(name => {
          name = name.match(/[#.-_a-zA-Z0-9]{1}[#.\-_a-zA-Z0-9\s[\]:=]*\s*{/gi);
          if (name) {
            name = name[0];
            newStyles[index] = newStyles[index].replace(
              name,
              '\n     ' + prefixClassName + ' ' + name.trim()
            );
          }
        });

      originStr = originStr.replace(style, newStyles[index]);
    });
  }

  return originStr;
};
