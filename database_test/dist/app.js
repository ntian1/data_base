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

const express = require("express");
const bodyParser = require("body-parser");
const app = express();



const router_1 = require("./router");
var count = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var Logging = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Time = new Date().toUTCString();
    const method = req.method;
    const originalUrl = req.originalUrl;
    console.log("[" + Time + "]: " + method + " " + originalUrl);
    next();
});
var Counting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req) {
        count = count + 1;
        console.log("Server has been requested " + count + " time(s).");
    }
    next();
});

app.use("/",function(req, res, next) {
    //req.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
    //res.header('Access-Control-Allow-Methods', 'POST');
    next();});
    
app.use(Logging);
app.use(Counting);
app.use("/", router_1.router);
app.use("*", (req, res) => {
    res.status(404).json({ message: "No such api" });
});


app.listen("3000", () => {
    console.log("The Server Has Been Connected! Port Is http://localhost:3000/");
});
