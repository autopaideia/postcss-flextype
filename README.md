# postcss-flextype

[PostCSS](https://github.com/postcss/postcss) plugin for use with [https://github.com/autopaideia/flextype](flextype) that converts `--flextype` declarations into hidden `::before` pseudo-content to work with browsers that don't yet support CSS variables.

## Example

### Input:

```css
.foo {
  --flextype: 5%;
}
.bar {
  --flextype: '{"100": 12, "500+": 18}';
}
```

### Output:

```css
.foo::before {
  content: '5%';
  display: none;
}
.bar::before {
  content: '{"100": 12, "500+": 18}';
  display: none;
}
```

## Install

```bash
npm i -S postcss-flextype
```

## Usage

```javascript
const postcss = require('postcss');
const flextype = require('postcss-flextype');

postcss([flextype]);
```

### Options

#### `replace` (type: `Boolean`, default: `true`)

If set to `false` postcss-flextype will leave the `--flextype` declarations in your CSS in addition to adding them as `::before` content.
