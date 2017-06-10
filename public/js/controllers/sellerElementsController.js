// Seller module to manage the carousel
app.controller('CarouselController', function ($scope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = true;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function(i) {
    slides.push({
      image: "images/carousel/" + i + ".jpeg",
      text: ['Description','Description','Description','Description'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++)
    $scope.addSlide(i);

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
}); /* end carousel */

// Controller gestione Rating Seller
app.controller('RatingController', function ($scope) {
  $scope.rate = 7; //Valore attuale preimpostato del rating
  $scope.max = 10;
  $scope.isReadonly = true;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };
});
