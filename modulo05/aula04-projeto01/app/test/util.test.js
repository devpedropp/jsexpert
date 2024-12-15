const { describe, it } = require('mocha');
const { expect } = require('chai');
const { evaluateRegex, InvalidRegexError } = require('./../src/util');

describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-zA-Z0-9]+\s?)+$/;

        /* 
        CUIDADO AO RODAR! fica rodando em loop infinitamente, catastrophic backtracking 
        time \
        node --eval "/^([a-zA-Z0-9]+\s?)+$/.test('eae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
        */

        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`);
    });

    it('#evaluateRegex should not throw an error using a safe regex', () => {
        const safeRegex = /^([a-z])$/;
        expect(() => evaluateRegex(safeRegex)).to.not.throw();
        expect(evaluateRegex(safeRegex)).to.be.ok;
    })
});


