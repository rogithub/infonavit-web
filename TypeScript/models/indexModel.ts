import { Credit, Payment } from './interfaces';
import { ObjectLiteral } from '../shared/objectLiteral';
import { PaymentModel } from './paymentModel';
import { Api } from '../shared/api';

export const modes: ObjectLiteral = {
    Actions: "Actions",
    NewPayment: "NewPayment",
};

export class IndexModel {
    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public api: Api;
    public mode: KnockoutObservable<string>;
    public credit: Credit;
    public payments: KnockoutObservableArray<PaymentModel>;
    public editingPayment: KnockoutObservable<PaymentModel>;

    constructor($: JQueryStatic, ko: KnockoutStatic, api: Api, credit: Credit) {
        const self = this;
        self.$ = $;
        self.ko = ko;
        self.api = api;

        self.mode = ko.observable<string>(modes.Actions);
        self.credit = credit;
        self.payments = ko.observableArray<PaymentModel>([]);

        self.editingPayment = ko.observable<PaymentModel>();
        self.newEditingModel();
    }

    newEditingModel = () => {
        const self = this;
        let em = new PaymentModel(self.$, self.ko);
        em.creditId(self.credit.id);
        self.editingPayment(em);
    }

    load = (payments: Payment[]) => {
        const self = this;
        let items = payments.map(p => {
            let it = new PaymentModel(self.$, self.ko);
            it.id(p.id);
            it.creditId(p.creditId);
            it.number(p.number);
            it.isPaymentOnTime(p.isPaymentOnTime);
            it.isViaPayrol(p.isViaPayrol);
            it.documentId(p.documentId);
            it.comments(p.comments);
            it.inputDate(it.secondsToDateStr(p.paymentDate));
            it.amount(p.amount);
            return it;
        });
        self.payments(items)
    };

    savePayment = async () => {
        const self = this;
        let payment = self.editingPayment();
        await self.api.post("payment", payment.toInterface());
        self.payments.push(payment);
        self.mode(modes.Actions);
        self.newEditingModel();
    }
}