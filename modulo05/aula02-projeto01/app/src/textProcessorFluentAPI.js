// o objetivo do Fluent API é executar tarefas como um pipeline, step by step
// e no fim, chamar o build. Muito similar ao padrão Builder,
// a diferença que aqui é sobre processos, o Builder é sobre construção de objetos
class TextProcessorFluentAPI {
    // propriedade privada
    #content;
    constructor(content) {
        this.#content = content;
    }

    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virão depois desse grupo
        // [contratante|contratada] ou um ou outro (com a flag i, case insensitive, no fim da expressão regular pra pegar maiúsculas e minúsculas)
        // :\s{1} vai procurar o caracter literal de dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parênteses significando que vai pegar daí pra frente

        // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que só tem espaço na frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que pare na primeira ocorrência, evitando loops
        
        // $ informa que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> case insensitive

        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi;

        // faz o match para encontrar a string inteira que contém os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson);

        // console.log('onlyPerson', onlyPerson);
        // console.log('onlyPerson', matchPerson.test(this.#content));
        
        this.#content = onlyPerson;
        return this;
    }

    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;