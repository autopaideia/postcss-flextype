const tape = require('tape');
const postcss = require('postcss');
const plugin = require('../src/postcss-flextype');

function test(t, args) {
  return postcss([plugin(args.opts || {})])
    .process(args.rule, { map: { inline: false, annotation: false } })
    .then((result) => {
      const map = result.map.toJSON();
      const warnings = result.warnings();

      // Expect sourcemaps to be applied correctly
      t.equal(map.sourcesContent.length, 1);
      t.notEqual(map.sourcesContent[0].indexOf('--flextype'), -1);
      // Expect no warnings
      t.equal(warnings.length, 0);
      // Expect result (without whitespace) to match what's expected
      t.equal(result.css.replace(/\s+/g, ''), args.expect);
    });
}

tape('moves --flextype rule to ::before content', (t) => {
  test(t, {
    rule: '.foo{--flextype:\'{"100":10}\';width:10px}',
    expect: '.foo{width:10px}.foo::before{content:\'{"100":10}\';display:none}',
  });

  test(t, {
    rule: '.foo{--flextype:\'50%\';width:10px}',
    expect: '.foo{width:10px}.foo::before{content:\'50%\';display:none}',
  });

  t.end();
});

tape('removes parent rule if --flextype is only declaration', (t) => {
  test(t, {
    rule: '.foo{--flextype:\'{"100":10}\'}',
    expect: '.foo::before{content:\'{"100":10}\';display:none}',
  });

  t.end();
});

tape('wraps bare values in single quotes', (t) => {
  test(t, {
    rule: '.foo{--flextype:50%;}',
    expect: '.foo::before{content:\'50%\';display:none}',
  });

  t.end();
});

tape('outputs both --flextype and ::before if replace option is false', (t) => {
  test(t, {
    opts: { replace: false },
    rule: '.foo{--flextype:50%}',
    expect: '.foo{--flextype:50%}.foo::before{content:\'50%\';display:none}',
  });

  t.end();
});
