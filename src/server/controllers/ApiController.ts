
import * as express from 'express';
// import * as request from 'request';
import * as requestPromise from 'request-promise-native';
import IrCommand from '../models/IrCommand';

// import * as fs from 'fs';
// import { promisify } from 'util';

// const readFile = promisify(fs.readFile);

export default function ApiController():any {
    let router = express.Router();

    // function responsejson(res:express.Response, contents:any) {
    //     res.header("Content-Type", "application/json; charset=utf-8");
    //     res.json(contents);
    // }

    router.post("/command", async (req, res, next) => {
        console.info('/command', JSON.stringify(req.body));
        let device = req.body.device;
        let command = req.body.command;
        
        const clientkey = process.env.IRKIT_CLIENT_KEY;
        const deviceid = process.env.IRKIT_DEVICE_ID;

        try {
            const message = JSON.stringify(IrCommand.get(device, command));
            const fromData = { clientkey, deviceid, message };

            //https://api.getirkit.com/1/messages
            const response = await requestPromise.post('https://api.getirkit.com/1/messages', { form: fromData });
            console.info(response);
            if (response.statusCode != 200) { 
                throw new Error(response.message);
            }
            // responsejson(res, { list: books });
            res.sendStatus(200).end();
        } catch(ex) {
            console.error(ex);
            res.sendStatus(500).end();
        }
    });
    
    return router;
};