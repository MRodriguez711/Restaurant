const {MongoClient, ObjectId} = require('mongodb');

//Define Database URL
const dbURL = process.env.DB_URI || "mongodb://127.0.0.1";

//Define the database server
const dbclient = new MongoClient(dbURL);




var services = function (app) {
    app.post('/write',async function (req, res) {
        var restData = {
            // _id: id,
            restaurantName: req.body.restaurantName,
            foodType: req.body.foodType,
            location: req.body.location,
            criticRating: req.body.criticRating,
            patronRating: req.body.patronRating
        };

        var search = {restaurantName:req.body.restaurantName};
        //console.log('Searching for:', search);
        try{  
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const restaurant = await coll.find(search).toArray();

            if(restaurant.length > 0) { 
                await conn.close();
                //return res.send(JSON.stringify({msg:"Restaurant Already Exists" + error}));
                return res.send(JSON.stringify({msg:"Restaurant Already Exists"}));
            }else{
                await coll.insertOne(restData);
                await conn.close();
                return res.send(JSON.stringify({msg:"SUCCESS"}));

            }
        }catch(error){
           // await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });


    //---------------------------------------------------------------------------------------------------------------


    app.get('/get-records', async function(req, res) {
        try{
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const data = await coll.find().toArray();      

            await conn.close();

            return res.send(JSON.stringify({msg:"SUCCESS", rest:data}))
        }catch(error){
            //await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });




    app.get("/get-recordsByType", async function(req, res) {
        var search = (req.query.type === "") ? {} : {type: req.query.type};

        try{
        
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const data = await coll.find(search).toArray();       

            await conn.close();

            return res.send(JSON.stringify({msg:"SUCCESS", rest:data}))
        }catch(error){
            //await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });

    app.put('/update-rest', async function(req, res) {
        var updateData = {
            $set: {
                restaurantName: req.body.name,
                foodType: req.body.type,
                criticRating: req.body.criticRating,
                patronRating: req.body.patronRating,
                location: req.body.location,

            }
        }

        try{
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const search =  {_id: ObjectId.createFromHexString(req.body.ID)};

            await coll.updateOne(search,updateData);
            await conn.close();

            return res.send(JSON.stringify({msg: "SUCCESS"}));

        }catch(err){
            console.log(err);
            return res.send(JSON.stringify({msg:"ERROR" + err}));
        }
    });

    app.delete('/delete-rest', async function(req, res) {
        try{
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            //where
            const search = {_id: ObjectId.createFromHexString(req.query.restId)} //convert string to obj

            await coll.deleteOne(search);

            await conn.close();

            return res.send(JSON.stringify({msg: "SUCCESS"}));
        }catch(err){
            console.log(err);
            return res.send(JSON.stringify({msg:"ERROR" + err}));
        }
    });



    app.post('/refreshRest', async function(req, res) {
    try {
        const conn = await dbclient.connect();
        const db = conn.db("restaurant");
        const coll = db.collection('restaurantdata');
        await coll.drop();
        console.log("Dropped database");
        await dbclient.close();
        initializeDatabase();
        return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));        
    } catch(err) {
        console.log(err);
        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
    }

    });




    //---------------------------------------------------------------------------------------------------------------

    app.get("/get-data",async function (req, res) { //for browsing

        try{  
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const restaurantsData = await coll.find().toArray();

            await conn.close();

            return res.send(JSON.stringify({msg:"SUCCESS", fileData:restaurantsData}))
        }catch(error){
            //await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });

};


module.exports = { services };
//module.exports = { services, initializeDatabase };
