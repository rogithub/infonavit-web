const apiPath = "http://localhost:8000/";
let api = {
    get: async (url) => {
        return await $.get(`${apiPath}${url}`);
    }
}


$(async () => {
    const credit = await api.get("credit/1");

    let model = {
        credit
    };

    ko.applyBindings(model, document.getElementById("main"));
});

