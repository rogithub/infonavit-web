import { Payment } from "./interfaces";

export class PaymentModel {
    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public id: KnockoutObservable<number>;
    public creditId: KnockoutObservable<number>;
    public number: KnockoutObservable<number>;
    public isPaymentOnTime: KnockoutObservable<boolean>;
    public isViaPayrol: KnockoutObservable<boolean>;
    public documentId: KnockoutObservable<number>;
    public comments: KnockoutObservable<string>;
    public amount: KnockoutObservable<number>;
    public inputDate: KnockoutObservable<string>;
    public paymentDate: KnockoutComputed<number>;

    constructor($: JQueryStatic, ko: KnockoutStatic) {
        const self = this;
        self.$ = $;
        self.ko = ko;

        self.id = ko.observable<number>(0);
        self.creditId = ko.observable<number>(0);
        self.number = ko.observable<number>(0);
        self.isPaymentOnTime = ko.observable<boolean>(false);
        self.isViaPayrol = ko.observable<boolean>(false);
        self.documentId = ko.observable<number>(0);
        self.comments = ko.observable<string>("");
        self.amount = ko.observable<number>(0);
        self.inputDate = ko.observable<string>();

        self.paymentDate = ko.pureComputed<number>(() => {
            return self.dateStrToSeconds(self.inputDate())
        }, self);
    }

    dateStrToSeconds = (strVal: string = "") => {
        //YYYY-MM-DD
        let parts = strVal.split("-");
        let date = parts.length !== 3 ?
            Date.now() :
            new Date(
                parseInt(parts[0]),      // YYYY
                parseInt(parts[1]) - 1,  // MM                
                parseInt(parts[2])       // DD
            );
        let seconds = Math.floor(+date / 1000);
        return seconds;
    };

    secondsToDateStr = (seconds: number = Math.floor(Date.now() / 1000)) => {
        //YYYY-MM-DD
        let date = new Date(seconds * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dateStr = `${year}-${month <= 9 ? "0" : ""}${month}-${day}`;
        return dateStr;
    }

    toInterface = (): Payment => {
        const self = this;
        return {
            amount: parseFloat(self.amount().toString()), // do this for bound fields input:text converts value into string
            comments: self.comments(),
            creditId: self.creditId(),
            documentId: self.documentId(),
            id: self.id(),
            isPaymentOnTime: self.isPaymentOnTime(),
            isViaPayrol: self.isViaPayrol(),
            number: self.number(),
            paymentDate: self.paymentDate()
        };
    }
}