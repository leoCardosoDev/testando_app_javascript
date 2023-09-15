const { queryString } = require("./query_string");
describe("Object to query string", () => {
  it("Should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Leo",
      profession: "developer",
    };
    expect(queryString(obj)).toBe("name=Leo&profession=developer");
  });
});
