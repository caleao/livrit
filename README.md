# livrit
MVP for Livrit Accessible Navigation API (http://livrit.com.br)

# intruções para criação do ambiente de desenvolvimento.
- Baixar e instalar o meteor. (ver instruções: https://www.meteor.com/install)
- Baixar e instalar a IDE Atom (ou outra para Node.js). (Site: https://atom.io/)
- Instalar o package do Atom para Meteor. (opcional: https://atom.io/packages/meteor-api)
- Clonar a aplicação do repositório do GitHub: https://github.com/caleao/livrit

# executar a aplicação
- Navegar até o diretório do projeto (Exemplo: cd ~/livrit)
  #ambiente localhost
  - executar: meteor --settings private/localhost.json
  #ambiente de testes (http://livrit.meteor.com)
  - executar: meteor --settings private/test.json
  #ambiente de produção (http://app.meteor.com) (!!! AINDA NÃO ESTÁ PRONTO !!!)
  - executar: meteor --settings private/production.json

# Deploy no servidor de Produção
https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx



