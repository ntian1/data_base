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
exports.reservation = void 0;
const mongodb = require("mongodb");
const client = mongodb.MongoClient;
const uuid_1 = require("uuid");
let reservation = /** @class */ (() => {
    class reservation {
        constructor() {
        }
        static create(restaurant_id, name, connection, time) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var id = uuid_1.v4();
                var collection = db.db("CS554-G2-Final").collection("reservation");
                yield collection.insertOne({ id: id, restaurant_id: restaurant_id, name: name, connection: connection, time: time });
                db.close();
                return this.findId(id);
            });
        }
        static findId(id) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("reservation");
                var res = yield collection.find({ "id": id }).toArray();
                db.close();
                return res;
            });
        }
        static find(name) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("reservation");
                var res = yield collection.find({ "name": name }).toArray();
                db.close();
                return res;
            });
        }
    }
    reservation.url = `mongodb://127.0.0.1:27017/`;
    return reservation;
})();
exports.reservation = reservation;
