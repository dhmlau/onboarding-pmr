angular
  .module('app')
  .controller('PMRListController', ['$scope', '$state', 'PMR', '$mdDialog', function($scope,
      $state, pmr, $mdDialog) {


    $scope.pmrs = [];
    $scope.selectedPMR = {};


    function getPMRs() {
      pmr.find().$promise
        .then(function(results) {
          $scope.pmrs = results;
        });
    }
    getPMRs();

    $scope.deletePMR = function(selectedPMR) {
        pmr.deleteById({id: selectedPMR.PMRID})
        .$promise
        .then(function(){
            $scope.selectedPMR = getPMRs();
        });
    }

    $scope.openPMRDetails = function(selectedPMR) {
        console.log('open... ', selectedPMR);
        $scope.selectedPMR = selectedPMR;

        $mdDialog.show({
			controller: 'viewPMRCtrl',
			templateUrl: 'views/pmrDetails.html',
			parent: angular.element(document.body),
			size: 'lg',
			clickOutsideToClose:true,
			resolve: {
				pmr: function(){return selectedPMR;}
			},
			fullscreen: true
			// fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		}).then(function(answer) {

		});
    }

    $scope.editPMRDetails = function(selectedPMR, isNew) {
        
        $scope.selectedPMR = selectedPMR;
        if ($scope.selectedPMR === null) {
            $scope.selectedPMR = {};
        }
        $mdDialog.show({
			controller: 'editPMRCtrl',
			templateUrl: 'views/editPMRDetails.html',
			parent: angular.element(document.body),
			// targetEvent: ev,
			// size: 'lg',
			clickOutsideToClose:true,
			resolve: {
				pmr: function(){return selectedPMR;},
                isNew: function(){return isNew;}
			},
			fullscree: true
			// fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		}).then(function(answer) {
            if (answer) {
                answer.MODIFIEDON = new Date();
                   
                if (isNew) {
                    answer.CREATEDON = new Date();
                    pmr.create(answer);
                } else {
                    pmr.prototype$updateAttributes({id:$scope.selectedPMR.PMRID}, answer);
                }
                $scope.pmrs = getPMRs();
            }
            
		});
    }

        
}])
.controller('viewPMRCtrl', function($mdDialog, $scope, pmr) {
    $scope.pmr = pmr;
    $scope.cancel = function() {
		$mdDialog.hide();
	};
})
.controller('editPMRCtrl', function($mdDialog, $scope, pmr, isNew){
    $scope.pmr = pmr;
    $scope.isNew = isNew;
    $scope.cancel = function() {
        $mdDialog.hide();
    };

    $scope.ok = function() {
        $mdDialog.hide($scope.pmr);
    };
    
});