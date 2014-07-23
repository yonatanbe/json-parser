/**
 * Created by Yonatan_Bentzur on 7/20/14.
 */
describe("JSON parser Tests", function() {
    var jsonParser;

    beforeEach(function() {
        jsonParser = new JsonParser();
    });

    it("tests empty JSON parsing", function() {
        var jsonObj = jsonParser.parse("{}");
        expect(jsonObj).toEqual({});
    });

    it("tests JSON simple number 3 parsing", function() {
        var jsonObj = jsonParser.parse("{\"  a   \":  3  }");
        expect(jsonObj).toEqual({'a':3});
    });

    it("tests JSON simple number 4 parsing", function() {
        var jsonObj = jsonParser.parse("{\"a\":4}");
        expect(jsonObj).toEqual({'a':4});
    });

    it("tests JSON simple string parsing", function() {
        var jsonObj = jsonParser.parse("{\"a\":\"abc\"}");
        expect(jsonObj).toEqual({"a":"abc"});
    });

    it("tests JSON simple false boolean parsing", function() {
        var jsonObj = jsonParser.parse("{\"a\":    false    }");
        expect(jsonObj).toEqual({"a": false});
    });

    it("tests JSON simple true boolean parsing", function() {
        var jsonObj = jsonParser.parse("{\"b\":    true    }");
        expect(jsonObj).toEqual({"b": true});
    });

    it("tests JSON empty array parsing", function() {
        var jsonObj = jsonParser.parse("{\"b\": []  }");
        expect(jsonObj).toEqual({"b": []});
    });

    it("tests JSON simple one number array parsing", function() {
        var jsonObj = jsonParser.parse("{\"b\": [1]  }");
        expect(jsonObj).toEqual({"b": [1]});
    });

    it("tests JSON simple 2 numbers array parsing", function() {
        var jsonObj = jsonParser.parse("{\"b\": [1, 2]  }");
        expect(jsonObj).toEqual({"b": [1, 2]});
    });

    it("tests JSON simple string, number and boolean array parsing", function() {
        var jsonObj = jsonParser.parse('{"b": ["abcde", 2, false]  }');
        expect(jsonObj).toEqual({"b": ['abcde', 2, false]});
    });

    it("tests JSON 2 pairs parsing", function() {
        var jsonObj = jsonParser.parse('{"a": 2   , "b"  : true   }');
        expect(jsonObj).toEqual({"a": 2, "b": true});
    });

    it("tests JSON 2 pairs with 1 array value parsing", function() {
        var jsonObj = jsonParser.parse('{"a": [2,true]   , "b"  : true   }');
        expect(jsonObj).toEqual({"a": [2,true], "b": true});
    });

    it("tests JSON - empty JSON object parsing", function() {
        var jsonObj = jsonParser.parse('{"a": {} }');
        expect(jsonObj).toEqual({"a": {}});
    });

    it("tests JSON - simple nested JSON object parsing", function() {
        var jsonObj = jsonParser.parse('{"a": {"b" : "abc"} }');
        expect(jsonObj).toEqual({"a": {"b": "abc"}});
    });

    it("tests JSON - simple JSON object parsing", function() {
        var jsonObj = jsonParser.parse('{"a": [1, ["abc"]] }');
        expect(jsonObj).toEqual({"a": [1, ["abc"]]});
    });

});