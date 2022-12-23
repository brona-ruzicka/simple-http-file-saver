#!/usr/bin/env node

const { program } = require("commander");

const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");




program
    .name("npx simple-http-file-saver")
    .description(
        `A simple program running an HTTP server on localhost.` + `\n` + 
        `It saves any POST request body into a file,`           + `\n` +
        `whose location (inside a specified output directory)`  + `\n` + 
        `is determined by the request pathname.`
    )
    .option(
        "-p, --port <port>",
        "change http <port>",
        (text, last) => parseInt(text),
        8000
    )
    .option(
        "-d, --dir, --directory <path>",
        "specify root output directory <path>",
        "./data"
    )
    .parse()

const options = program.opts();

const port = options.port;
const dataDirectory = path.resolve(options.dir ?? options.directory);



console.log(``);
console.log(`Starting Simple HTTP File Saver:`);
console.log(`Listening on 'http://localhost:${port}'.`);
console.log(`Saving to directory '${dataDirectory}'.`);
console.log(``);



console.log(`Initiating webserver.`);


const app = express();

app.use(bodyParser.raw({ type: "*/*" }));

app.post("*", async (request, response) => {
    
    try {
        
        const requestPath = request.path.substring(1);
        const fullPath = path.join(dataDirectory, requestPath);
        const directoryPath = path.dirname(fullPath);

        await fs.promises.mkdir(directoryPath, { recursive: true });
        await fs.promises.writeFile(fullPath, request.body);

        console.log(`${request.body.byteLength} B`.padStart(10), `|`, requestPath);

        response.sendStatus(204);

    } catch(e) {
        console.error(e);
        response.sendStatus(500);
    }

});

app.all("*", (request, response) => response.sendStatus(405));


app.listen(port, () => {
    console.log(`Webserver running.`);
    console.log(``);
    console.log(``);
});
