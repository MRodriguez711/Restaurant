var data = '[{"restaurantName":"La Focaccia","foodType": "Italian","location":"Summit","criticRating":"4","patronRating":"4.5"},{"restaurantName": "The Commited Pig","foodType":"Hamburger","location":"Summit","criticRating":"4","patronRating": "4.3"},{"restaurantName":"Sea Fire Grill","foodType":"Seafood","location":"New York","criticRating": "5","patronRating":"4.6"},{"restaurantName": "McDonalds","foodType": "Fast food","location": "Newark","criticRating":"2","patronRating":"3.7"},{"restaurantName": "IHOP","foodType":"Breakfast","location":"Jersey City","criticRating": "3","patronRating": "4"}]';

jsonObject = JSON.parse(data);

main();

function main() {
    console.log(jsonObject);
    console.log(jsonObject.length);

    showTable(); 
}


function showTable() {
    var htmlString = "";

    for (var i = 0; i < jsonObject.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + jsonObject[i].restaurantName + "</td>";
        htmlString += "<td>" + jsonObject[i].foodType + "</td>";    
        htmlString += "<td>" + jsonObject[i].location + "</td>";
        htmlString += "<td>" + jsonObject[i].criticRating + "</td>";
        htmlString += "<td>" + jsonObject[i].patronRating + "</td>";
        htmlString += "</tr>"
    }

    $("#tableBody").html(htmlString);  
}
