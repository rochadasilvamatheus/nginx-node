# Desafio Nginx como Proxy Reverso com Node.js e MySQL

## Descrição

Neste desafio, a aplicação utiliza o **Nginx** como um proxy reverso para redirecionar as requisições para uma aplicação **Node.js**, que interage com um banco de dados **MySQL**. Quando um usuário acessa o Nginx, ele realiza uma chamada à aplicação Node.js, que registra um nome na tabela `people` do MySQL. Após o registro, a aplicação retorna uma lista com todos os nomes cadastrados.

A aplicação está configurada para ser executada usando **Docker** e **Docker Compose**.

## Tecnologias Utilizadas

- **Node.js / JavaScript**: Para a implementação da lógica da aplicação.
- **Nginx**: Proxy reverso para direcionar as requisições para a aplicação Node.js.
- **MySQL**: Banco de dados relacional para armazenar os nomes cadastrados.
- **Docker**: Facilita o gerenciamento do ambiente e a execução da aplicação.
- **Docker Compose**: Para orquestrar os containers Docker da aplicação.

## Funcionalidades

- **Proxy Reverso**: O Nginx direciona as requisições para a aplicação Node.js.
- **Cadastro de Nomes**: A aplicação Node.js permite o cadastro de nomes na tabela `people` no banco de dados MySQL.
- **Exibição de Lista de Nomes**: A aplicação retorna uma lista de todos os nomes cadastrados após a inserção de um novo nome.

## Como Rodar

### Pré-requisitos

- **Docker** e **Docker Compose** instalados na sua máquina. Caso não tenha, você pode seguir a [documentação oficial do Docker](https://docs.docker.com/get-docker/) para instalá-los.

### Passos

1. Clone este repositório:
```bash
git clone https://github.com/rochadasilvamatheus/nginx-node.git
cd nginx-node
```
2. Execute o Docker Compose para criar e iniciar os containers:
```bash
 docker-compose up -d
```
3. Após a execução, a aplicação estará disponível na porta 8080. Acesse no seu navegador:
```bash
http://localhost:8080
```
4. Quando a página for carregada, a resposta será o HTML abaixo:
```bash
Full Cycle Rocks!
Lista de nomes cadastrados no banco de dados:
. Matheus
. Thiago
. Claudio
. Alice
```
## Estrutura de Diretórios
O repositório está organizado da seguinte forma:
```bash
.
├── docker-compose.yml   # Arquivo de configuração do Docker Compose
├── nginx                # Arquivos de configuração do Nginx
│   └── nginx.conf     # Configuração do Nginx
├── node                 # Código da aplicação Node.js
│   ├── index.js         # Arquivo principal da aplicação
│   ├── package.json     # Dependências da aplicação
│   └── ...              # Outros arquivos da aplicação
└── mysql                # Arquivos de configuração e dados do MySQL
    └── ...        

```
## Explicação dos Serviços
1. Nginx:
Atuará como o proxy reverso, encaminhando as requisições HTTP para a aplicação Node.js.
O Nginx está configurado para escutar na porta 80 e está exposto na porta 8080.

3. Aplicação Node.js:
A aplicação será inicializada após a conexão bem-sucedida com o banco de dados MySQL.
O entrypoint da aplicação usa o dockerize para aguardar a disponibilidade do MySQL antes de iniciar o servidor Node.js.
O código da aplicação está montado como volume para facilitar o desenvolvimento.

2. MySQL:
A imagem do MySQL 5.7 é usada, com um banco de dados chamado nodedb e senha de root definida como root.
O banco de dados é persistido usando volumes, garantindo que os dados sejam mantidos entre reinícios do container.

## Rede
Os containers estão conectados em uma rede interna chamada node-nginx-network, permitindo a comunicação entre eles. O Nginx se comunica com a aplicação Node.js e a aplicação Node.js acessa o banco de dados MySQL.

## Desenvolvimento
Durante o desenvolvimento, os volumes estão configurados para que as alterações no código da aplicação Node.js sejam refletidas imediatamente nos containers em execução.


