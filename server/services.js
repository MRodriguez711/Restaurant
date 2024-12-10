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
            await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });




    app.get("/get-records",async function (req, res) {        //listener
        try{  
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const restaurantsData = await coll.find().toArray();

            await conn.close();

            return res.send(JSON.stringify({msg:"SUCCESS", fileData:restaurantsData}))
        }catch(error){
            await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });



/*




    app.delete("/delete", function (req, res) {

        var deleteId = req.body.id;
        console.log('Deleted ID:', deleteId);


        if (fs.existsSync(db_file)) {
            fs.readFile(db_file, "utf-8", function (err, data) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }))
                } else {
                    var restaurantData = JSON.parse(data);  //array of json objects-name doesnt have to be restaurantData
                    //loop through the resturant data array to find the delete id, then remove from array
                    //once removed, stringify 
                    for (var i = 0; i < restaurantData.length; i++) {
                        if (restaurantData[i].id == deleteId) {
                            restaurantData.splice(i, 1);
                        }
                    }
                    fs.writeFile(db_file, JSON.stringify(restaurantData), function (err) {  //updated data back to the file
                        if (err) {
                            res.send(JSON.stringify({ msg: err }))
                        } else {
                            res.send(JSON.stringify({ msg: "SUCCESS" }));
                        }
                    });

                }


            });
        }

    });


*/




    app.get("/get-data",async function (req, res) {

        try{  
            const conn = await dbclient.connect();
            const db = conn.db("restaurant");
            const coll = db.collection('restaurantdata');

            const restaurantsData = await coll.find().toArray();

            await conn.close();

            return res.send(JSON.stringify({msg:"SUCCESS", fileData:restaurantsData}))
        }catch(error){
            await conn.close();
            return res.send(JSON.stringify({msg:"ERROR" + error}));
        }

    });

};


/*var initializeDatabase = async function() {

    try {
        const conn = await dbclient.connect();
        const db = conn.db("restaurant");
        const coll = db.collection('restaurantdata');

        await conn.close();
    } catch(err) {
        console.log(err);
    }

}*/

module.exports = { services };
//module.exports = { services, initializeDatabase };
