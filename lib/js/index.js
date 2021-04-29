const apiPath = "http://localhost:8000/";
let api = {
    get: async (url) => {
        const response = await self.window.fetch(`${apiPath}${url}`);
        return response.json();
    },

    post: async (url, body) => {
        const response = await self.window.fetch(`${apiPath}${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }
}


$(async () => {
    const creditId = 1;
    const credit = await api.get(`credit/${creditId}`);
    const payments = await api.get(`credit/${creditId}/payments`);
    const modes = {
        Actions: "Actions",
        NewPayment: "NewPayment",
    }
    let newPayment = () => {
        let self = {
            id: ko.observable(0),
            creditId: ko.observable(creditId),
            number: ko.observable(0),
            isPaymentOnTime: ko.observable(true),
            isViaPayrol: ko.observable(true),
            documentId: ko.observable(0),
            comments: ko.observable(""),
            amount: ko.observable(0),
            inputDate: ko.observable(secondsToDateStr())
        };

        self.paymentDate = ko.pureComputed(() => {
            return dateStrToSeconds(self.inputDate())
        }, self);
        return self;
    };
    let dateStrToSeconds = (strVal) => {
        //YYYY-MM-DD
        strVal = strVal || "";
        let parts = strVal.split("-");
        let date = parts.length !== 3 ?
            Date.now() :
            new Date(
                parseInt(parts[0]),      // YYYY
                parseInt(parts[1]) - 1,  // MM                
                parseInt(parts[2])       // DD
            );
        let seconds = Math.floor(date / 1000);
        return seconds;
    }
    let secondsToDateStr = (seconds) => {
        //YYYY-MM-DD
        seconds = seconds || Math.floor(Date.now() / 1000);;
        let date = new Date(seconds * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dateStr = `${year}-${month <= 9 ? "0" : ""}${month}-${day}`;
        return dateStr;
    }

    let mapPayments = (payments) => {
        return payments.map(p => {
            let it = newPayment();
            it.id(p.id);
            it.creditId(p.creditId);
            it.number(p.number);
            it.isPaymentOnTime(p.isPaymentOnTime);
            it.isViaPayrol(p.isViaPayrol);
            it.documentId(p.documentId);
            it.comments(p.comments);
            it.inputDate(secondsToDateStr(p.paymentDate));
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
            let payment = self.editingPayment();
            let data = ko.toJS(payment);
            await api.post("payment", data);
            console.dir(data);
            self.payments.push(payment);
            self.mode(modes.Actions);
            self.editingPayment(newPayment());
        }
    };

    model.payments(mapPayments(payments));
    model.editingPayment(newPayment());

    ko.applyBindings(model, document.getElementById("main"));
});

