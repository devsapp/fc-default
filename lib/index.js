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
                        yamlData["web-framework"] = process.env['s-default-web-framework'] || process.env['s_default_web_framework'] || yamlData["web-framework"];
                        yamlData["deploy-type"] = process.env['s-default-deploy-type'] || process.env['s_default_deploy_type'] || yamlData["deploy-type"];
                        yamlData['fc-endpoint'] = process.env['s-default-fc-endpoint'] || process.env['s_default_fc_endpoint'] || yamlData['fc-endpoint'];
                        yamlData['enable-fc-endpoint'] = process.env['s-default-enable-fc-endpoint'] || process.env['s_default_enable_fc_endpoint'] || yamlData['enable-fc-endpoint'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBR3BDLElBQUEsS0FJRixPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFIaEMsSUFBSSxVQUFBLEVBQ0osWUFBWSxrQkFBQSxFQUNaLGVBQWUscUJBQ2lCLENBQUE7QUFDcEMsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVoQyxJQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFBO0FBRXpFO0lBQTJDLGlDQUFhO0lBQ3BELHVCQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVhLHlDQUFpQixHQUEvQjs7Ozs7Ozt3QkFHbUIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUE1RSxRQUFRLEdBQUcsU0FBaUUsQ0FBQTs7Ozt3QkFFNUUsUUFBUSxHQUFHLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLENBQUE7Ozt3QkFFN0QsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO3dCQUN6SSxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLE9BQU8sQ0FB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