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
var defaultConfigFilePath = '~/.s/.default/.fc.default';
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.getConfigFromFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, yaml.safeLoad(fs.readFileSync(defaultConfigFilePath, 'utf8'))];
                }
                catch (e) {
                    return [2 /*return*/, { "web-framework": "nas", "deploy-type": "sdk" }];
                }
                return [2 /*return*/];
            });
        });
    };
    ComponentDemo.prototype.writeToFile = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                config = this.getConfigFromFile();
                config[key] = value;
                fs.writeFileSync(defaultConfigFilePath, yaml.safeDump(config), 'utf8');
                return [2 /*return*/, true];
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
                reportComponent('express', {
                    command: 'set',
                    uid: '',
                });
                apts = {
                    boolean: ['help'],
                    alias: { help: 'h' },
                };
                console.log(inputs);
                comParse = commandParse({ args: inputs.args }, apts);
                console.log(comParse);
                if (comParse.data && comParse.data.help) {
                    help([{
                            header: 'Usage',
                            content: "s cli fc-default set [type] [value]"
                        }, {
                            header: 'Examples',
                            optionList: [
                                {
                                    desc: 'web-framework',
                                    example: 'When deploying web framework to aliyun FC, you can select "nas" (the code is placed in NAS, and the amount of modification is minimal, but the version and alias of function calculation are not available) and "container" (some code modifications may be involved)'
                                },
                                {
                                    desc: 'deploy-type',
                                    example: 'When deploying code to aliyun FC, you can choose "sdk" (deployment through SDK, faster speed) and "pulumi" (relatively slow speed)'
                                }
                            ],
                        },]);
                    return [2 /*return*/];
                }
                if (comParse.data._.length > 0) {
                    if (comParse.data._[0] == "web-framework") {
                        if (['nas', 'container'].includes(comParse.data._[1])) {
                            this.writeToFile("web-framework", comParse.data._[1]);
                        }
                        else {
                            throw new Error("The value range is ['nas', 'container']");
                        }
                    }
                    if (comParse.data._[0] == "deploy-type") {
                        if (['sdk', 'pulumi'].includes(comParse.data._[1])) {
                            this.writeToFile("deploy-type", comParse.data._[1]);
                        }
                        else {
                            throw new Error("The value range is ['sdk', 'pulumi']");
                        }
                    }
                }
                console.log("--s-ad-sa-das");
                return [2 /*return*/, this.getConfigFromFile()];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTBDO0FBR3BDLElBQUEsS0FJRixPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFIaEMsSUFBSSxVQUFBLEVBQ0osWUFBWSxrQkFBQSxFQUNaLGVBQWUscUJBQ2lCLENBQUE7QUFDcEMsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVoQyxJQUFNLHFCQUFxQixHQUFHLDJCQUEyQixDQUFBO0FBRXpEO0lBQTJDLGlDQUFhO0lBQ3BELHVCQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVhLHlDQUFpQixHQUEvQjs7O2dCQUNJLElBQUk7b0JBQ0Esc0JBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUE7aUJBQ3ZFO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLHNCQUFPLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLEVBQUE7aUJBQ3hEOzs7O0tBQ0o7SUFFYSxtQ0FBVyxHQUF6QixVQUEwQixHQUFXLEVBQUUsS0FBYTs7OztnQkFDMUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO2dCQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO2dCQUNuQixFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZFLHNCQUFP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