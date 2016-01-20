# louie-web
Webinterface for Louie

## Testing

Using the excellent test-server from [forumsys](http://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/)

```
username: riemann
password: password

username: gauss
password: password
```

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