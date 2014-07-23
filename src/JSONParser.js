/**
 * Created by Yonatan_Bentzur on 7/20/14.
 */
"use strict";

var pairDelimiter = ':';

function JsonParser() {

}

function isValidPair(item) {
    return (item.indexOf('[') === -1 && item.indexOf('{') === -1);
}

function isFoldEnd(item) {
    return (item.indexOf(']') !== -1 || item.indexOf('}') !== -1);
}

JsonParser.prototype.parse = function (input) {
    var tree = {};
    var content = getJsonObjContent(input);
    var firstSplitContentToPairs = content && content.split(",");
    var splitContentToPairs = splitToValidPairs(firstSplitContentToPairs);
    _.forEach(splitContentToPairs, function (item) {
        if(!isEmptyPair(item)){
            var key = getKey(item);
            var value = getValue(item);
            tree[key] = evalValue(value);
        }
    });
    return tree;
};


function splitToValidPairs(firstSplitContentToPairs) {
    var isDuringFold = false;
    var foldedString = "";
    var ans = [];
    _.forEach(firstSplitContentToPairs, function (item) {
        if (!isValidPair(item)) {
            if (isFoldEnd(item)) {
                ans.push(item);
            }
            else {
                isDuringFold = true;
                foldedString += item;
            }
        } else {
            if (isDuringFold) {
                foldedString += (',' + item);
                if (isFoldEnd(item)) {
                    item = foldedString.trim().slice(0, foldedString.length);
                    isDuringFold = false;
                    foldedString = "";
                    ans.push(item);
                }
            } else {
                ans.push(item);
            }
        }
    });
    return ans;
}

function getJsonObjContent(input) {
    return (input.slice(input.indexOf('{')+1, input.indexOf('}'))).trim();
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
