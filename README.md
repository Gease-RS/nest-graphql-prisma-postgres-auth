<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Creating an authentication project using NestJS, GraphQL, Prisma, and a PostgreSQL database.

## Project setup

# 1. Criar o projeto NestJS
npx @nestjs/cli new nestjs-auth-cookies
cd nestjs-auth-cookies

# 2. Instalar dependências principais
npm install @nestjs/graphql @nestjs/apollo @apollo/server-express graphql

# 3. Instalar dependências de autenticação
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local

# 4. Instalar Prisma
npm install @prisma/client
npm install -D prisma

# 5. Instalar dependências de segurança e validação
npm install bcrypt cookie-parser helmet @nestjs/throttler
npm install class-validator class-transformer

# 6. Instalar tipos para TypeScript
npm install -D @types/passport-jwt @types/passport-local @types/bcrypt @types/cookie-parser

# 7. Inicializar Prisma
npx prisma init

# 8. Após configurar o schema.prisma, gerar o cliente Prisma
npx prisma generate

# 9. Executar migrations (após configurar DATABASE_URL)
npx prisma db push

# 10. (Opcional) Popular o banco com dados de teste
npx prisma db seed

# COMANDO COMPLETO PARA COPIAR E COLAR:
# Dependências de produção
npm install @nestjs/graphql @nestjs/apollo @apollo/server-express graphql @nestjs/jwt @nestjs/passport passport passport-jwt passport-local @prisma/client bcrypt cookie-parser helmet @nestjs/throttler class-validator class-transformer

# Dependências de desenvolvimento
npm install -D prisma @types/passport-jwt @types/passport-local @types/bcrypt @types/cookie-parser

# Inicializar Prisma
npx prisma init

# Create Database
docker run -d --name name \
  -e POSTGRES_DB=database\
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD= **************** \
  -p 5432:5432 \
  bitnami/postgresql:latest

# Create Migrate
yarn prisma migrate dev

# Create Seed
yarn seed

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
