import * as mongodb from "mongodb"
const client = mongodb.MongoClient;
import { v4 as uuid } from 'uuid';
export class restaurant {

    private static url = `mongodb://127.0.0.1:27017/`;

    constructor() {

    }

    public static async create( name: string, connection: string, location:string,rate:number,
        rate_number:number,money_cost:number,time_avaliable: string, cusine:string,people: number): Promise<any> {
        var db = await client.connect(this.url);
        var id = uuid()
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        await collection.insert({id:id,name: name, connection: connection, location:location,rate:rate,rate_number:rate_number,money_cost:money_cost,
            time_avaliable: time_avaliable,cusine:cusine,people: people});
        db.close();
        return this.find(id);
    }

    public static async find(id: string) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"id": id}).toArray();
        db.close();
        return res;
    }

    public static async findAll() {
        try {
            var db = await client.connect(this.url);
            var collection = db.db("CS554-G2-Final").collection("restaurant");
            var res: any = await collection.find({}).toArray();
            db.close();
            return res;
        }
        catch (e) {
            console.log("something went wrong");
            return e;
        }
    }

    public static async findName(name: string) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"name": name}).toArray();
        db.close();
        return res;
    }


    public static async findLocation(location: string) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"location": location}).toArray();
        db.close();
        return res;
    }

    public static async updateRate(id:string,newRate: number) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res = await collection.find({"id": id}).toArray();
        console.log(res);

        var rate_number = res[0]["rate_number"]+1;
        var rate =(res[0]["rate"]+newRate)/2;
        console.log(rate_number, rate);
        
        await collection.update({"id": id},{$set: {"rate": rate,"rate_number":rate_number}});
        db.close();
    }

    public static async findMoney(money_cost: number) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"money_cost": money_cost}).toArray();
        db.close();
        return res;
    }
    public static async findCusine(cusine: string) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"cusine": cusine}).toArray();
        db.close();
        return res;
    }
    public static async findPeople(people: number) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        var res: any = await collection.find({"people": people}).toArray();
        db.close();
        return res;
    }
    public static async updateTime(id:string,time: string) {
        var db = await client.connect(this.url);
        var collection = db.db("CS554-G2-Final").collection("restaurant");
        await collection.update({"id": id},{$set: {"time": time}});
        db.close();
    }


}
