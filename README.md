## Hexlet tests and linter status:

[![Actions Status](https://github.com/xomnrt/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/xomnrt/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad0b0e1883e4469667ff/maintainability)](https://codeclimate.com/github/xomnrt/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad0b0e1883e4469667ff/test_coverage)](https://codeclimate.com/github/xomnrt/frontend-project-46/test_coverage)

### Diffence generator info:

Difference generator is a program that determines the difference between two data structures.

Features:

Support of different input formats: yaml, json
Report generation in plain text, stylish and json formats

### Setup

```
git clone 'git@github.com:xomnrt/frontend-project-46.git'
make install
make publish
npm link
```

### Console launch + options:

```
dist/bin/gendiff.js [options] <firstConfig> <secondConfig>

-v, --version        output the version number
-f, --format [type]  output format
-h, --help           output usage information

```

### Example:

[![asciicast](https://asciinema.org/a/t0mUPJQZH6G15Mi8vrcTWWtYa.svg)](https://asciinema.org/a/t0mUPJQZH6G15Mi8vrcTWWtYa)

### Compare JSON files:

[![asciicast](https://asciinema.org/a/vB082p9fNFbA95Sho8XRLN12V.svg)](https://asciinema.org/a/vB082p9fNFbA95Sho8XRLN12V)

### Compare YAML files:

[![asciicast](https://asciinema.org/a/cZ7649ZKVlvXBjlir1pGrJKiZ.svg)](https://asciinema.org/a/cZ7649ZKVlvXBjlir1pGrJKiZ)
