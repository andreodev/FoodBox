# FoodBoxd

FoodBoxd é um sistema de gestão de cardápios e avaliações para refeitórios, desenvolvido em React Native com integração ao Firebase. O projeto permite que gestores cadastrem e editem cardápios diários e semanais, acompanhem avaliações dos usuários e visualizem gráficos de desempenho. Usuários podem consultar o cardápio, avaliar refeições e visualizar informações nutricionais.

## Funcionalidades

- **Gestor**
  - Cadastro e login de gestores
  - Cadastro e edição de cardápio do dia e da semana
  - Visualização e edição de informações nutricionais das refeições
  - Visualização de avaliações dos usuários
  - Gráficos de desempenho das refeições
  - Painel de KPIs e feedbacks

- **Usuário**
  - Consulta do cardápio semanal
  - Avaliação das refeições (nota e comentário)
  - Visualização de valor nutricional das refeições

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [React Navigation](https://reactnavigation.org/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [TypeScript](https://www.typescriptlang.org/)

## Estrutura de Pastas

```
src/
  assets/                # Imagens e ícones
  components/            # Componentes reutilizáveis (Sidebar, MealItem, etc)
  config/                # Configuração do Firebase
  hook/                  # Tipos de navegação
  service/               # Serviços de integração com o Firestore
  Views/                 # Telas do app (Gestor e Usuário)
```

## Como rodar o projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/seu-usuario/foodboxd.git
   cd foodboxd
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure o Firebase**
   - Edite o arquivo `src/config/firebase.ts` com suas credenciais do Firebase, se necessário.

4. **Inicie o projeto**
   ```sh
   npm start
   ```
   Ou, para rodar no Android:
   ```sh
   npm run android
   ```

## Observações

- O projeto utiliza Firestore para persistência dos dados.
- As senhas dos gestores são armazenadas em texto puro apenas para fins de protótipo. Em produção, utilize o Firebase Auth.
- O app foi desenvolvido para fins acadêmicos/freelancer e pode ser adaptado conforme a necessidade.

## Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por [Andreo Henrique](https://github.com/andreodev)
