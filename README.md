# **FS2FE-Reminato-Testing**

## Introduction

This project is testing project by REMINTO provided

### Key Features

Real-time web application with support for instant notifications when users share YouTube video links. It provides a seamless experience for users to share and watch YouTube videos directly on the website. The main purpose of the application is to enhance social interactions by allowing users to share their favorite videos with friends .

- ⭐️ **Real-time Notifications:** The application leverages web sockets to deliver real-time notifications to users when a YouTube video link is shared by someone on the platform. Users will receive instant updates about new video shares, keeping them engaged and connected.

- ⭐️ **Video Embedding:** When a YouTube video link is shared, the application automatically embeds the video player on the web page, allowing users to watch the video directly within the site. This seamless integration enhances user experience and encourages more interactions.

- ⭐️ **Video Voting:** Users can leave votes and engage in discussions about the shared videos.

- ⭐️ **User Authentication:** To ensure a secure environment, the application provides user authentication, allowing users to create accounts, log in.

The project aims to create an enjoyable and social video-sharing platform where users can connect, discover new funny content. Whether you are a video enthusiast or looking to connect with like-minded individuals, this application provides a modern and seamless experience for sharing and exploring YouTube videos.

## Prerequisites

Make sure you have the following software and tools installed:

### General

Make sure you have the following software and tools installed:

- **node** (version ^16.13.1)
- **npm** (version ^8.1.2)
- **git** (version ^2.38.window) [**Feel free when install it**]

[Optional]: Alternatively, you can use one of the following tools managers:

- **yarn** (version \*) [**Didn't test**]
- **pnpm** (version \*) [**Didn't test**]

### Tools

you can use one of the following tools for coding:

- **Visual studio code**
  [Extensions] you can use the following extension to ensure coding more effective and support in some specific case.
  - Code Spell Checker
  - ESLint
  - JavaScript and TypeScript Nightly
  - Prisma
  - Prettier
  - Tailwind CSS IntelliSense

### Front-end

Ensure you have the following front-end technologies and versions:

- **ReactJS** (version ^18.2.0)
- **Vite** (version ^4.4.5)

### Back-end

Ensure you have the following back-end technologies and versions:

- **Typescript** (version ^5.0.4)
- **Sql-lite** [**Testing directly in project without install anything else**]

[Optional]: Alternatively, you can use one of the following sql instead:

- **mongo** (version \*) [**Didn't test**]
- **postgres** (version ^15.x) [**Didn't test**]

### Other service

Ensure you have the following back-end technologies and versions:

- **Docker** (version ^24.0.2.window) [**Ensure this to run some service or deploy app to docker**]

## Installation & Configuration

Instead putting config of common to the root directory. I separated to Front-end and Back-end directory cause of the different running environment between service.

Follow these steps to set up the project:

### Cloning the Repository

To get started with the project, clone the repository using the following command:

```bash
git clone https://github.com/phamquangsang661/FS2FE-Reminato-Testing
```

### Front-end setup

To set up the front-end, navigate to the project directory and install the dependencies:

```bash
cd front-end
npm install
```

### Back-end setup

To set up the back-end, navigate to the project directory and install the dependencies:

```bash
cd back-end
npm install
```

Running some service such as Notify when sharing, Vote video need to have **RabbitMQ**. So please install docker to run these, I will introduce in section **Docker**. But you still can run the project without RabbitMQ, but these service will be deactivate.

### Environment Variables

The project requires some environment variables for configuration. Create a **.env** file in both back-end directory and front-end directory.

For each folder will have a **.env.example**, you can copy and change .env for each directory.

Each env meaning will be explained in the **.env.example**. Please careful when you determined changing anything.

If you run a docker instead of running, you still have to create **.env** file for each directory.

#### Back-end specific

In back-end you have to run generate env to ensure typescript working correct, with the following command, it also will be auto running after npm install:

```bash
npm run g:env
```
<!-- 
For the host name of DATABASE_URL env. It should be db if we deploy in docker composer, because the container name define in docker composer is **db** -->

#### Front-end specific

In front-end you can define type of .env in **front-end/src/vite-end.d.ts**. Default .env that worked have been added, so you have not to edit anything. You can read this [article](https://vitejs.dev/guide/env-and-mode.html) for understanding vite processing env.

## Database Setup

I using prisma to work and migrate database. you can change provider in **back-end/prisma/schema.prisma** of prisma to change database.

Changing **DATABASE_URL** in **back-end/.env** if you want to change another provider.

### Production migration

To set up the database and run migrations, use the following commands in back-end directory.

```bash
cd back-end
npm run db:migrate-prod
```

This command will generate type for prisma in typescript and also migrate database in production. Foreach update in database you can use following command also.

```bash
npm run db:auto-prod
```

### Development migration

To set up the database and run migrations, use the following commands in back-end directory. It will create the migration folder in prisma. Prisma will base on these migration for next migrate with development or production

```bash
cd back-end
npm run db:migrate-dev
```

You can also reset database with following command, please careful when run this in production

```bash
npm run db:reset
```

### Seeding

Unfortunately I did not write seed for this project, but I wrote the seed command. If you want to create a **seed.ts**, creating in **back-end/prisma** directory and the the following commands to run seed.

```bash
npm run seed
```

[Warning]: the back-end service will still running if the database wasn't update to newest or can't connect to the database.
I ignore error to ensure the app will always run, but will ensure to reconnect until it works

## Running the Application

Run and develop in the project with the following command.To ensure the app work with no error, please run back-end firstly

### Back-end

This project using nodejs with typescript ESM. It also use nodemon for coding, auto change after we edit in source code.
This project have 3 service and one support service:

- Main server
- Notify service - support send notify message to other user, when some one share video.
- Video service - increase, decrease vote in queue to ensure the vote of video is not being weird, wrong.

The last support service is RabbitMQ, and it running in docker, I will introduce in docker section. We still can run service back-end first, because all service will auto reconnect with n Time, until connect is established

We can also extends and modify service in the future
To ensure these service working in good condition, please running step by step.

#### Main server

Please cd to back-end and run following commands:

##### Development

```bash
npm run dev
```

##### Production

```bash
npm run start
```

Main server default open in port 3000, that meaning we can access server on http://locahost:3000 in local. We can change this by changing **SERVER_PORT** in .env

#### Notify service

Please cd to back-end and run following commands:

##### Development

```bash
npm run dev:notify
```

##### Production

```bash
npm run start:notify
```

Notify server default open in port 3000, that meaning we can access server on ws://localhost:3555 in local. We can change this by changing **NOTIFICATION_SOCKET_PORT** in .env

#### Video service

Please cd to back-end and run following commands:

##### Development

```bash
npm run dev:video
```

##### Production

```bash
npm run start:video
```

This service is only for running in sever.

All the dev service will run with nodemon to auto re complied when code change in include source.

Each command will include custom loader, because ESM is too new and something is not support, such as ts path. But it have some advantages such as support using many new library! Please not changing custom loader if you don't understand what you are doing, it could make the app break.

### Front-end

We using vite for build reactJS, so it will be easy to start!

#### Development

Please cd to back-end and run the following command:

```bash
npm run dev
```

After running command, the web will open default in port 4001, you can set **VITE_WEB_APP_PORT** to the other port in **.env**, also change VITE_WEB_APP_URL to your serve host to ensure website work normal

Go to http://locahost:4001 (if the port is 4001), you can see the web app

#### Production

Build application first, run the following command

```bash
npm run build
```

To preview in production, run the following command.

```bash
npm run preview
```

If you want to serve front-end app, please install serve with the following command.

```bash
npm install -g serve
```

To serve app, run following command, dist is the folder build of vite, if it is other folder, you can change dist to other directory name.

```bash
serve -s dist
```

### Testing

This part is being excited. But unfortunately I don't have time to write a test in back-end, it will be great if I have it. So in this section I will only introduce how to test in front-end.

I separate to 2 type testing in this project, foreach type will using each different testing framework.

- Unit testing
- Integrated testing

#### Unit testing

We have many testing library. But in this project use vite, so I use vitest. It almost same jest, you can read this [article](https://vitest.dev/guide/why.html) to understand why I choose this lib.

All the unit test of vitest, this project will store in

- Test in **\_\_tests\_\_**
- Mock in **\_\_mocks\_\_**

To run the test with watch mode, run the following command

```bash
npm run test
```

To run the test with coverage, run the following command

```bash
npm run coverage
```

The coverage will store in front-end/coverage, but I ignore put it to git. % Cover Lines of this project is **98%**. Well result! right?

#### Integrated testing

We don't have api testing but we can mock the api setting to simulate api call of server.

I choose Cypress to test Front-end UI and interactive.

This project have only one file spec with 2 test

- [Desktop] User full interactive - test with viewport of macbook 11
- [Mobile] User full interactive - test with viewport of iphone X

To run cypress, we can use following command

```bash
npm run cypress:open
```

We can also deploy cypress with docker, I will introduce in docker section.

After the app run, We will choose the Component testing in Cypress app, and choose a browser for testing. The default is chrome v115. Choose a browser and it will lead you to Cypress component testing in port 4444, you can edit the port in cypress.config.ts .

In the left side navigation of Cypress component testing. Choosing Spec, and you will see all the test that be defined.

I named the spec is full-user-interactive. Clicking to it, and it will open tab for that spec, you can also see what happen for each action in spec. Waiting auto run, it will run step by step that I define in folder **cypress/component/full-user-interactive.cy.tsx**.

## Docker Deployment

This section I will tell how to run project with docker. In other hand some server need a support service that use a docker to run in good state.

### Service required

I using RabbitMQ to sender/consume message between service, also wrote the command to run rabbitMQ in docker

Please cd to back-end and run the following command to pull image

```bash
npm run docker:pull:rabbitmq
```

To run rabbitMQ docker with expose host 15672 and 5672, run following command

```bash
npm run docker:run:rabbitmq
```

these are default port for rabbit mq, please don't change,If you want to change, you can change it in **compose.yaml** of root folder instead.

### Optional

We should run all the service with docker with **compose.yaml** to get a expect result, if you don't want, please refer all the info below

#### Server docker

I wrote a specific Dockerfile for back-end that using for running in compose. This back-end also add healthcheck to check server status

That Dockerfile only support to install a back-end main server only, to run a notify service, or video service also, please prefer the docker-compose instead.

#### Docker compose

This is the best choice if you want to start a fully service in best state.

to run a docker compose, please cd to root folder and run the following command in cmd, bash, powershell, .... Please ensure that you installed docker compose before

```bash
docker compose
```

You can change the compose in **compose.yaml** of root folder

Docker compose will ensure all the following service:

 - RabbitMQ
 - Postgres DB
 - Main server
 - Notify server
 - Video server
 - Front end app
 - Cypress

## Usage

### Register/Login and Logout

To use the application, users need to create an account and login. If you don't have a account, you can login with new email and password, and it will auto create your account for you.

In desktop, we can see the input of email and password in navigation

In mobile, we click to smile icon the the right of navigation. It will open login/register popup. It work as the same of desktop.

The email should is the valid email, and the password have at least 6 character

### Share YouTube Video Links

Once you are logged in, you can start sharing YouTube video links by navigating to the "Share Video" page by click the share button in desktop or share icon in mobile navigation. 

Paste the YouTube video link into the input url field and click the "Share" button. If the video exist, the server will send the real-time notifications about the shared video to the other user logged in.

### Watch Shared Videos

As you follow other users and they share videos, you will receive real-time notifications about new video shares. Click on the button watch in notification to redirect to youtube or navigate to the "Home" page to see the newest shared videos. You can also watch the videos directly on the home page without leaving the application. 

Wanting more?, scroll to bottom and it will render more video until it ends.

### Voting Videos

Each video have vote up count, vote down count. Beside watch videos directly in home page, you can vote video after logged-in. But foreach video you can only vote one times, or you can un vote.

## Troubleshooting

Until now we don't any common issues during setup except losing network, right? 

It will be great if we can run the app with docker compose in ubuntu/linux environment, if you have any question, please contact to me with gmail **phamquangsang661@gmail.com**. 


