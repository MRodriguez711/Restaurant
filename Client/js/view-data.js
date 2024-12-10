//var data = '[{"restaurantName":"La Focaccia","foodType": "Italian","location":"Summit","criticRating":"4","patronRating":"4.5"},{"restaurantName": "The Commited Pig","foodType":"Hamburger","location":"Summit","criticRating":"4","patronRating": "4.3"},{"restaurantName":"Sea Fire Grill","foodType":"Seafood","location":"New York","criticRating": "5","patronRating":"4.6"},{"restaurantName": "McDonalds","foodType": "Fast food","location": "Newark","criticRating":"2","patronRating":"3.7"},{"restaurantName": "IHOP","foodType":"Breakfast","location":"Jersey City","criticRating": "3","patronRating": "4"}]';

//jsonObject = JSON.parse(data);
//retrieveData();


//function main() {
   // console.log(jsonObject);
  //  console.log(jsonObject.length);

    //showTable(); 
retrieveData()
//}


function retrieveData(){
    $.ajax({
        url: restaurantURL +"/get-records",
        type: "get",
        success: function(response) {
            var data = JSON.parse(response);

            if(data.msg == "SUCCESS"){
                showTable(data.fileData)
            }else{
                console.log(data.msg)
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

/*function showTable(jsonObject) {

    var htmlString = "";
    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].restaurantName + "</td>";
        htmlString += "<td>" + jsonObject[i].foodType + "</td>";    
        htmlString += "<td>" + jsonObject[i].location + "</td>";
        htmlString += "<td>" + jsonObject[i].criticRating + "</td>";
        htmlString += "<td>" + jsonObject[i].patronRating + "</td>";
        htmlString += "</tr>"
    }*/
    function showTable(fileData) {

        var htmlString = "";
        for (var i = 0; i < fileData.length; i++) {
            htmlString += "<tr>";
            htmlString += "<td>" + fileData[i].restaurantName + "</td>";
            htmlString += "<td>" + fileData[i].foodType + "</td>";    
            htmlString += "<td>" + fileData[i].location + "</td>";
            htmlString += "<td>" + fileData[i].criticRating + "</td>";
            htmlString += "<td>" + fileData[i].patronRating + "</td>";
            htmlString += "<td><button class='btnDeleteClass' data-id='"+ fileData[i]._id+"' >DELETE</button></td>"
                
            htmlString += "</tr>"
        }
    $("#tableBody").html(htmlString);  
    activateDelete();
 } 
    

    function activateDelete(){
        $('.btnDeleteClass').click(function(){
            var deleteId = this.getAttribute("data-id");

            var jsonObj={
                id:deleteId
            }
            console.log(jsonObj);

            $.ajax({
                url: restaurantURL+"/delete",//start of calling
                type:"DELETE",
                data:jsonObj,   //<=sending this data to server
                //----------------------------------//
                success: function(response) { //beginning of receiving from server
                    var data = JSON.parse(response);
                    if (data.msg == "SUCCESS") {
                        retrieveData();
                        alert("Data Deleted");   
                    } else {
                        console.log(data.msg);    
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        });
    }
   

//main();
//"data-id= '"+ libraryData[i].id"' 