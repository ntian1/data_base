import * as express from "express"
import { v4 as uuid } from 'uuid'
import {reservation} from "../dist/reservation"
import {restaurant} from "./restaurant"

const router: any = express.Router()

router.get("/restaurant", async (req: express.Request, res: express.Response) => {
    try {
        const data = await restaurant.findAll();
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "Something wrong"});
    }
})



router.post("/", async (req: express.Request, res: express.Response) => {
    const request = req.body;
    console.log(req);
    try {
        //if (request == {}) throw ""
       

        const insert = await restaurant.create(request["name"], request["connection"], request["location"], 0,0,request["money_cost"],
        request["time_avaliable"],request["cusine"],request["people"]);
        const id = insert.id;
        res.status(200).json({id});
    }
    catch (e) {
        res.status(500).json({message: "Something wrong"});
    }
});
/*restaurant_id:string,name: string, connection: string, date:String,time:string
// reservation request: name conteaction, date, time
*/ 


router.post("/:id/reservation", async (req: express.Request, res: express.Response) => {
    try {
        const request = req.body;
        if(request["name"]==null||request["comment"]==null) 
        throw ""
        const id = req.params.id;

        await reservation.create(id, request["name"], request["connection"],request["time"]);
        await restaurant.updateTime(id,request["time"]);
        
        res.status(200).json({message: "creat successful"});
    }
    catch (e) {
        res.status(500).json({message: "something wrong"});
    }
});
router.post("/:id/rate", async (req: express.Request, res: express.Response) => {
    try {
        const request = req.body;
        await restaurant.updateRate(req.params.id,request["rate"])

        res.status(200).json({message: "creat successful"});
    }
    catch (e) {
        res.status(500).json({message: "something wrong"});
    }
});

router.get("/name", async (req: express.Request, res: express.Response) => {
    try {
        const request = req.body;
        var data = await restaurant.findName(request["name"])
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "something wrong"});
    }
});

router.get("/money", async (req: express.Request, res: express.Response) => {
    try {
        const request = req.body;
        var data = await restaurant.findMoney(request["money"])
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "something wrong"});
    }
});

router.get("/people", async (req: express.Request, res: express.Response) => {
    try {
        const request = req.body;
        var data = await restaurant.findPeople(request["people"])
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({message: "something wrong"});
    }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const data = await restaurant.find(req.params.id);
        if(data.length == 0) {
            res.status(200).json({message: "Not found with this id"});
        }
        else {
            delete data[0]._id;
            res.status(200).json(data[0]);
        }
    }
    catch (e) {
        res.status(500).json({message: "Something wrong"});
    }
});

export {router}