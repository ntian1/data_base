
import * as mongodb from "mongodb"
const client = mongodb.MongoClient;

import { v4 as uuid } from 'uuid';
export class reservation {

    private static url = `mongodb://127.0.0.1:27017/`;

    constructor() {

    }

    public static async create(restaurant_id:string,name: string, connection: string,time:string): Promise<any> {
        var db = await client.connect(this.url);
        var id = uuid();
        var collection = db.db("CS554-G2-Final").collection("reservation");
        await collection.insert({id: id,restaurant_id:restaurant_id, name: name, connection: connection, time:time});
        db.close();
        return this.find(id);
    }

    public static async find(name: string) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"name": name}).toArray();
        db.close();
        return res;
    }



}
