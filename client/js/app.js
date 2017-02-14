// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngMaterial',
    'ngAria'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('pmrlist', {
        url: '/pmrlist',
        templateUrl: 'views/pmrlist.html',
        controller: 'PMRListController'
      });

      
    $urlRouterProvider.otherwise('pmrlist');
    
  }]);
