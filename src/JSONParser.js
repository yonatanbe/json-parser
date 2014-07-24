/**
 * Created by Yonatan_Bentzur on 7/20/14.
 */
"use strict";

var pairDelimiter = ':';

function JsonParser() {

    function parse(input) {
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
            ans = removeWrappingFromString(value, ['"', '"']);
        }
        else if (isTypeArray(value)) {
            ans = parseArray(value);
        }
        else if(isJsonObject(value)) {
            ans = new JsonParser().parse(value);
        }
        return ans;
    }


    function splitToValidPairs(arrayToFix) {
        var foldedString = '';
        var ans = [];
        var numOfBraces = 0;
        for(var i = 0; i < arrayToFix.length; i++){
            if (!isValidPair(arrayToFix[i])) {
                do{
                    numOfBraces += getNumOfCharsInString(arrayToFix[i], ['[', '{']);
                    foldedString !== '' ?
                        (foldedString += (', '+arrayToFix[i])) : foldedString += arrayToFix[i];
                    numOfBraces -= getNumOfCharsInString(arrayToFix[i++], [']', '}']);
                } while(numOfBraces !== 0);
                i--;
                arrayToFix[i] = foldedString;
                foldedString = '';
            }
            ans.push(arrayToFix[i]);
        }
        return ans;
    }

    function getNumOfCharsInString(stringToCheck, arrayOfChars) {
        var ans = 0;
        _.forEach(arrayOfChars, function (char) {
            ans += (stringToCheck.split(char).length) - 1;
        });
        return ans;
    }


    function getJsonObjContent(input) {
        return removeWrappingFromString(input, ["{", "}"]).trim();
    }

    function getKey(input) {
        var key = (input.slice(0, input.indexOf(pairDelimiter))).trim();
        return removeWrappingFromString(key, ['"','"']);
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

    function getIndexOfChar(string, char) {
        return string.trim().indexOf(char);
    }

    function isTypeString(value) {
        return getIndexOfChar(value, '"') == 0;
    }

    function isTypeArray(value) {
        return getIndexOfChar(value, '[') == 0;
    }

    function isJsonObject(value) {
        return getIndexOfChar(value, '{') == 0;
    }

    function removeWrappingFromString(input, wrappingChars) {
        return input.slice(input.indexOf(wrappingChars[0])+1, input.lastIndexOf(wrappingChars[1])).trim();
    }

    function parseArray(value) {
        var array = [];
        var unwrappedArray = removeWrappingFromString(value, ['[', ']']);
        var splitArray = unwrappedArray && unwrappedArray.split(',');
        splitArray = splitToValidPairs(splitArray);
        _.forEach(splitArray, function (item) {
            array.push(evalValue(item));
        });
        return array;
    }

    function isValidPair(item) {
        return !isStartOfFold(item, ['[', '{']);
    }

    function isStartOfFold(item, charArray) {
        return _.any(charArray, function (char) {
            return item.indexOf(char) !== -1;
        });
    }

    return {
        parse: parse
    }
}