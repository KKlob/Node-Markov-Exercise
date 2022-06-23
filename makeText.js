/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// make markove machine from text and generate

function createText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// read file and generate text

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`Can't read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            createText(data);
        }
    });
}

// read url and make text from it

async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Can't read URL: ${url}: ${err}`);
        process.exit(1);
    }
    createText(resp.data);
}

// descern commandline to determine what to run

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
}

else if (method === "url") {
    makeURLText(path);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}