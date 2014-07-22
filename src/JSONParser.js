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
        tree[key] = Number(value);
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