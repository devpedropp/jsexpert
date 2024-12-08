const assert = require('assert');

const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Pedro', { text: 'two' })
    .set(true, () => 'hello');

// usando o construtor
const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

/* console.log('myMap', myMap);
console.log('myMap.get(1)', myMap.get(1));
console.log('myMapWithConstructor', myMapWithConstructor); */

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Pedro'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'Pedro' });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Pedro' });

// ---- utilitários
// no Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implícita para boolean e retorna false
// o jeito certo em Object é ({ name: 'Pedro' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// para remover um item do objeto
// delete item.id
// pouco performático para o Javascript
assert.ok(myMap.delete(onlyReferenceWorks));

// não dá para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Pedro", { "text": "two" }], [true, () => { }]]));

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

// Object é inseguro, pois dependendo do nome da chave, pode substitir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir com as propriedades herdadas do objeto, como:
// constructor, toString, valueOf e etc

const actor = {
    name: 'José da Silva',
    toString: 'The guy: José da Silva'
};

// não tem restrição de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// não dá pra limpar um objeto sem reassiná-lo, teria que passar undefined pra cada propriedade
// ou dar um delete no objeto ou passar um novo objeto pra dentro dele
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// ---- WeakMap

// pode ser coletado após perder as referências
// usado em casos bem específicos

// tem a maioria dos benefícios do Map, mas NÃO é iterável
// só aceita cheves de referência que você já conheça
// mais leve e prevê leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);
