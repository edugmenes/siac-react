Sistema Integrado de Agendamento de consultas para todos os tipos de clinicas com integração de relatórios de consultas realizadas e etc

# Branches

- As branches desempenham um papel fundamental no desenvolvimento de software, servindo como espaços distintos onde podemos controlar e compartilhar o progresso de cada membro da equipe. Elas permitem uma gestão eficaz do trabalho em andamento, facilitando a colaboração e a integração de novas funcionalidades de forma organizada e sem conflitos. Em essência, as branches fornecem um ambiente controlado para o desenvolvimento, permitindo que cada desenvolvedor trabalhe em suas próprias tarefas sem interferir no trabalho dos outros, o que resulta em uma maior eficiência e qualidade do código produzido.

### Tipos de Branch

Antes de prosseguirmos com a criação, é importante compreender os diferentes tipos de branch disponíveis:

- #### Feature: Para implementação de novas funcionalidades ou adição de dados.

- #### Fix: Utilizada para correção de bugs.

- #### Refactor: Quando estamos refinando o código sem alterar sua funcionalidade.

- #### Chore: Destinada a atualizações de pacotes ou tarefas relacionadas que não afetam diretamente o código ou suas funcionalidades.

### Criação de branches

Para criação de uma branch devemos seguir os seguintes passos:

- Para garantir que o código esteja atualizado, vá para a branch main e execute o comando `git pull --rebase origin main`. Este comando irá obter a versão mais recente do repositório e aplicá-la sobre a sua versão local.

- Para criar a branch rodamos o comando com as seguintes variaveis que vão depender da sua história e tipo de branch: `git checkout -b tipo/pequena-descrição`
- Ex: `git checkout -b feat/atualizar-readme-para-branches-e-PRs`

- Depois de ter adicionado quais mudanças você quer subir é só fazer um commit seguindo esse modelo: `git commit -m "tipo/mensagem"`

- Ex: `git commit -m feat/update-readme`

- Depois que fizer todos os commits e quiser subir seu código é só rodar um push da seguinte maneira: `git push -u origin nomedasuabranch`

- Ex: `git push -u origin feat/atualizar-readme-para-branches-e-PRs`

### Pull Requests

- Depois de subir a branch temos que ir no github > Branches > Entre na sua Branch >
