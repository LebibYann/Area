# AREA: an IFTTT / Zapier-style automation platform

AREA lets users connect online services and chain them: when an **Action** happens on one service, a **REAction** runs on another. For example, "when a new GitHub issue is opened, post a message on Discord".

The suite has three parts that talk to the same REST API: an application server, a web client and a mobile client.

<!-- TODO: add a screenshot or GIF of the web client here -->

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Features

- Account creation and login, plus OAuth2 sign-in to each connected service
- 7 integrated services: GitHub, Discord, Google, Spotify, Twitter, Weather and Timer
- Applet builder: pick an action, a reaction and fill their parameters, which the web client generates dynamically for each service
- Web client and Flutter mobile client (Android APK downloadable from the web client)

## Architecture

| Part | Stack | Folder | Port |
| --- | --- | --- | --- |
| Application server (REST API, triggers) | NestJS, TypeScript | [`server/`](server) | 8080 |
| Web client | React, TypeScript, Vite | [`web/`](web) | 8081 |
| Mobile client | Flutter, Dart | [`mobile/`](mobile) | – |
| Database | MySQL (+ phpMyAdmin on 8082) | – | 3306 |

The server holds one provider module per service ([`server/src/modules/providers/services`](server/src/modules/providers/services)) and polls them to fire the matching reactions.

## My contribution

Team project of 4 at Epitech (Nov. 2023 – Jan. 2024). I built most of the **web client**:

- Generic OAuth2 callback handling shared by every service, and the Spotify OAuth2 flow
- Service list, service detail and applet creation pages, with parameters generated from each action's definition
- Login, registration and settings pages, and the overall UI and styling
- ESLint setup and the front-end documentation

## Getting started

Requires [Docker](https://www.docker.com/) and Docker Compose.

```bash
git clone https://github.com/LebibYann/Area.git
cd Area
docker-compose up --build
```

Then open the web client on <http://localhost:8081>. The API listens on <http://localhost:8080>. Stop everything with `docker-compose down`.

## Documentation

- [Project subject (PDF)](doc/B-DEV-500_AREA.pdf)
- [Mobile architecture, UML (PDF)](doc/mobile_architecture_UML.pdf)
- [Mobile client README](mobile/README.md)
- [Contributing guide](CONTRIBUTING.md)

## Team

- [Yann Lebib](https://github.com/LebibYann): web client
- Enzo Pfeiffer
- Valentin Maurel
- Joseph Susanyan
