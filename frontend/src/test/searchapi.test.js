const axios = require('axios');

test('search API returns expected results', async () => {
    const searchTerm = 'abequose';
    const response = await axios.get("http://103.82.24.40:5000/search_bar", {
        params: { word: searchTerm, lang: "en" },
    });
    const results = (response.data)[0]["en"];

    expect(results).toContain(searchTerm);
});