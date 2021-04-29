import { JsonReq } from '../services/jsonReq';
import { Credit, Payment } from '../models/interfaces';
import { IndexModel } from '../models/indexModel';
import { PaymentModel } from '../models/paymentModel';

$(async () => {
    const apiPath = "http://localhost:8000/";
    let api = new JsonReq(apiPath, window);
    const creditId = 1;
    const credit = await api.get<Credit>(`credit/${creditId}`);
    const payments = await api.get<Payment[]>(`credit/${creditId}/payments`);

    let model = new IndexModel($, ko, api, credit);
    model.load(payments);

    ko.applyBindings(model, document.getElementById("main"));
});