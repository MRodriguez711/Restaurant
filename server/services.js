const fs = require('fs');
const path = require('path');

const db_file = path.join(__dirname + '/files/data.txt');

var services = function(app){
    app.post('/write', function(req, res){   
            var id = "rest" + Date.now();        ///

            var restData = {
                id: id,
                restaurantName:req.body.restaurantName, 
                foodType:req.body.foodType, 
                location:req.body.location,
                criticRating:req.body.criticRating, 
                patronRating:req.body.patronRating 
            };

            var restaurantData = [];

            if(fs.existsSync(db_file)){
                //READ IN CURRENT DATA BASE
                fs.readFile(db_file,"utf-8", function(err, data){
                    if(err) {
                        res.send(JSON.stringify({msg: err}))
                    }else{
                        restaurantData = JSON.parse(data)

                        restaurantData.push(restData);

                        fs.writeFile(db_file, JSON.stringify(restaurantData), function(err) {
                            if(err) {
                                res.send(JSON.stringify({msg: err}))
                            }else{
                                res.send(JSON.stringify({msg:"SUCCESS"}));
                            }
                        });
                    }
                });
            }else{
                restaurantData.push(restData);

                fs.writeFile(db_file, JSON.stringify(restaurantData), function(err) {
                    if(err) {
                        res.send(JSON.stringify({msg: err}))
                    }else{
                        res.send(JSON.stringify({msg:"SUCCESS"}));
                    }
                });

            }
    });
    app.get("/get-records", function(req, res) {        //listener
        if(fs.existsSync(db_file)){
            fs.readFile(db_file, "utf-8", function(err, data) {
                if(err) {
                    res.send(JSON.stringify({msg: err}))
                }else{
                    var restaurantData = JSON.parse(data);
                    res.send(JSON.stringify({msg: "SUCCESS", fileData: restaurantData}))
                }
            });
        }else{
            data = [];
            res.send(JSON.stringify({msg: "SUCCESS", fileData: data}));
        }
    });
};


module.exports = services;