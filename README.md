# CopaFilmes
Projeto que consiste numa API desenvolvida com ASP.NET Core e frontend utilizando Angular 6, para a organização de um campeonato entre os filmes selecionados.


## Getting Started

Utilize as instruções abaixo para conseguir executar a aplicação.

### Requisitos
- Node.js 8.11.1
- NET Core SDK 2.1
- Angular CLI 6.2.5

### Rodando a Aplicação

Primeiramente, é necessário executar o backend. À partir do diretório raiz do projeto, executar o seguinte comando no Powershell:
```
dotnet run --project .\Backend\src\CopaFilmes.Api\CopaFilmes.Api.csproj
```
Usualmente, o serviço WebApi vai estar disponível no endereço:
- https://localhost:5001/swagger

Para executar o frontend, à partir do diretório raiz, executar os seguintes comandos:
```
cd .\Frontend\copa-filmes-app
npm install
ng serve
```
Usualmente, a aplicação vai estar disponível no seguinte endereço:
- https://localhost:4200

## Executando os Testes

Para executar os testes da aplicação, são necessários os seguintes passos:

### Backend

 À partir do diretório raiz do projeto, executar o seguinte comando:
```
dotnet test
```

### Frontend

 À partir do diretório raiz do projeto, executar os seguintes comandos:

```
cd .\Frontend\copa-filmes-app
npm install
ng test
```
## Licença

Este projeto está sobre a licença MIT - veja o arquivo [LICENSE](LICENSE) para maiores detalhes.
