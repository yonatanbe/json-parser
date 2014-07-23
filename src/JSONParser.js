/**
 * Created by Yonatan_Bentzur on 7/20/14.
 */
"use strict";

var pairDelimiter = ':';

function JsonParser() {

}

JsonParser.prototype.parse = function (input) {
    var tree = {};
    var content = getJsonObjContent(input);
    var firstSplitContentToPairs = content && content.split(",");
    var splitContentToPairs = splitToValidPairs(firstSplitContentToPairs);
    _.forEach(splitContentToPairs, function (item) {
        if(!isEmptyPair(item)){
            tree[getKey(item)] = evalValue(getValue(item));
        }
    });
    return tree;
};


function splitToValidPairs(arrayToFix) {
    var foldedString = '';
    var ans = [];
    for(var i = 0; i < arrayToFix.length; i++){
        if (!isValidPair(arrayToFix[i])) {
            do{
                foldedString !== '' ?
                    (foldedString += (', '+arrayToFix[i])) : foldedString += arrayToFix[i];
            } while(!isFoldEnd(arrayToFix[i++]));
            i--;
            arrayToFix[i] = foldedString;
            foldedString = '';
        }
        ans.push(arrayToFix[i]);
    }
    return ans;
}

function getJsonObjContent(input) {
    return (input.slice(input.indexOf('{')+1, input.lastIndexOf('}'))).trim();
}


function getKey(input) {
    var key = (input.slice(0, input.indexOf(pairDelimiter))).trim();
    return key.slice(key.indexOf('"')+1, key.lastIndexOf('"')).trim();
}


function getValue(input) {
    return (input.slice(input.indexOf(pairDelimiter)+1)).trim();
}


function isEmptyPair(pair) {
    return pair === "";
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

function isJsonObject(value) {
    return value.trim().indexOf("{") == 0;
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
    else if(isJsonObject(value)) {
        ans = new JsonParser().parse(value);
    }
    return ans;
}

function parseArray(value) {
    var array = [];
    var unwrappedArray = removeWrappingFromString(value.trim());
    var splitArray = unwrappedArray && unwrappedArray.split(',');
    splitArray = splitToValidPairs(splitArray);
    _.forEach(splitArray, function (item) {
        array.push(evalValue(item));
    });
    return array;
}

function isValidPair(item) {
    return !isStartOrEndOfFold(item, ['[', '{']);
}

function isFoldEnd(item) {
    return isStartOrEndOfFold(item, [']', '}']);
}

function isStartOrEndOfFold(item, charArray) {
    return _.any(charArray, function (char) {
        return item.indexOf(char) !== -1;
    });
}