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
                        console.log(e_1);
                        yamlData = { "web-framework": "nas", "deploy-type": "sdk" };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, yamlData];
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
                        reportComponent('express', {
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
                                }, {
                                    header: 'Examples',
                                    content: [
                                        {
                                            desc: 'web-framework',
                                            example: '["nas", "container"], When deploying web framework to aliyun FC, you can select "nas" (the code is placed in NAS, and the amount of modification is minimal, but the version and alias of function calculation are not available) and "container" (some code modifications may be involved)'
                                        },
                                        {
                                            desc: 'deploy-type',
                                            example: '["sdk", "pulumi"], When deploying code to aliyun FC, you can choose "sdk" (deployment through SDK, faster speed) and "pulumi" (relatively slow speed)'
                                        }
                                    ],
                                },]);
                            return [2 /*return*/];
                        }
                        if (!(comParse.data && comParse.data._.length > 0)) return [3 /*break*/, 3];
                        if (comParse.data._[0] == "web-framework") {
                            if (['nas', 'container'].includes(comParse.data._[1])) {
                                this.writeToFile("web-framework", comParse.data._[1]);
                            }
                            else {
                                throw new Error("The value range is ['nas', 'container']");
                            }
                        }
                        if (!(comParse.data._[0] == "deploy-type")) return [3 /*break*/, 3];
                        if (!['sdk', 'pulumi'].includes(comParse.data._[1])) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.writeToFile("deploy-type", comParse.data._[1])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error("The value range is ['sdk', 'pulumi']");
                    case 3: return [4 /*yield*/, this.getConfigFromFile()];
                    case 4: return [2 /*return*/, _a.sent()];
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
            return __generator(this, function (_a) {
                reportComponent('express', {
                    command: 'get',
                    uid: '',
                });
                return [2 /*return*/, this.getConfigFromFile()];
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBR3BDLElBQUEsS0FJRixPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFIaEMsSUFBSSxVQUFBLEVBQ0osWUFBWSxrQkFBQSxFQUNaLGVBQWUscUJBQ2lCLENBQUE7QUFDcEMsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVoQyxJQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFBO0FBRXpFO0lBQTJDLGlDQUFhO0lBQ3BELHVCQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVhLHlDQUFpQixHQUEvQjs7Ozs7Ozt3QkFHbUIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUE1RSxRQUFRLEdBQUcsU0FBaUUsQ0FBQTs7Ozt3QkFFNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQTt3QkFDZCxRQUFRLEdBQUcsRUFBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUMsQ0FBQTs7NEJBRTdELHNCQUFPLFFBQVEsRUFBQTs7OztLQUNsQjtJQUVhLG1DQUFXLEdBQXpCLFVBQTBCLEdBQVcsRUFBRSxLQUFhOzs7Ozs0QkFDakMscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUE7O3dCQUF2QyxNQUFNLEdBQUcsU0FBOEI7d0JBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FB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