import * as express from "express";
import * as bodyParser from "body-parser";
const app: express.Application = express();
import {router} from "./router";

var count: number = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Logging: any = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const Time: String = new Date().toUTCString();
    const method: any = req.method;
    const originalUrl: any = req.originalUrl;
    console.log("[" + Time + "]: " + method + " " + originalUrl);
    next();
}

var Counting: any = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(req) {
        count = count + 1;
        console.log("Server has been requested " + count + " time(s).");
    }
    next();
};

app.use(Logging);
app.use(Counting);
app.use("/", router);
app.use("*", (req: express.Request, res: express.Response) => {
    res.status(404).json({message: "No such api"});
});
app.listen("3000", () => {
    console.log("The Server Has Been Connected! Port Is http://localhost:3000/");
});
