'use strict';

$(document).ready(init);

function init(){

  $('.num').click(numberClick);
  $('.operator').click(operatorClick);
  $('.equal').click(equalClick);
  $('.decimal').click(decimalClick);
  $('.clear').click(clear);
  $('.plusMinus').click(negativePositiveSwitch);
  $('.percentage').click(percentage);
  $('.output').text("0");
}

var operatorArray = [];
var masterEquation = [];
var entry = [];


function numberClick(){
  $(this).attr("enabled","enabled");
  var number = $(this).text();
  entry.push(number);
  var numberEntry = entry.join("");
  $('.output').text(numberEntry);
}

function operatorClick(){
  $(this).attr("enabled","enabled");
  var numberEntry = entry.join("");
  masterEquation.push(numberEntry);

  var operator = $(this).text();
  operatorArray.push(operator);
  entry = [];

  if(operatorArray.length === 2){
    refreshValue();
    $('.output').text(masterEquation[0]);
    console.log(masterEquation);
  } else {
    $('.operator').attr("enabled","enabled");
  }
}

function decimalClick(){
  var numberEntry = entry.join("");
  if(numberEntry.indexOf('.') === -1){
    var decimal = $(this).text();
    entry.push(decimal);
  } else {
    $(this).attr("disabled","disabled");
  }
}


function refreshValue(){
  var op = operatorArray.shift();
  var num1 = masterEquation[0];
  var num2 = masterEquation[1];
  var result;
    switch(op){
      case '+': result = parseFloat(num1) + parseFloat(num2); break;
      case '-': result = parseFloat(num1) - parseFloat(num2); break;
      case '*': result = parseFloat(num1) * parseFloat(num2); break;
      case '÷': result = parseFloat(num1) / parseFloat(num2); break;
      case '^': result = Math.pow(parseFloat(num1), parseFloat(num2));
    }
  masterEquation.splice(0, 2, result);
}


function clear(){
  operatorArray = [];
  masterEquation = [];
  entry = [];
  $('.output').empty();
}

function equalClick(){
  var numberEntry = entry.join("");
  masterEquation.push(numberEntry);
  refreshValue();
  $('.output').text(masterEquation[0])
  console.log(operatorArray);
  console.log(masterEquation);
  console.log(entry);
}

function negativePositiveSwitch(){
  var numberEntry = parseFloat(entry.join(""));
  var flippedEntry;
  if (numberEntry > 0){
    flippedEntry = numberEntry * -1;
  } else {
    flippedEntry = Math.abs(numberEntry);
  }
  entry.splice(0, entry.length, flippedEntry);
  $('.output').text(flippedEntry);
}

function percentage(){
  var numberEntry = parseFloat(entry.join(""));
  var percentageEntry;
  if (numberEntry > 0){
    percentageEntry = numberEntry / 100;
  }
  entry.splice(0, entry.length, percentageEntry);
  $('.output').text(percentageEntry);
}





//binary operators: you need one number on each side

//uniary operator toggles positivity or negativity of number


//
// console.log(parenthesisSolve(mathExpression));
// // '2+2'
// function evaluateCompoundExpression(expression){
//   var exponentRegex = /([\d.]+)(\^)([\d.]+)/;
//   var multDivRegex = /([\d.]+)([*/])([\d.]+)/;
//   var addSubtRegex = /([\d.]+)([-+])([\d.]+)/;
//   var regexes = [exponentRegex, multDivRegex, addSubtRegex];
//   regexes.forEach(function(regex){
//     while (regex.test(expression)){
//       var match = expression.match(regex);
//       var result = evaluateBinaryOperation(match);
//       expression = expression.replace(match[0], result);
//     }
//   });
//   return parseFloat(expression);
// }
//
// function evaluateBinaryOperation(binOpMatch){
//   var num1 = parseFloat(binOpMatch[1]);
//   var num2 = parseFloat(binOpMatch[3]);
//   var op = binOpMatch[2];
//   var result;
//   switch(op){
//     case '+': result = num1 + num2; break;
//     case '-': result = num1 - num2; break;
//     case '*': result = num1 * num2; break;
//     case '/': result = num1 / num2; break;
//     case '^': result = Math.pow(num1, num2);
//   }
//   return result;
// }
