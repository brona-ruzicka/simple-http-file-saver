# Simple HTTP File Saver

A simple program running an HTTP server on localhost. It saves any POST request body into a file, whose location (inside a specified output directory) is determined by the request pathname.

Note: this package is intended as a utility.



## Usage

The simplest usage case is included below

```console
$ npx simple-http-file-saver
```



## Options

This script includes 3 command line options.


### HTTP Port

This option allows to change the HTTP port, on which the server is listening (`8000` by default)

```console
$ npx simple-http-file-saver -p 8080
```

```console
$ npx simple-http-file-saver --port 8008
```


### Output directory

This option allows to specify the root output directory (`./data` by default)

```console
$ npx simple-http-file-saver -d ./output
```
```console
$ npx simple-http-file-saver --directory /home/example.user/some/directory
```

### Help

This utility has a help option.

```console
$ npx simple-http-file-saver -h
```
```console
$ npx simple-http-file-saver --help
```



## Example

The example console input is below

```bash
$ cd /home/example.user/
$ npx simple-http-file-saver -d example

Starting Simple HTTP File Saver:
Listening on 'http://localhost:8000'.
Saving to directory '/home/example.user/example'.

Initiating webserver.
Webserver running.
```

In response to the following post request 

```console
$ curl http://localhost:8000/a/specific/file.json -d "text=Not_a_json"
```

```http
POST /a/specific/file.json HTTP/1.1
Hostname: localhost
Content-Length: 15

text=Not_a_json
```

the webserver will create all the necesarry directories and this file

```
/home/example.user/example/a/specific/file.json
```
```json
text=Not_a_json
```
