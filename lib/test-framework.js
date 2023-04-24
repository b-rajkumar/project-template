const style = require('./style-utils.js');

let totalTests = 0;
let passedTests = 0;
const testLog = [];

const incrementTotalTests = function() {
  totalTests += 1;
};

const incrementPassedTests = function() {
  passedTests += 1;
};

const getTotalTests = function() {
  return totalTests;
};

const getPassedTests = function() {
  return passedTests;
};

const getLog = function() {
  return testLog;
};

const incrementTests = function(result, expected, actual, message) {
  incrementTotalTests();
  if(result) {
    incrementPassedTests();
  }
  testLog.push(createLog(result, expected, actual, message));
};

const createLog = function(result, expected, actual, message) {
  const icon = result === true ? '✅' : '❌';
  const testResult = {icon, expected, actual, message};

  return testResult;
};

const displayTitle = function(text) {
  let title = style.bold(style.yellow("\n" + text));
  title += "\n" + "-".repeat(text.length);
  console.log(title);
};

const displayResult = function(result, expected, actual, message) {
  const icon = result ? '✅\t' : '❌\t';
  console.log(icon + message);
  if(result === false) {
    console.log("\t", "Expected =", expected); 
    console.log("\t", "actual =", actual); 
  }
};

const displaySummary = function() {
  let summary = "\n";
  summary += "  Summary: ";
  summary += getPassedTests() + " / " + getTotalTests();
  summary += " passed";
  console.log(style.bold(style.white(summary)));
};

const assertEquality = function(expected, actual, message) {
  const result = expected === actual;

  if(message !== '') {
    incrementTests(result, expected, actual, message);
    testLog.push(createLog(result, expected, actual, message));
    displayResult(result, expected, actual, message);
  }

  return result;
};

const assertAlmostEqual = function(expected, actual, message) {
  const result = Math.abs(expected - actual) < 0.2;

  if(message !== '') {
    incrementTests(result, expected, actual, message);
    testLog.push(createLog(result, expected, actual, message));
    displayResult(result, expected, actual, message);
  }

  return result;
};

const assertListsEqual = function(expected, actual, message) {
  let result = areListsEqual(expected, actual);

  if(message !== '') {
    incrementTests(result, expected, actual, message);
    testLog.push(createLog(result, expected, actual, message));
    displayResult(result, expected, actual, message);
  }

  return result;
};

const areListsEqual = function(firstList, secondList) {
  if(firstList.length !== secondList.length) {
    return false;
  }

  for(let index = 0; index < firstList.length; index++) {
    if(!areValuesEqual(firstList[index], secondList[index])) {
      return false;
    }
  }

  return true;
};

const areValuesEqual = function(firstValue, secondValue) {
  if(Array.isArray(firstValue)) {
    return areListsEqual(firstValue, secondValue);
  };

  return firstValue === secondValue;
};

const assertStringsEqual = function(expected, actual, message) {
  const result = expected === actual;

  if(message !== '') {
    incrementTests(result, expected, actual, message);
    testLog.push(createLog(result, expected, actual, message));
    displayResult(result, expected, actual, message);
  }

  return result;
};

const assertObjectsEqual = function(expected, actual, message) {
  let result = Object.keys(expected).length === Object.keys(actual).length;

  if(result) {
    for(const key in expected) {
      if(expected[key] !== actual[key]) {
        result = false;
      }
    }
  }

  if(message !== undefined) {
    incrementTests(result, expected, actual, message);
    testLog.push(createLog(result, expected, actual, message));
    displayResult(result, expected, actual, message);
  }
  return result;
};

const assertListOfObjectsEqual = function(expected, actual, message) {
  let result = expected.length === actual.length;

  if(result) {
    for(let index = 0; index < expected.length; index++) {
      if(!assertObjectsEqual(expected[index], actual[index], '')) {
        result = false;
      }
    }
  }

  incrementTests(result, expected, actual, message);
  testLog.push(createLog(result, expected, actual, message));
  displayResult(result, expected, actual, message);
  return result;
};

const toPrettyString = function(object) {
  if(typeof(object) !== 'object' || Array.isArray(object) === true) {
    return object + '';
  }

  let objectString = '{';
  for(const key in object) {
    let value = object[key];
    if(typeof(value) === 'object'){
      value = toPrettyString(value);
    };
    objectString += key + ': ' + value + ', ';
  }
  objectString += '}';
  return objectString;
};

exports.assertEquality = assertEquality;
exports.assertAlmostEqual = assertAlmostEqual;
exports.assertListsEqual = assertListsEqual;
exports.displayTitle = displayTitle;
exports.displaySummary = displaySummary;
exports.getLog = getLog;
exports.assertObjectsEqual = assertObjectsEqual;
exports.assertListOfObjectsEqual = assertListOfObjectsEqual;
exports.assertStringsEqual = assertStringsEqual;
