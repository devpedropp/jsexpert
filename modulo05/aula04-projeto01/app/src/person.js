const { evaluateRegex } = require('./util');

class Person {
    // replace => (\w+):\s.*
    // por => $1,
    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        documento,
        rua,
        numero,
        bairro,
        estado,
    ]) {
        // ^ -> começo da string
        // + -> uma ou mais ocorrẽncias
        // (\w{1}) -> pega só a primeira letra e deixa em um grupo
        // (a-zA-Z)+$ -> encontra letras maiúsculas e minúsculas, adicionamos o + para pegar todas até o caracter especial
        // /g -> todas as ocorrências que encontrar
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`;
            })
        }

        // replace => (\w+),
        // por => this.$1 = $1
        this.nome = nome;
        this.nacionalidade = formatFirstLetter(nacionalidade);
        this.estadoCivil = formatFirstLetter(estadoCivil);
        // tudo que NÃO for dígito vira vazio
        // /g serve para remover todas as ocorrências que encontrar
        this.documento = documento.replace(evaluateRegex(/\D/g), '');
        // começa a procurar depois do " a " e pega tudo que estiver a frente
        // ?<= faz com que ignore tudo que estiver antes desse match, positive lookBehind
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
        this.numero = numero;
        // começa a buscar depois do espaço, pega qualquer letra ou dígito até o final da linha (poderia ser o .* tbm)
        this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
        // remove o ponto literal (.) do final da frase
        this.estado = estado.replace(evaluateRegex(/\.$/), '');
    }
}

module.exports = Person;