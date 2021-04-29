const apiPath = "http://localhost:8000/";
let api = {
    get: async (url) => {
        return await $.get(`${apiPath}${url}`);
    },

    post: async (url, data) => {
        return await $.ajax({
            type: "POST",
            url: `${apiPath}${url}`,
            data: data,
            dataType: "json",
            contentType: "multipart/form-data"
          });
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
    let newPayment = () => {
        return {
            id: ko.observable(0),
            creditId: ko.observable(creditId),                    
            number: ko.observable(0),
            isPaymentOnTime: ko.observable(true),
            isViaPayrol: ko.observable(true),
            documentId: ko.observable(),
            comments: ko.observable(),
            paymentDate: ko.observable(),
            amount: ko.observable()
        };            
    };

    let mapPayments = (payments) => {            
        let arr = [];
        return payments.map(p => {
            let it = newPayment();
            it.id(p.id);
            it.creditId(p.creditId);
            it.number(p.number);
            it.isPaymentOnTime(p.isPaymentOnTime);
            it.isViaPayrol(p.isViaPayrol);
            it.documentId(p.documentId);
            it.comments(p.comments);
            it.paymentDate(p.paymentDate);
            it.amount(p.amount);
            return it;
        });        
    };

    let model = {
        mode: ko.observable(modes.Actions),
        credit,
        payments: ko.observableArray(),
        editingPayment: ko.observable(),        
        savePayment: async () => {
            const self = model;
            //ko.toJSON            
            let data = ko.toJS(self.editingPayment());
            await api.post("payment", data);
        }
    };

    model.payments(mapPayments(payments));
    model.editingPayment(newPayment());

    ko.applyBindings(model, document.getElementById("main"));
});

