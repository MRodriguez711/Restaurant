var app = angular.module('tableApp',[]);

app.controller('tableCtrl',function($scope,$http){
    $scope.restArray= [];

    $scope.get_records =function(){
        $http({
            method:'get',
            url:restaurantURL +"/get-records"
        }).then(function(response){
            console.log(response.data); 
            if(response.data.msg === "SUCCESS"){
                $scope.restArray = response.data.rest;
                $scope.types = getTypes(response.data.rest);
                $scope.selectedType = $scope.types[0];
            }else{
                console.log(response.data.msg);
            }
        }),function(error){
            console.log(error);
        }
     };   
     $scope.get_records();

     $scope.redrawTable =function() {
        var type = $scope.selectedType.value;

        $http({
            method:'get',
            url:restaurantURL +"/get-recordsByType",
            params:{type: type}
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.restArray = response.data.rest;
            }else{
                console.log(response.data.msg);
            }
        }),function(error){
            console.log(error);
        }
     }; 

$scope.editRest = function(restNumber){
    $scope.name =   $scope.restArray[restNumber].name
    $scope.type =  $scope.restArray[restNumber].type
    $scope.location =  $scope.restArray[restNumber].location
    $scope.criticRating = $scope.restArray[restNumber].criticRating
    $scope.patronRating = $scope.restArray[restNumber].patronRating

    $scope.restId = $scope.restArray[restNumber]['_id'];

    $scope.hideTable = true;
    $scope.hideForm = false;
}

$scope.cancelUpdate = function() {
    $scope.hideTable = false;
    $scope.hideForm = true;
}

$scope.updateRest = function(){
    if($scope.type === "" || $scope.criticRating === "" || $scope.patronRating === ""){
        $scope.addResults= "Type, Critic Rating, and Patron Rating are required"
        return;
    }
    $http({
        method:'put',
        url:restaurantURL + "/update-rest",
        data: {
            ID: $scope.restId,
            name: $scope.name,
            type:  $scope.type,
            criticRating: $scope.criticRating,
            patronRating: $scope.patronRating,
            location: $scope.location
        }
    }).then(function(response){
        if(response.data.msg === "SUCCESS"){
            $scope.cancelUpdate();
            $scope.redrawTable();

            $scope.name = "";
            $scope.type = "";
            $scope.location = "";
            $scope.criticRating = "";
            $scope.patronRating = "";


        } else{
            $scope.addResults = response.data.msg;
        }
    }),function(error){
        console.log(error)
    }

    
} 

$scope.deleteRest = function(id) {
    console.log(id);
    $http({
        method:'delete',
        url: restaurantURL +"/delete-rest",
        params: {restId: id}

    }).then(function(response) {
        if(response.data.msg === "SUCCESS"){
            $scope.redrawTable();
        }else{
            console.log(response.data.msg);
        }
    }), function(error) {
        console.log(error);
    }
}
})//end of ctrl

function getTypes(RestTableData){
    var typeExists;

    typesArray = [{value:"", display:"ALL"}];
    for(var i = 0; i<RestTableData.length; i++){
        typeExists = typesArray.find(function (element) {
            return element.value === RestTableData[i].foodType;        
        }); if(typeExists){
            continue;
        }else{
            // typesArray.push({value: RestTableData[i].type,display:RestTableData[i].type.toUpperCase()});
            typesArray.push({value: RestTableData[i].foodType,display:RestTableData[i].foodtype});

        }
    }
    return typesArray;
}