# @ariiera/remark-lint-styleguide

Personalized [remark-lint][] styleguide preset.

## Installation and Usage

### Local installation

If you want to lint the Markdown files from a project, the recommended way is to [install][npm install] this package as a [development dependency][] via [npm][]. Requires [`remark-cli`][remark-cli package].

```bash
npm install --save-dev remark-cli @ariiera/remark-lint-styleguide
```

Then, add the [`remarkConfig`][unified-engine configure] field in your [`package.json`][package.json] file.

```json
"remarkConfig": {
  "plugins": [
    "@ariiera/remark-lint-styleguide"
  ]
}
```

Alternatively, you can create a [`.remarkrc`][unified-engine configure] file in the root of your project and put the configuration there.

```json
{
  "plugins": [
    "@ariiera/remark-lint-styleguide"
  ]
}
```

Next, you need to setup a [npm script][npm run-script] to lint Markdown files. See the [remark-cli package][] for more information on all available options.

```json
"scripts": {
  "lint-md": "remark ."
}
```

Run the script from the command-line.

```bash
npm run lint-md
```

----------

You can tell **remark** to ignore certain files or folders by creating a [`.remarkignore`][unified-engine ignore] file in the root of your project. The format is the same as for [`.gitignore`][gitignore] files.

Alternatively, you can use any file that follows the standard ignore file format. You can even use your `.gitignore` file.

```json
"scripts": {
  "lint-md": "remark --ignore-path .gitignore ."
}
```

### Programmatic usage

If you want to lint Markdown inside a [Node.js module][], you need to [install][npm install] this package as a project [dependency][] via [npm][]. Requires [`remark`][remark package].

```bash
npm install --save remark @ariiera/remark-lint-styleguide vfile-reporter
```

If you want to use it inside your project's custom build script, you should [install][npm install] this package as a [development dependency][] via [npm][]. Requires [`remark`][remark package].

```bash
npm install --save-dev remark @ariiera/remark-lint-styleguide vfile-reporter
```

Quick example:

```javascript
const fs = require('fs');
const remark = require('remark');
const styleguide = require('@ariiera/remark-lint-styleguide');
const report = require('vfile-reporter');

const myFile = fs.readFileSync('my-awesome-article.md', 'utf8');

let output = remark().use(styleguide).processSync(myFile);

console.log(report(output));
```

The [remark package][] interface is provided by the [unified package][]. See the documentation of both projects in order to get a better understanding of the API.

## Configuration

Each rule can be configured with a severity level:

- `off`: turn the rule off
- `warn`: show a warning for problems (exit code is 0, lint passes). Used by optional rules that might have a valid edge case.
- `error`: trigger an error for problems (exit code is 1, lint fails). Used by rules that enforce correct syntax, best practices or portability.

### Override rules

Start your configuration with one of the presets and then modify certain rules to better suit your needs.


```json
"remarkConfig": {
  "plugins": [
    "@ariiera/remark-lint-styleguide",
    ["remark-lint-no-html", false]
  ]
}
```

### Configuration comments

You can use configuration comments to turn all or certain rules on or off inside a file. Note that you cannot change their setting, only whether messages for that rule are shown or hidden. See the [remark-message-control][] package for more information.

To disable all **remark-lint** rules for an entire file, put the comment at the top of the file.

```markdown
<!-- lint disable -->

# Heading

Paragraph.

* list item 1
* list item 2
* list item 3
```

Disable certain rules for an entire file.

```markdown
<!-- lint disable no-html unordered-list-marker-style -->

# Heading

<img src="cover.png">

Paragraph.

* list item 1
* list item 2
* list item 3
```

Disable certain rules only for a section of text.

```markdown
# Heading

<!-- lint disable no-html unordered-list-marker-style -->

<img src="cover.png">

* list item 1
* list item 2
* list item 3

<!-- lint enable no-html unordered-list-marker-style -->

Paragraph.

- list item 1
- list item 2
- list item 3
```

Disable certain rules only for the next node.

```markdown
# Heading

<!-- lint ignore no-html -->

<img src="cover.png">

Paragraph.

- list item 1
- list item 2
- list item 3
```

> **Note**: You'll need the blank lines between comments and other nodes!

### External rules

In order to use the "[external rules][]" you will first have to install their respective package and then add them to your configuration. Example: `remark-lint-no-url-trailing-slash`.

First, install the rule as a [development dependency][].

```bash
npm install --save-dev remark-lint-no-url-trailing-slash
```

Then, add the rule to your existing configuration and provide a severity level for it.

```json
"remarkConfig": {
  "plugins": [
    "@ariiera/remark-lint-styleguide",
    ["remark-lint-no-url-trailing-slash", ["warn"]]
  ]
}
```

## Help

If you have questions that this document or the [remark][] and [remark-lint][] documentations do not answer, please use the official [Gitter chat room][gitter remark] for **remark**.

## Issues

Use this project's [issue tracker][] for any of these situations:

- report a preset that does not correctly implement the style guide it is based on
- request a new preset
- other aspects directly related to the current package

For problems related to the [remark][] and [remark-lint][] packages, please use their respective issue trackers.

## Authors

* **Noah Vazquez** - *Initial work* - [ariiiera][]


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you to [raduserbanescu][] for the bulk of information in this readme

<!-- Definitions -->

[remark]: https://github.com/wooorm/remark
[remark-lint]: https://github.com/wooorm/remark-lint
[external rules]: https://github.com/wooorm/remark-lint#list-of-external-rules
[gitter remark]: https://gitter.im/wooorm/remark

[remark-cli package]: https://github.com/wooorm/remark/tree/master/packages/remark-cli
[remark package]: https://github.com/wooorm/remark/tree/master/packages/remark
[unified-engine configure]: https://github.com/unifiedjs/unified-engine/blob/master/doc/configure.md
[unified-engine ignore]: https://github.com/unifiedjs/unified-engine/blob/master/doc/ignore.md
[unified package]: https://github.com/unifiedjs/unified
[remark-message-control]: https://github.com/wooorm/remark-message-control#markers

[npm]: https://www.npmjs.com/ "npm is the package manager for Node.js"
[npm install]: https://docs.npmjs.com/cli/install
[npm run-script]: https://docs.npmjs.com/cli/run-script
[package.json]: https://docs.npmjs.com/files/package.json
[development dependency]: https://docs.npmjs.com/files/package.json#devdependencies
[dependency]: https://docs.npmjs.com/files/package.json#dependencies

[node.js module]: https://nodejs.org/api/modules.html

[gitignore]: https://git-scm.com/docs/gitignore

[issue tracker]: https://github.com/ariiiera/remark-lint-styleguide/issues
[ariiiera]: https://github.com/ariiiera
[raduserbanescu]: https://github.com/raduserbanescu
