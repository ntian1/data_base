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
exports.restaurant = void 0;
const mongodb = require("mongodb");
const client = mongodb.MongoClient;
const uuid_1 = require("uuid");
let restaurant = /** @class */ (() => {
    class restaurant {
        constructor() {
        }
        static create(name, connection, location, rate, rate_number, money_cost, time_avaliable, cusine, people) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var id = uuid_1.v4();
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                yield collection.insert({ id: id, name: name, connection: connection, location: location, rate: rate, rate_number: rate_number, money_cost: money_cost,
                    time_avaliable: time_avaliable, cusine: cusine, people: people });
                db.close();
                return this.find(id);
            });
        }
        static find(id) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "id": id }).toArray();
                db.close();
                return res;
            });
        }
        static findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var db = yield client.connect(this.url);
                    var collection = db.db("CS554-G2-Final").collection("restaurant");
                    var res = yield collection.find({}).toArray();
                    db.close();
                    return res;
                }
                catch (e) {
                    console.log("something went wrong");
                    return e;
                }
            });
        }
        static findName(name) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "name": name }).toArray();
                db.close();
                return res;
            });
        }
        static findLocation(location) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "location": location }).toArray();
                db.close();
                return res;
            });
        }
        static updateRate(id, newRate) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "id": id }).toArray();
                console.log(res);
                var rate_number = res[0]["rate_number"] + 1;
                var rate = (res[0]["rate"] + newRate) / 2;
                console.log(rate_number, rate);
                yield collection.update({ "id": id }, { $set: { "rate": rate, "rate_number": rate_number } });
                db.close();
            });
        }
        static findMoney(money_cost) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "money_cost": money_cost }).toArray();
                db.close();
                return res;
            });
        }
        static findCusine(cusine) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "cusine": cusine }).toArray();
                db.close();
                return res;
            });
        }
        static findPeople(people) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                var res = yield collection.find({ "people": people }).toArray();
                db.close();
                return res;
            });
        }
        static updateTime(id, time) {
            return __awaiter(this, void 0, void 0, function* () {
                var db = yield client.connect(this.url);
                var collection = db.db("CS554-G2-Final").collection("restaurant");
                yield collection.update({ "id": id }, { $set: { "time": time } });
                db.close();
            });
        }
    }
    restaurant.url = `mongodb://127.0.0.1:27017/`;
    return restaurant;
})();
exports.restaurant = restaurant;
