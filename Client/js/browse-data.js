var dataArray = [];
var dataIndex= 0;

var app = angular.module('browseDataApp',[]);

app.controller('browseDataCtrl', function($scope, $http) {
    $scope.get_records = function() {
        $http({
            //Send request to the server
            method:'get',
            url:restaurantURL + "/get-data"
        }).then(function(response){
            //Successfully connected to the server //http parses response so we dont have to
            if(response.data.msg === "SUCCESS"){
                dataArray = response.data.fileData;
                $scope.obj = dataArray[dataIndex];
                $scope.showHide();
            }else{
                console.log(response.data.msg);
            }
        }),function(error){
            console.log(error);
        }
    }

    $scope.get_records(); 

    $scope.changeData = function(direction) {
        dataIndex +=direction;
        $scope.obj = dataArray[dataIndex];
        $scope.showHide();
    }

    $scope.showHide = function(){
        $scope.hidePrevious = (dataIndex == 0) ? true : false;
        $scope.hideNext = (dataIndex == dataArray.length-1);
    }



})//end of ctrl