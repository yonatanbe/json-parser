/**
 * Created by Yonatan_Bentzur on 7/20/14.
 */
"use strict";

var pairDelimiter = ':';

function JsonParser() {

}

function isEmptyPair(pair) {
    return pair !== "";
}

JsonParser.prototype.parse = function (input) {
    var tree = {};
    var pair = getPair(input);
    if(isEmptyPair(pair)){
        var key = getKey(pair);
        var value = getValue(pair);
        tree[key] = evalValue(value);
    }
    return tree;
};

function getPair(input) {
    return (input.slice(input.indexOf('{')+1, input.indexOf('}'))).trim();
}


function getKey(input) {
    var key = (input.slice(0, input.indexOf(pairDelimiter))).trim();
    return key.slice(key.indexOf('"')+1, key.lastIndexOf('"')).trim();
}


function getValue(input) {
    return (input.slice(input.indexOf(pairDelimiter)+1)).trim();
}


function isNumeric(input) {
    return !isNaN(input);
}

function isTypeBoolean(value) {
    var afterTrim = value.trim();
    return (afterTrim == 'true' || afterTrim == 'false');
}

function isStringTrue(value) {
    return value.trim() === 'true';
}

function isTypeString(value) {
    return value.trim().indexOf("\"") == 0;
}

function isTypeArray(value) {
    return value.trim().indexOf("[") == 0;
}

function removeWrappingFromString(input) {
    return input.slice(1, input.length-1);
}

function evalValue(value) {
    var ans;
    if (isNumeric(value)) {
        ans = Number(value);
    }
    else if (isTypeBoolean(value)) {
        ans = isStringTrue(value);
    }
    else if (isTypeString(value)) {
        ans = removeWrappingFromString(value);
    }
    else if (isTypeArray(value)) {
        ans = parseArray(value);
    }
    return ans;
}

function parseArray(value) {
    var array = [];
    var unwrappedArray = removeWrappingFromString(value).trim();
    var splitArray = unwrappedArray && unwrappedArray.split(',');
    _.forEach(splitArray, function (item) {
        array.push(evalValue(item));
    });
    return array;
}
