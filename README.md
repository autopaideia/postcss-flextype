# postcss-flextype

[![Build Status](https://img.shields.io/travis/autopaideia/postcss-flextype.svg)](https://travis-ci.org/autopaideia/postcss-flextype) [![Codecov](https://img.shields.io/codecov/c/github/autopaideia/postcss-flextype.svg)](https://codecov.io/github/autopaideia/postcss-flextype?branch=master) [![npm version](https://badge.fury.io/js/postcss-flextype.svg)](https://badge.fury.io/js/postcss-flextype) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[PostCSS](https://github.com/postcss/postcss) plugin for use with [flextype](https://github.com/autopaideia/flextype) that converts `--flextype` declarations into hidden `::before` pseudo-content to work with browsers that don't yet support CSS variables.

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
npm install postcss-flextype --save
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
