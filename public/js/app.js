var app = angular.module('app', [ 'ui.router', 'ui.bootstrap' ]);

app.controller('homeController', function ($scope) {
  $scope.helloworld = "Hello world by AngularJS";
});

app.controller('showCaseController', function ($scope,$http) {
    $http.get("jsonprint.json").then(function(response) {
        $scope.myData = response.data.records;
    });
});

app.controller('profileController', function ($scope,$http) {
	$scope.helloworld = "Hello world by AngularJS";
});

app.controller('sellerController', function ($scope,$http) {
	$scope.helloworld = "Hello world by AngularJS";
});


//Modulo per la gestione della nav bar per la compatibilità a varie risoluzioni.
app.controller('CollapseController', function ($scope) {
  $scope.isNavCollapsed = true; //L'unica che vorrei implementare nel menù a tendina per sm. by DC
});

// ############   Modulo per la gestione del carousel della pagina relativa a un seller. ############
app.controller('CarouselController', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = true;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//unsplash.it/' + newWidth + '/300',
      text: ['Description','Description','Description','Description'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
}); // Fine modulo gestione carousel. -------------- si dovrebbero creare più file per rendere il codice più ordinato

//Inizio modulo gestione Rating Seller
app.controller('RatingController', function ($scope) {
  $scope.rate = 7; //Valore attuale preimpostato del rating
  $scope.max = 10;
  $scope.isReadonly = true;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };
});
