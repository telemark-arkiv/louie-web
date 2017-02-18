[![Build Status](https://travis-ci.org/telemark/louie-web.svg?branch=master)](https://travis-ci.org/telemark/louie-web)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# louie-web

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/louie-web.svg)](https://greenkeeper.io/)
Webinterface for Louie

## Docker

Build image

```sh
$ docker build -t louie .
```

Start

```sh
$ docker run -d -p 80:3000 --name louie louie
```

from prebuild image
```sh
$ docker run -d -p 80:3000 --name louie telemark/louie-web
```