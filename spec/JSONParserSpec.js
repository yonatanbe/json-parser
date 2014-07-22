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

    it("tests JSON number 3 parsing", function() {
        var jsonObj = jsonParser.parse("{\"  a   \":  3  }");
        expect(jsonObj).toEqual({'a':3});
    });

    it("tests JSON number 4 parsing", function() {
        var jsonObj = jsonParser.parse("{\"a\":4}");
        expect(jsonObj).toEqual({'a':4});
    });

});