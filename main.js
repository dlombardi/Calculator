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
  console.log(entry);
}

function operatorClick(){
  var numberEntry = entry.join("");
  masterEquation.push(numberEntry);

  var operator = $(this).text();
  operatorArray.push(operator);
  entry = [];

  if(operatorArray.length === 2){
    refreshValue();
    $('.output').text(round(masterEquation[0], 4));

  }
  console.log(operatorArray);
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
  $('.output').text(round(masterEquation[0], 4));
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
}

function percentage(){
  var numberEntry = parseFloat(entry.join(""));
  var percentageEntry;
  var masterEquationPercentageEntry;
  if(masterEquation.length && operatorArray.length === 0){
    if (masterEquation[0] > 0){
      masterEquationPercentageEntry = round((masterEquation[0] / 100), 10);
    }
    masterEquation.splice(0, masterEquation.length, round(masterEquationPercentageEntry, 12));
    $('.output').text(masterEquationPercentageEntry);
  } else {
    if (numberEntry > 0){
      percentageEntry = round((numberEntry / 100), 10);
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

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// viosian ed1nburgh
