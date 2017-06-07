//Modulo per il dropDown del join us nell'index
app.controller('DropdownJoin', function ($scope, $log) {

  $scope.status = {
    isopen: false
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

});

//Modulo per la gestione della nav bar per la compatibilità a varie risoluzioni.
app.controller('CollapseController', function ($scope) {
  $scope.isNavCollapsed = true; //L'unica che vorrei implementare nel menù a tendina per sm. by DC
});