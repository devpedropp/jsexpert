'use strict'

const assert = require('assert');

// garantir semântica e segurança em objetos

// ---- apply
const myObj = {
    add(value) {
        return this.arg1 + this.arg2 + value;
    }
}
// Function.prototype.apply = () => { throw new TypeError('Eita!'); };
// myObj.add.apply = function () { throw new Error('Vish...'); };

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!'); };

// esse aqui pode acontecer
myObj.add.apply = function () { throw new TypeError('Vish...'); };

assert.throws(
    () => myObj.add.apply({}, []),
    {
        name: 'TypeError',
        message: 'Vish...'
    }
);

// usando reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// ---- defineProperty

// questões semânticas
function MyDate() { }

// feio.. tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' });

// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');

// ---- deleteProperty
const withDelete = { user: 'Pedro' };
// pouco performático, evitar ao máximo
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'Maria' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);

// ---- get

// deveríamos fazer um get somente em instâncias de referência
assert.deepStrictEqual(1['userName'], undefined);
// com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// ---- has

assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));

// ---- ownKeys
const user = Symbol('user');
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'pedropp'
}

// com os métodos de Object, temos que fazer 2 requisições
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser),
];
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

// com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);