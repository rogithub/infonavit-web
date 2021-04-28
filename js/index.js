const apiPath = "http://localhost:8000/";
let api = {
    get: async (url) => {
        return await $.get(`${apiPath}${url}`);
    }
}


$(async () => {
    const creditId = "1";
    const credit = await api.get(`credit/${creditId}`);
    const payments = await api.get(`payments/${creditId}`);
    const modes = {
        Actions: "Actions",
        NewPayment: "NewPayment",
    }

    let model = {
        mode: ko.observable(modes.Actions),
        credit,
        payments
    };

    ko.applyBindings(model, document.getElementById("main"));
});

