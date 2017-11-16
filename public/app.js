var app = angular.module('ListApp', ['ngRoute', 'ngMaterial']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ListController',
            templateUrl: 'views/listview.html'
        })
        .when('/addnew', {
            controller: 'AddnewController',
            templateUrl: 'views/newitem.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
app.run(function($rootScope) {
    $rootScope.safe = function(input)
    {
        return input !== null && input !== undefined && input !== "";
    }
  })
app.controller("AddnewController", ['$scope', '$http', '$location', '$routeParams', '$mdDialog', function ($scope, $http, $location, $routeParams, $mdDialog, $rootScope) {
    console.log('AddnewController loaded...');
    $scope.newitem = {};
    $scope.addItem = function () {
        if ($scope.form.$valid) {
            $http.post('/api/items/', $scope.newitem).then(function (response) {
                $scope.newitem = {};
                $location.path('/');
                // $scope.getitems();
            });
        }
    }
}]);
app.controller("ListController", ['$scope', '$http', '$location', '$routeParams', '$mdDialog', function ($scope, $http, $location, $routeParams, $mdDialog, $rootScope) {
    console.log('ListController loaded...');
    $scope.newitem = {};

    $scope.showConfirm = function (ev, id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete Item Confirm')
            .textContent('Would you like to delete your item?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirm)
            .then(function () {
                console.log(ev, id);
                $scope.removeItem(id);
            }, function () {
            });
    };

    $scope.open = function (ev, item) {
        $mdDialog.show(
            {
                templateUrl: "/views/details.html",
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                controller: function ($scope) {
                    console.log(item);
                    $scope.viewitem = angular.copy(item);
                },
            });
    };
    $scope.save = function () {
        $scope.updateItem($scope.viewitem._id);
        $scope.cancel();
    }
    $scope.purchase_unpurchase = function (item) {
        $scope.viewitem = angular.copy(item);
        $scope.viewitem.checked = !$scope.viewitem.checked;
        $scope.updateItem($scope.viewitem._id, $scope.viewitem);
        $scope.cancel();
    }

    $scope.cancel = function () {
        $scope.viewitem = {};
        $mdDialog.cancel();
    }
    $scope.getitems = function () {
        $http.get('/api/items').then(function (response) {
            if (response !== null || response !== undefined)
                $scope.items = response.data;
        });
    }

    $scope.updateItem = function (id) {
        $http.put('/api/items/' + id, $scope.viewitem).then(function (response) {
            $scope.getitems();
        });
    }

    $scope.removeItem = function (id) {
        $http.delete('/api/items/' + id).then(function (response) {
            $scope.getitems();
        });
    }

    $scope.getitems();

}]);