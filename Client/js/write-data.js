
    
    
    $("#submit").click(function () {
       // alert("Submit button was pressed");
        var restaurantName = $('#restaurantName').val();
        var foodType = $('#foodType').val();
        var location = $('#location').val();
        var criticRating = $('#criticRating').val();
        var patronRating = $('#patronRating').val();

        var jsonObj= {
            restaurantName:restaurantName, 
            foodType:foodType, 
            location:location,
            criticRating:criticRating, 
            patronRating:patronRating  }
  

    $.ajax({
        url: restaurantURL +"/write",
        type: "post",
        data: jsonObj,  //sending
        success: function(response) {
            var data = JSON.parse(response);
            if (data.msg == "SUCCESS") {
                alert("Data Saved");   
            } else {
                console.log(data.msg);    
            }
        },
        error: function(err){
            console.log(err);
        }
    });
    });

    $("#clear").click(function(){
        $("#restaurantName").val("");   
        $("#foodType").val(""); 
        $("#location").val(""); 
        $("#criticRating").val("");   
        $("#patronRating").val(""); 
    });