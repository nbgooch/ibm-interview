# ibm-interview

Quick and dirty backend Mongo, Express, GraphQL starter

## Development
### Environment
- Set up a local mongo instance

`docker run --name mongodb mongo`
- Create a .env file with the following environment variables
```
## Environment ##
NODE_ENV=development
TARGET_ENV=development

## Server ##
PORT=4020
HOST=localhost

## MongoDB ##
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
DATABASE_NAME=interview
```
### NPM Commands

| Script      | Description |
| ----------- | ----------- |
| start:dev      | Start dev server with hot reloading       |
| format   | Format        |
| test   | Run unit tests        |