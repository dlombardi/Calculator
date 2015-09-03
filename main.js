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
  if(numberEntry.length > 12){
    $('.output').text();
  } else {
    $('.output').text(numberEntry);
  }
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

function clear(){
  operatorArray = [];
  masterEquation = [];
  entry = [];
  $('.output').empty();
}

function equalClick(){
  var numberEntry = entry.join("");
  masterEquation.splice(1, 1, numberEntry);
  refreshValue();
  $('.output').text(masterEquation[0].toString().substring(0, 14));
}

function negativePositiveSwitch(){
  var numberEntry = parseFloat(entry.join(""));
  var flippedEntry;
  var masterNumber = masterEquation[0];
  var flippedMasterNumber;

  if(masterEquation.length && operatorArray.length === 0){
    if(masterNumber > 0){
      flippedMasterNumber = masterNumber * -1;
    } else {
      flippedMasterNumber = Math.abs(masterNumber);
    }
    masterEquation.splice(0, masterEquation.length, flippedMasterNumber);
    $('.output').text(flippedMasterNumber);
  } else {
    if(numberEntry > 0 ){
      flippedEntry = numberEntry * -1;
    } else {
      flippedEntry = Math.abs(numberEntry);
    }
    entry.splice(0, entry.length, flippedEntry);
    $('.output').text(flippedEntry);
  }
  console.log(operatorArray);
  console.log(masterEquation);
  console.log(entry);
}

function percentage(){
  var numberEntry = parseFloat(entry.join(""));
  var percentageEntry;
  var masterEquationPercentageEntry;
  if(masterEquation.length && operatorArray.length === 0){
    if (masterEquation[0] > 0){
      masterEquationPercentageEntry = masterEquation[0] / 100;
    }
    masterEquation.splice(0, masterEquation.length, masterEquationPercentageEntry);
    $('.output').text(masterEquationPercentageEntry);
    console.log(masterEquation);
  } else {
    if (numberEntry > 0){
      percentageEntry = numberEntry / 100;
    }
    entry.splice(0, entry.length, percentageEntry);
    $('.output').text(percentageEntry);
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
