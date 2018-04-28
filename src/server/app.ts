"use strict";

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as helmet from 'helmet';

import ApiController from './controllers/ApiController';

const PORT = process.env.SV_PORT;
// const CLIENT_DIR = process.env.CLIENT_DIR || path.join(__dirname, '../dist/client');

// boot web app
const app = express();
// app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(helmet()); //HTTPヘッダーの保護

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);


app.use('/api', ApiController());
// app.use('/static', express.static(clientDir));
// app.use('/', IndexController(clientDir));
const server = app.listen(PORT, () => {
    console.info(`Node.js is listening to PORT: ${server.address().port}`);
});