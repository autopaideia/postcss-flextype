const postcss = require('postcss');

module.exports = postcss.plugin('flextype', options => (css) => {
  const opts = options || {};
  opts.replace = opts.replace === undefined ? true : opts.replace;

  css.walkDecls('--flextype', (decl) => {
    const parent = decl.parent;

    parent
      .cloneAfter({
        selector: parent.selectors.map(s => `${s}::before`).join(',\n'),
      })
      .removeAll()
      .append({
        prop: 'content',
        value: `'${decl.value.replace(/^'|^"|'$|"$/g, '')}'`,
        source: decl.source,
      }, {
        prop: 'display',
        value: 'none',
        source: decl.source,
      });

    if (opts.replace) {
      if (decl.prev() === undefined && decl.next() === undefined) {
        parent.remove();
      } else {
        decl.remove();
      }
    }
  });
});
