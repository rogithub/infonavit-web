/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 486:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndexModel = exports.modes = void 0;
var paymentModel_1 = __webpack_require__(289);
exports.modes = {
    Actions: "Actions",
    NewPayment: "NewPayment",
};
var IndexModel = /** @class */ (function () {
    function IndexModel($, ko, api, credit) {
        var _this = this;
        this.newEditingModel = function () {
            var self = _this;
            var em = new paymentModel_1.PaymentModel(self.$, self.ko);
            em.creditId(self.credit.id);
            self.editingPayment(em);
        };
        this.load = function (payments) {
            var self = _this;
            var items = payments.map(function (p) {
                var it = new paymentModel_1.PaymentModel(self.$, self.ko);
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
            self.payments(items);
        };
        this.savePayment = function () { return __awaiter(_this, void 0, void 0, function () {
            var self, payment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        payment = self.editingPayment();
                        return [4 /*yield*/, self.api.post("payment", payment.toInterface())];
                    case 1:
                        _a.sent();
                        self.payments.push(payment);
                        self.mode(exports.modes.Actions);
                        self.newEditingModel();
                        return [2 /*return*/];
                }
            });
        }); };
        var self = this;
        self.$ = $;
        self.ko = ko;
        self.api = api;
        self.mode = ko.observable(exports.modes.Actions);
        self.credit = credit;
        self.payments = ko.observableArray([]);
        self.editingPayment = ko.observable();
        self.newEditingModel();
    }
    return IndexModel;
}());
exports.IndexModel = IndexModel;


/***/ }),

/***/ 289:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentModel = void 0;
var PaymentModel = /** @class */ (function () {
    function PaymentModel($, ko) {
        var _this = this;
        this.dateStrToSeconds = function (strVal) {
            if (strVal === void 0) { strVal = ""; }
            //YYYY-MM-DD
            var parts = strVal.split("-");
            var date = parts.length !== 3 ?
                Date.now() :
                new Date(parseInt(parts[0]), // YYYY
                parseInt(parts[1]) - 1, // MM                
                parseInt(parts[2]) // DD
                );
            var seconds = Math.floor(+date / 1000);
            return seconds;
        };
        this.secondsToDateStr = function (seconds) {
            if (seconds === void 0) { seconds = Math.floor(Date.now() / 1000); }
            //YYYY-MM-DD
            var date = new Date(seconds * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var dateStr = year + "-" + (month <= 9 ? "0" : "") + month + "-" + day;
            return dateStr;
        };
        this.toInterface = function () {
            var self = _this;
            return {
                amount: parseFloat(self.amount().toString()),
                comments: self.comments(),
                creditId: self.creditId(),
                documentId: self.documentId(),
                id: self.id(),
                isPaymentOnTime: self.isPaymentOnTime(),
                isViaPayrol: self.isViaPayrol(),
                number: self.number(),
                paymentDate: self.paymentDate()
            };
        };
        var self = this;
        self.$ = $;
        self.ko = ko;
        self.id = ko.observable(0);
        self.creditId = ko.observable(0);
        self.number = ko.observable(0);
        self.isPaymentOnTime = ko.observable(false);
        self.isViaPayrol = ko.observable(false);
        self.documentId = ko.observable(0);
        self.comments = ko.observable("");
        self.amount = ko.observable(0);
        self.inputDate = ko.observable();
        self.paymentDate = ko.pureComputed(function () {
            return self.dateStrToSeconds(self.inputDate());
        }, self);
    }
    return PaymentModel;
}());
exports.PaymentModel = PaymentModel;


/***/ }),

/***/ 18:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var jsonReq_1 = __webpack_require__(411);
var indexModel_1 = __webpack_require__(486);
$(function () { return __awaiter(void 0, void 0, void 0, function () {
    var apiPath, api, creditId, credit, payments, model;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiPath = "http://localhost:8000/";
                api = new jsonReq_1.JsonReq(apiPath, window);
                creditId = 1;
                return [4 /*yield*/, api.get("credit/" + creditId)];
            case 1:
                credit = _a.sent();
                return [4 /*yield*/, api.get("credit/" + creditId + "/payments")];
            case 2:
                payments = _a.sent();
                model = new indexModel_1.IndexModel($, ko, api, credit);
                model.load(payments);
                ko.applyBindings(model, document.getElementById("main"));
                return [2 /*return*/];
        }
    });
}); });


/***/ }),

/***/ 411:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonReq = void 0;
var JsonReq = /** @class */ (function () {
    function JsonReq(baseUrl, window) {
        var _this = this;
        this.toFullUrl = function (url) { return "" + _this.baseURL + url; };
        this.get = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        }); };
        this.post = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.put = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'PUT',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.patch = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'PATCH',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.del = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var self, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.window.fetch(self.toFullUrl(url), {
                                method: 'DELETE',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.baseURL = baseUrl;
        this.window = window;
    }
    return JsonReq;
}());
exports.JsonReq = JsonReq;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(18);
/******/ 	
/******/ })()
;