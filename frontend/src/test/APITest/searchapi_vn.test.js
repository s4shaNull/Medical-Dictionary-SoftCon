const axios = require("axios");

test("search API returns expected results", async () => {
  const searchTerm = "abequose";
  const response = await axios.get(
    "http://meddict-vinuni.com:5000/search_bar",
    {
      params: { word: searchTerm, lang: "vn" },
    }
  );
  const results = response.data[0]["en"];

  expect(results).toContain(searchTerm);
});
