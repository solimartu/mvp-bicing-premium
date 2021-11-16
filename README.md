# Bicing-premium

An app to improve the way you find a bike near your house/work every day without risking to arrive late.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called premiumbicing: `create database premiumbicing`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

  DB_HOST=localhost
  DB_USER=root
  DB_NAME=facebook
  DB_PASS=YOURPASSWORD

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'myreservations' in your database.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

### Used Libraries

-DateRange from "react-date-range" - to display a calendar
-AddDays from "react-fns" - to display a calendar and set a range
-Map, Marker, ZoomControl from "pigeon-maps" - to display a map

### API Routes

| URI                        | HTTP Method | Description                 | Request Object                                                                                                                                           | Response Object                                                                                                                                            |
| -------------------------- | ----------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /myreservations            | GET         | Gets all reservations       | n/a                                                                                                                                                      | [{ id: integerPickUpStation: string PickUpTime: datetime ReturnStation: string ReturnTime: datetime userId: integer PathName: string Favourite: boolean }] |
| /myreservations            | POST        | Add a new reservation       | { id: integerPickUpStation: string PickUpTime: datetime ReturnStation: string ReturnTime: datetime userId: integer PathName: string Favourite: boolean } | n/a                                                                                                                                                        |
| /myreservations/:id        | DELETE      | Delete a reservation by id  | id                                                                                                                                                       | n/a                                                                                                                                                        |
| /myreservations/:id        | PUT         | Toggle to a favourite path  | Favourite = !Favourite                                                                                                                                   | n/a                                                                                                                                                        |
| /myreservations/favourites | GET         | Gets all my favourite paths | n/a                                                                                                                                                      |                                                                                                                                                            |

### Database Schema

![DataBase Schema](database_schema.jpg)

## Future Features

- I would like to have a unique map where to select the PickUp Station and also de Return Station.
- Also to have a mobile version (responsive).
- To have the choice to switch the wayback (ie home-codeOp, codeOp-home) and to insert the hour. In order to avoid repetitions it would be nice just to add the time you spend on a traject and use that data to calculate the ReturnTime in both cases.

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
