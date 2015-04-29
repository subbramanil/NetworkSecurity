var sipApp = angular.module('sipApp', ['ngRoute']);

sipApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            /*when('/dashboard', {
                templateUrl: '/views/dashboard',
                controller: 'HomeController'
            }).*/
            when('/login', {
                templateUrl: '/views/login',
                controller: 'RegisterController'
            }).
            when('/register', {
                templateUrl: '/views/register',
                controller: 'LoginController'
            }).
            when('/call', {
                templateUrl: '/views/callCtrl',
                controller: 'CallController'
            }).
            when('/test', {
                templateUrl: '/views/test',
                controller: 'LoginController'
            }).
            when('/testLogin', {
                templateUrl: '/views/testLogin',
                controller: 'LoginController'
            }).
            when('/expert', {
                templateUrl: '/views/expert',
                controller: 'SettingsController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

sipApp.controller('RegisterController', ['$scope', '$http', function ($scope, $http) {

    /*$scope.choices = [
        {name: 'General Surgery', col: 1},
        {name: 'Cardiac Surgery', col: 2},
        {name: 'OrthoPedic Surgery', col: 3},
        {name: 'Vascular Surgery', col: 4},
        {name: 'Other Surgery', col: 5}
    ];
    $scope.userChoice = $scope.choices[0];

    var surgeryData = null;
    function prepareSurgeryData(){
        console.log("SurgeryController.prepareSurgeryData() entry");
        var url = serverURL + encodeURIComponent(query_surgeryTypesByState) + "&output=csv";
        console.log(url);
        $http.get(url).
            success(function (csvData, status, headers, config) {
                surgeryData = $.csv.toArrays(csvData, {onParseValue: $.csv.hooks.castToScalar});
                for(var i=0;i<surgeryData.length;i++){
                    for(var j=0;j<surgeryData[i].length;j++){
                        if(surgeryData[i][j]==null){
                            surgeryData[i][j] = 0;
                        }
                    }
                }
            }).
            error(function (data, status, headers, config) {
                console.log("error in ajax call:SurgeryController.prepareStateData()");
            });
        console.log("SurgeryController.prepareSurgeryData() exit");
    }

    $scope.change = function () {
        console.log("SurgeryController.change() entry");
        console.log($scope.userChoice);
        prepareSurgeryData();
        var url = serverURL + encodeURIComponent(query_surgeryTypes) + "&output=csv";
        console.log(url);
        $http.get(url).
            success(function (csvData, status, headers, config) {
                var data = $.csv.toArrays(csvData, {onParseValue: $.csv.hooks.castToScalar});
                console.log(data);
                for(var i=0;i<data.length;i++){
                    for(var j=0;j<data[i].length;j++){
                        if(data[i][j]==null){
                            data[i][j] = 0;
                        }
                    }
                }
                console.log($scope.userChoice);
                var newData = setupNewData(data, $scope.userChoice.name, $scope.userChoice.col);

                var options = {};
                options['region'] = 'US';   // show US map
                options['dataMode'] = 'regions';
                options['width'] = '100%';
                options['height'] = 600;
                options['colors'] = [0xADEBAD, 0x5C85FF, 0xFF1919];

                var geoChart = new google.visualization.GeoMap(document.getElementById('geoChart'));
                google.visualization.events.addListener(geoChart , 'regionClick', function (eventData) {
                    var region = eventData.region.substr(3);
                    console.log(region);
                    $scope.regionName = region;

                    var cityData = [];
                    var rows = surgeryData.length;
                    console.log(rows);
                    for (var i = 1; i < rows; i++ )
                    {
                        if(surgeryData[i][0] == region){
                            cityData.push(surgeryData[i]);
                        }
                    }
                    console.log("No of Cities with Surgery Count:"+cityData.length);
                    console.log(cityData);

                    var chartData = [];
                    var barChartHeader = ['City', '# of Surgery'];
                    chartData.push(barChartHeader);
                    for(var i=0;i<cityData.length;i++){
                        var val = cityData[i][$scope.userChoice.col+1];
                        if(val>0){
                            chartData.push([cityData[i][1], val]);
                        }
                    }
                    console.log(chartData);
                    if(chartData.length>1){
                        $scope.noData = false;
                        var data = google.visualization.arrayToDataTable(chartData);
                        console.log(data);

                        var options = {
                            title: $scope.userChoice.name,
                            chartArea: {width: '100%'},

                            hAxis: {
                                title: '# of Surgery',
                                minValue: 0
                            },
                            vAxis: {
                                title: 'City'
                            }
                        };
                        var barChart = new google.visualization.BarChart(document.getElementById('barChart'));
                        barChart.draw(data, options);
                    }else{
                        $scope.noData = true;
                    }

                });

                geoChart.draw(newData, options);
            }).
            error(function (data, status, headers, config) {
                console.log("error in ajax call:SurgeryController.change()");
            });

        console.log("SurgeryController.change() exit");
    };*/

}]);

sipApp.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
}]);

sipApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
}]);

sipApp.controller('CallController', ['$scope', '$http', function ($scope, $http) {
}]);

sipApp.controller('SettingsController', ['$scope', '$http', function ($scope, $http) {
}]);