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

});