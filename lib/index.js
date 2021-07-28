"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./common/base"));
var _a = require('@serverless-devs/core'), help = _a.help, commandParse = _a.commandParse, reportComponent = _a.reportComponent;
var fs = require('fs');
var yaml = require('js-yaml');
var defaultConfigFileObject = process.env.HOME + '/.s/.fc.default.yaml';
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.getConfigFromFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var yamlData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, yaml.load(fs.readFileSync(defaultConfigFileObject, 'utf8'))];
                    case 1:
                        yamlData = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        yamlData = { "web-framework": "nas", "deploy-type": "sdk" };
                        return [3 /*break*/, 3];
                    case 3:
                        yamlData["web-framework"] = process.env['s-default-web-framework'] || yamlData["web-framework"];
                        yamlData["deploy-type"] = process.env['s-default-deploy-type'] || yamlData["deploy-type"];
                        yamlData['fc-endpoint'] = process.env['s-default-fc-endpoint'] || yamlData['fc-endpoint'];
                        yamlData['enable-fc-endpoint'] = process.env['s-default-enable-fc-endpoint'] || yamlData['enable-fc-endpoint'];
                        return [2 /*return*/, yamlData];
                }
            });
        });
    };
    ComponentDemo.prototype.writeToFile = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConfigFromFile()];
                    case 1:
                        config = _a.sent();
                        config[key] = value;
                        return [4 /*yield*/, fs.writeFileSync(defaultConfigFileObject, yaml.dump(config))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * 设置阿里云函数计算的默认值
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.set = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reportComponent('fc-default', {
                            command: 'set',
                            uid: '',
                        });
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        comParse = commandParse({ args: inputs.args }, apts);
                        if (comParse.data && comParse.data.help) {
                            help([{
                                    header: 'Usage',
                                    content: "s cli fc-default set [type] [value]"
                                },
                                {
                                    header: 'Examples',
                                    content: [
                                        {
                                            desc: 'web-framework',
                                            example: '["nas", "container"], When deploying web framework to aliyun FC, you can select "nas" (the code is placed in NAS, and the amount of modification is minimal, but the version and alias of function calculation are not available) and "container" (some code modifications may be involved)'
                                        },
                                        {
                                            desc: 'deploy-type',
                                            example: '["sdk", "pulumi"], When deploying code to aliyun FC, you can choose "sdk" (deployment through SDK, faster speed) and "pulumi" (relatively slow speed)'
                                        },
                                        {
                                            desc: 'fc-endpoint',
                                            example: "'s cli fc-default set fc-endpoint xxx': Deploy rsource to fc with the custom endpoint."
                                        },
                                        {
                                            desc: 'enable-fc-endpoint',
                                            example: "'s cli fc-default set enable-fc-endpoint true': Enable the defined fc-endpoint by user."
                                        }
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        if (!(comParse.data && comParse.data._.length > 0)) return [3 /*break*/, 10];
                        if (!(comParse.data._[0] == "web-framework")) return [3 /*break*/, 3];
                        if (!['nas', 'container'].includes(comParse.data._[1])) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.writeToFile("web-framework", comParse.data._[1])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error("The value range is ['nas', 'container']");
                    case 3:
                        if (!(comParse.data._[0] == "deploy-type")) return [3 /*break*/, 6];
                        if (!['sdk', 'pulumi'].includes(comParse.data._[1])) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.writeToFile("deploy-type", comParse.data._[1])];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error("The value range is ['sdk', 'pulumi']");
                    case 6:
                        if (!(comParse.data._[0] === 'fc-endpoint')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.writeToFile('fc-endpoint', comParse.data._[1])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(comParse.data._[0] === 'enable-fc-endpoint')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.writeToFile('enable-fc-endpoint', comParse.data._[1])];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, this.getConfigFromFile()];
                    case 11: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 获取所配置的阿里云函数计算默认值
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var apts, args, comParse, webFramework, deployType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reportComponent('fc-default', {
                            command: 'get',
                            uid: '',
                        });
                        apts = {
                            boolean: ['help'],
                            alias: { help: 'h' },
                        };
                        args = inputs && inputs.args ? inputs.args : "";
                        comParse = commandParse({ args: args || "" }, apts);
                        if (!(comParse.data && comParse.data._.length > 0)) return [3 /*break*/, 8];
                        if (!(comParse.data._[0] == "web-framework")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getConfigFromFile()];
                    case 1:
                        webFramework = (_a.sent())["web-framework"];
                        if (!process.env['s-default-web-framework']) {
                            console.log("\uD83D\uDCCE Using web framework type: " + webFramework + ", If you want to deploy with " + (webFramework === "nas" ? "container" : "nas") + ", you can [s cli fc-default set web-framework " + (webFramework === "nas" ? "container" : "nas") + "] to switch.");
                        }
                        return [2 /*return*/, webFramework];
                    case 2:
                        if (!(comParse.data._[0] == "deploy-type")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getConfigFromFile()];
                    case 3:
                        deployType = (_a.sent())["deploy-type"];
                        if (!process.env['s-default-deploy-type']) {
                            console.log("\uD83D\uDCCE Using fc deploy type: " + deployType + ", If you want to deploy with " + (deployType === "sdk" ? "pulumi" : "sdk") + ", you can [s cli fc-default set deploy-type " + (deployType === "sdk" ? "pulumi" : "sdk") + "] to switch.");
                        }
                        return [2 /*return*/, deployType];
                    case 4:
                        if (!(comParse.data._[0] === 'fc-endpoint')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getConfigFromFile()];
                    case 5: return [2 /*return*/, (_a.sent())["fc-endpoint"]];
                    case 6:
                        if (!(comParse.data._[0] === 'enable-fc-endpoint')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getConfigFromFile()];
                    case 7: return [2 /*return*/, (_a.sent())["enable-fc-endpoint"]];
                    case 8: return [4 /*yield*/, this.getConfigFromFile()];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBR3BDLElBQUEsS0FJRixPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFIaEMsSUFBSSxVQUFBLEVBQ0osWUFBWSxrQkFBQSxFQUNaLGVBQWUscUJBQ2lCLENBQUE7QUFDcEMsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVoQyxJQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFBO0FBRXpFO0lBQTJDLGlDQUFhO0lBQ3BELHVCQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVhLHlDQUFpQixHQUEvQjs7Ozs7Ozt3QkFHbUIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUE1RSxRQUFRLEdBQUcsU0FBaUUsQ0FBQTs7Ozt3QkFFNUUsUUFBUSxHQUFHLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLENBQUE7Ozt3QkFFN0QsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUE7d0JBQy9GLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBO3dCQUN6RixRQUFRLENBQUMsYUFB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