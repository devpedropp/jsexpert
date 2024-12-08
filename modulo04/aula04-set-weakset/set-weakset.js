const assert = require('assert');

// usado na maioria das vezes para listas de itens únicos

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);
// console.log('arr3', arr3.sort());
assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ]);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));
// console.log('Set with add item per item', set);
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);
// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

// set.keys e set.values vão retornar a mesma coisa, pois o Set for criado mantendo a compatibilidade com o Map
// console.log('set.keys', set.keys());
// console.log('set.values', set.values());

// no Array comum, para saber se um item existe
// [].indexOf !== -1 ou [].includes(0);
assert.ok(set.has('3'));

// mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então você precisa saber o item que está buscando
// na documentação tem exemplos sobre como fazer uma interseção, saber o que tem numa lista e não tem na outra 
// e assim por diante

// tem nas duas listas
const users01 = new Set([
    'pedro',
    'mariazinha',
    'xuxa'
]);

const users02 = new Set([
    'joaozinho',
    'pedro',
    'julio'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['pedro']);

// o que tem em users01 que não tem em users02
const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxa']);

// ---- WeakSet

// mesma ideia do WeakMap
// não é enumerável (iterável)
// só trabalha com chaves como referência
// só tem métodos simples

const user01 = { id: 123 };
const user02 = { id: 321 };

const weakSet = new WeakSet([ user01 ]);
// weakSet.add(user02);
// weakSet.delete(user01);
// weakSet.has(user01);