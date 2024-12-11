find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'

npm i -g ipt

find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do modulo05
cp -r ../../modulo01/aula05-tdd-desafio-resolvido .

# find . -name *.js -not -path '*node_modules**' \
# | ipt -o \
# | xargs -I '{file}' echo 'ae' {file}

# 1s -> primeira linha
# ^ -> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implícito
CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# atualizar todos os arquivos sem precisar selecionar
# CONTENT="'use strict';"
# find . -name *.js -not -path '*node_modules**' \
# | xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
# /g' {file}