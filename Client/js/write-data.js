    $("#submit").click(function () {
        alert("Submit button was pressed");
    });

    $("#clear").click(function(){
        $("#restaurantName").val("");   
        $("#foodType").val(""); 
        $("#location").val(""); 
        $("#criticRating").val("");   
        $("#patronRating").val(""); 
    });