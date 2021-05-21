import BaseComponent from './common/base';
import {InputProps} from './common/entity';

const {
    help,
    commandParse,
    reportComponent
} = require('@serverless-devs/core')
const fs = require('fs');
const yaml = require('js-yaml');

const defaultConfigFileObject = process.env.HOME + '/.s/.fc.default.yaml'

export default class ComponentDemo extends BaseComponent {
    constructor(props) {
        super(props)
    }

    private async getConfigFromFile() {
        let yamlData
        try {
            yamlData = await yaml.load(fs.readFileSync(defaultConfigFileObject, 'utf8'))
        } catch (e) {
            yamlData = {"web-framework": "nas", "deploy-type": "sdk"}
        }
        yamlData["web-framework"] = process.env['s-default-web-framework'] || yamlData["web-framework"]
        yamlData["deploy-type"] = process.env['s-default-deploy-type'] || yamlData["deploy-type"]
        return yamlData
    }

    private async writeToFile(key: string, value: string) {
        const config = await this.getConfigFromFile()
        config[key] = value
        await fs.writeFileSync(defaultConfigFileObject, yaml.dump(config));
        return true
    }

    /**
     * 设置阿里云函数计算的默认值
     * @param inputs
     * @returns
     */
    public async set(inputs: InputProps) {
        reportComponent('express', {
            command: 'set',
            uid: '',
        });
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const comParse = commandParse({args: inputs.args}, apts);
        if (comParse.data && comParse.data.help) {
            help([{
                header: 'Usage',
                content: `s cli fc-default set [type] [value]`
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
                        }
                    ],
                },]);
            return;
        }
        if (comParse.data && comParse.data._.length > 0) {
            if (comParse.data._[0] == "web-framework") {
                if (['nas', 'container'].includes(comParse.data._[1])) {
                    this.writeToFile("web-framework", comParse.data._[1])
                } else {
                    throw new Error(`The value range is ['nas', 'container']`);
                }
            }
            if (comParse.data._[0] == "deploy-type") {
                if (['sdk', 'pulumi'].includes(comParse.data._[1])) {
                    await this.writeToFile("deploy-type", comParse.data._[1])
                } else {
                    throw new Error(`The value range is ['sdk', 'pulumi']`);
                }
            }

        }
        return await this.getConfigFromFile();
    }

    /**
     * 获取所配置的阿里云函数计算默认值
     * @param inputs
     * @returns
     */
    public async get(inputs: InputProps) {
        reportComponent('express', {
            command: 'get',
            uid: '',
        });
        const apts = {
            boolean: ['help'],
            alias: {help: 'h'},
        };
        const args = inputs && inputs.args ? inputs.args : ""
        const comParse = commandParse({args: args || ""}, apts);
        if (comParse.data && comParse.data._.length > 0) {
            if (comParse.data._[0] == "web-framework") {
                const webFramework = (await this.getConfigFromFile())["web-framework"]
                if (!process.env['s-default-web-framework']) {
                    console.log(`📎 Using web framework type: ${webFramework}, If you want to deploy with ${webFramework === "nas" ? "container" : "nas"}, you can [s cli fc-default set web-framework ${webFramework === "nas" ? "container" : "nas"}] to switch.`)
                }
                return webFramework
            }
            if (comParse.data._[0] == "deploy-type") {
                const deployType = (await this.getConfigFromFile())["deploy-type"]
                if (!process.env['s-default-deploy-type']) {
                    console.log(`📎 Using fc deploy type: ${deployType}, If you want to deploy with ${deployType === "sdk" ? "pulumi" : "sdk"}, you can [s cli fc-default set deploy-type ${deployType === "sdk" ? "pulumi" : "sdk"}] to switch.`)
                }
                return deployType
            }

        }
        return await this.getConfigFromFile()
    }


}
