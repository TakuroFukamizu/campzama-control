"use strict";

import * as express from 'express';
// import * as path from 'path';
// const SessionModel = require("../model/SessionModel");
// const Logger = require("../model/Logger");
// const logger = Logger.getLogger();

/** 
 * LoginPage Controller 
 * 未ログインのユーザにログインページを配信する
 * */
module.exports = (clientDir: string) => {
    let router = express.Router();

    router.get("/", (req, res, next) => {
        // if (SessionModel.isAuthed(req)) {
        //     logger.info('alrady authed. redirect to app page');
        //     res.redirect("/"); //ログイン済みであればアプリページへスルー
        // } else {
        //     // ログインページを配信
        //     logger.info('send LoginPage');
        //     res.sendFile(path.join(clientDir, "login.html"));
        // }
    });
    return router;
};