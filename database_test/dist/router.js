"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const reservation_1 = require("../dist/reservation");
const restaurant_1 = require("./restaurant");
const router = express.Router();
exports.router = router;
router.get("/restaurant", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield restaurant_1.restaurant.findAll();
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({ message: "Something wrong" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req.body;
    console.log(request);


    try {
        yield restaurant_1.restaurant.create(request["name"], request["connection"], request["location"], 0, 0, request["money_cost"], request["time_avaliable"], request["cusine"], request["people"]);
        res.status(200).json({ message: "creation successful" });
    }
    catch (e) {
        res.status(500).json({ message: "Something wrong" });
    }
}));
/*restaurant_id:string,name: string, connection: string, date:String,time:string
// reservation request: name conteaction, date, time
*/

router.post("/:id/reservation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        console.log(request);
        
        const id = req.params.id;
        const data = yield reservation_1.reservation.create(id, request["name"], request["connection"], request["time"]);
        yield restaurant_1.restaurant.updateTime(id, request["time"]);
        res.status(200).json( data );
    }
    catch (e) {
        res.status(500).json({ message: "something wrong" });
    }
}));


router.post("/:id/rate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        yield restaurant_1.restaurant.updateRate(req.params.id, request["rate"]);
        res.status(200).json({ message: "creat successful" });
    }
    catch (e) {
        res.status(500).json({ message: "something wrong" });
    }
}));
router.post("/name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        var data = yield restaurant_1.restaurant.findName(request["name"]);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({ message: "something wrong" });
    }
}));
router.post("/money", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        var data = yield restaurant_1.restaurant.findMoney(request["money"]);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({ message: "something wrong" });
    }
}));
router.post("/people", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        var data = yield restaurant_1.restaurant.findPeople(request["people"]);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json({ message: "something wrong" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield restaurant_1.restaurant.find(req.params.id);
        if (data.length == 0) {
            res.status(200).json({ message: "Not found with this id" });
        }
        else {
            delete data[0]._id;
            //return data[0];
            res.status(200).json(data[0]);
        }
    }
    catch (e) {
        res.status(500).json({ message: "Something wrong" });
    }
}));
