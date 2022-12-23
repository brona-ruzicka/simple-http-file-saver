# Simple HTTP File Saver

A simple program running an HTTP server on localhost. It saves any POST request body into a file, whose location (inside a specified output directory) is determined by the request pathname.

Note: this package is intended as a utility.



## Usage

The simplest usage case is included below

```bash
npx simple-http-file-saver
```



## Options

This script includes 3 command line options.


### HTTP Port

This option allows to change the HTTP port, on which the server is listening (`8000` by default)

```bash
npx simple-http-file-saver -p 8080
```

```bash
npx simple-http-file-saver --port 8008
```


### Output directory

This option allows to specify the root output directory (`./data` by default)

```bash
npx simple-http-file-saver -d ./output
```
```bash
npx simple-http-file-saver --directory /home/example.user/some/directory
```

### Help

This utility includes a help option.

```bash
npx simple-http-file-saver -h
```
```bash
npx simple-http-file-saver --help
```



## Example

The console input would look like this.

```bash
bash$ cd /home/example.user/
bash$ npx simple-http-file-saver -d example

Starting Simple HTTP File Saver:
Listening on 'http://localhost:8000'.
Saving to directory '/home/example.user/example'.

Initiating webserver.
Webserver running.
```

In response to the following post request 

```http
POST /a/specific/file.json HTTP/1.1
Hostname: localhost
Content-Length: 15

text=Not_a_json
```

the script would create all the necesarry directories and the following file

```
/home/example.user/example/a/specific/file.json
```
 would contain this
```json
text=Not_a_json
```
