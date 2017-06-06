function castle(input) {
  var findingPeak = false;
  var findingValley = false;
  var prevValue = input[0];
  var countCastle = 0;

  for (var i = 1; i < input.length; i++) {
  debugger;
    if (findingPeak && input[i] < prevValue) {
      console.log("peak @" + prevValue);
      countCastle++;
    }
    if (findingValley && input[i] > prevValue) {
      console.log("valley @" + prevValue);
      countCastle++;
    }

    if (input[i] != prevValue) {
      findingPeak = input[i] > prevValue ? true : false;
      findingValley = input[i] < prevValue ? true : false;
      prevValue = input[i];
    }
  }
  return countCastle;
}

castle([1,3,3,3,6]);

castle([2,6,6,6,3]);
