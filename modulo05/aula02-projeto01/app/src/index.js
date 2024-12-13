'use strict';

const { readFile } = require('fs/promises');
const { join } = require('path');
const pdf = require('pdf-parse');

;(async () => {
    const dataBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'));
    const data = await pdf(dataBuffer);
    // console.log(data.text);
    // cria um arquivo com o texto do pdf
    // npm start | tee text.txt
})();