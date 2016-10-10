//Survey module
angular.module('survey', ['survey.que','ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/list.html',
      controller: 'queController'
    })
    .when('/stats', {
      templateUrl: '/stats.html',
      controller: 'queController'
    })
    .when('/donate', {
      templateUrl: '/donate.html'
    })
    .otherwise({redirectTo: '/'});
})


//Question module
angular.module('survey.que', [])


.factory('que', function($http) {
  var getAll = function () {
    return $http ({
      method: 'GET',
      url: '/api/q'
    })
    .then(function (res) {
      return res.data;
    })
  };

  var addQ = function(newQ) {
    return $http ({
      method: 'POST',
      url: '/api/q',
      data: newQ
    })
    .then(function (res) {
      return res.data;
    });
  };

  var tUp = function(newQ) {
    return $http ({
      method: 'POST',
      url: '/api/thumbup',
      data: newQ
    });
  };

  var tDown = function(newQ) {
    return $http ({
      method: 'POST',
      url: '/api/thumbdown',
      data: newQ
    });
  };


  return {
    getAll : getAll,
    addQ: addQ,
    tUp: tUp,
    tDown: tDown
  }

})

//Question Controller
.controller('queController', function($scope, $location, que) {

  $scope.data = {};
  $scope.qs = {};

  $scope.init = function () {
    que.getAll().then(function (qs) {
      $scope.data.qs = qs;
    })
  };

  $scope.addQs = function() {
    que.addQ($scope.qs).then(function () {
      console.log('Add new Question - client', $scope.qs)
      $location.path('/list.html');
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  $scope.thumbUp = function (q) {
    que.tUp(q).then(function () {
      console.log('Thumb up - client', q.text)
    })
    .catch(function (error) {
        console.log(error);
    });

  };

  $scope.thumbDown = function (q) {
    que.tDown(q).then(function () {
      console.log('Thumb down - client', q.text)
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  $scope.init();
})


