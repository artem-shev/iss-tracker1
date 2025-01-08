# Getting Started with Create React App

FE part was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
BE part was bootstrapped with [NestJS](https://nestjs.com/).

## Run apps locally

### Backend

**Install dependencies** `cd backend && yarn install` from root

**Run application** `yarn start:dev` from `backend` folder

**Run unit tests** `yarn test` from `backend` folder

#### API
`{BASE_URL}/current` - returns an array of saved locations of ISS, adjusting data after each request. 
Response `{ latitude: number, longitude: number, timestamp: number, velocity: number }[]`


### Frontend

**Install dependencies** `cd frontend && yarn install` from root

**Run application** `yarn start` from `frontend` folder
