'use strict'

const assert = require('assert');
const Event = require('events');
const event = new Event();
const eventName = 'counter';

event.on(eventName, msg => console.log('counter updated', msg));

// event.emit(eventName, 'hi');
// event.emit(eventName, 'bye');

const myCounter = {
    counter: 0
};

const proxy = new Proxy(myCounter, {
    set: (target, propertyKey, newValue) => {
        event.emit(eventName, { newValue, key: target[propertyKey] });
        target[propertyKey] = newValue;
        return true;
    },
    get: (object, prop) => {
        // console.log('called!', { object, prop });
        return object[prop];
    }
});

// em breve será executado, depende da pilha de execução
setInterval(function () {
    proxy.counter += 1;
    console.log('[3]: setInterval');
    if (proxy.counter === 10) clearInterval(this);
}, 200);

// futuro
setTimeout(() => {
    proxy.counter = 4;
    console.log('[2]: setTimeout');
}, 100);

// se quer que execute imediatamente
// parecido com setTimeout com 0ms
setImmediate(() => {
    console.log('[1]: setImmediate', proxy.counter);
});

// para executar imediatamente, interrompendo a pilha de execução do js e inserindo a execução desejada
// má prática
process.nextTick(() => {
    proxy.counter = 2;
    console.log('[0]: nextTick');
});

