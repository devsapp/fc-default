import { InputProps } from './common/entity';
import * as path from 'path';
import os from 'os';
import logger from './common/logger';
import * as hostile from 'hostile';
import util from 'util';

const {
  help,
  commandParse,
  reportComponent,
} = require('@serverless-devs/core');
const fs = require('fs');
const yaml = require('js-yaml');

const getFromHosts = util.promisify(hostile.get);
const removeFromHosts = util.promisify(hostile.remove);
const setInHosts = util.promisify(hostile.set);

const defaultConfigFileObject = path.join(os.homedir(), '.s', '.fc.default.yaml');
const DEFAULT_FC_DEV_ENDPOINT = 'fc.dev-cluster.aliyuncs.com';

export default class ComponentDemo {
  /**
     * 设置阿里云函数计算的默认值
     * @param inputs
     * @returns
     */
  async set(inputs: InputProps) {
    reportComponent('fc-default', {
      command: 'set',
      uid: '',
    });
    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    const comParse = commandParse({ args: inputs.args }, apts);
    if (comParse.data && comParse.data.help) {
      help([{
        header: 'Usage',
        content: 's cli fc-default set [type] [value]',
      },
      {
        header: 'Examples',
        content: [
          {
            desc: 'deploy-type',
            example: '["sdk", "pulumi"], When deploying code to aliyun FC, you can choose "sdk" (deployment through SDK, faster speed) and "pulumi" (relatively slow speed)',
          },
          {
            desc: 'fc-endpoint',
            example: '\'s cli fc-default set fc-endpoint xxx\': Deploy rsource to fc with the custom endpoint.',
          },
          {
            desc: 'enable-fc-endpoint',
            example: '\'s cli fc-default set enable-fc-endpoint true\': Enable the defined fc-endpoint by user.',
          },
          {
            desc: 'fc-cluster-ip',
            example: '\'s cli fc-default set fc-cluster-ip xxx\': Deploy resource to fc with the specific cluster ip.',
          },
        ],
      }]);
      return;
    }
    if (comParse.data && comParse.data._.length > 0) {
      if (comParse.data._[0] == 'deploy-type') {
        if (['sdk', 'pulumi'].includes(comParse.data._[1])) {
          await this.writeToFile('deploy-type', comParse.data._[1]);
        } else {
          throw new Error('The value range is [\'sdk\', \'pulumi\']');
        }
      }
      if (comParse.data._[0] === 'fc-endpoint') {
        await this.writeToFile('fc-endpoint', comParse.data._[1]);
      }
      if (comParse.data._[0] === 'enable-fc-endpoint') {
        await this.writeToFile('enable-fc-endpoint', comParse.data._[1]);
      }
      if (comParse.data._[0] === 'fc-cluster-ip') {
        const ip: string = comParse.data._[1];
        // 尝试写 /etc/host
        try {
          await this.updateHostsFile(ip, DEFAULT_FC_DEV_ENDPOINT);
        } catch (e) {
          logger.warning(`Update /etc/hosts failed, please use sudo to execute the command or append '${ip}  ${DEFAULT_FC_DEV_ENDPOINT}' to /etc/hosts manually.`);
        }
        logger.debug(`fc cluster ip is ${ip}`);
        await this.writeToFile('fc-endpoint', `http://${DEFAULT_FC_DEV_ENDPOINT}`);
        await this.writeToFile('enable-fc-endpoint', true);
        await this.writeToFile('fc-cluster-ip', ip);
      }
    }
    return await this.getConfigFromFile();
  }

  /**
     * 获取所配置的阿里云函数计算默认值
     * @param inputs
     * @returns
     */
  async get(inputs: InputProps) {
    reportComponent('fc-default', {
      command: 'get',
      uid: '',
    });
    const apts = {
      boolean: ['help'],
      alias: { help: 'h' },
    };
    const args = inputs && inputs.args ? inputs.args : '';
    const comParse = commandParse({ args: args || '' }, apts);
    if (comParse?.data?.help) {
      help([{
        header: 'Usage',
        content: 's cli fc-default get [type]',
      },
      {
        header: 'Examples',
        content: [
          {
            desc: 'deploy-type',
            example: "How to deploy code to Alibaba Cloud FC ['nas','container']",
          },
          {
            desc: 'fc-endpoint',
            example: 'Deploy rsource to fc with the custom endpoint.',
          },
          {
            desc: 'enable-fc-endpoint',
            example: 'Enable the defined fc-endpoint by user.',
          },
          {
            desc: 'fc-cluster-ip',
            example: 'Deploy resource to fc with the specific cluster ip.',
          },
        ],
      }]);
      return;
    }
    if (comParse.data && comParse.data._.length > 0) {
      if (comParse.data._[0] == 'deploy-type') {
        const deployType = (await this.getConfigFromFile())['deploy-type'];
        return deployType;
      }
      if (comParse.data._[0] === 'fc-endpoint') {
        return (await this.getConfigFromFile())['fc-endpoint'];
      }
      if (comParse.data._[0] === 'enable-fc-endpoint') {
        return (await this.getConfigFromFile())['enable-fc-endpoint'];
      }
      if (comParse.data._[0] === 'fc-cluster-ip') {
        return (await this.getConfigFromFile())['fc-cluster-ip'];
      }
    }
    const result = await this.getConfigFromFile();
    if(result['web-framework']){
      delete result['web-framework'];
    }
    return result;
  }

  private async getConfigFromFile() {
    let yamlData;
    try {
      yamlData = await yaml.load(fs.readFileSync(defaultConfigFileObject, 'utf8'));
    } catch (e) {
      yamlData = { 'deploy-type': 'sdk' };
    }
    yamlData['deploy-type'] = process.env['s-default-deploy-type'] || process.env.s_default_deploy_type || yamlData['deploy-type'];
    yamlData['fc-endpoint'] = process.env['s-default-fc-endpoint'] || process.env.s_default_fc_endpoint || yamlData['fc-endpoint'];
    yamlData['enable-fc-endpoint'] = process.env['s-default-enable-fc-endpoint'] || process.env.s_default_enable_fc_endpoint || yamlData['enable-fc-endpoint'];
    yamlData['fc-cluster-ip'] = process.env['s-default-fc-cluster-ip'] || process.env.s_default_fc_cluster_ip || yamlData['fc-cluster-ip'];
    return yamlData;
  }

  private async writeToFile(key: string, value: any) {
    const config = await this.getConfigFromFile();
    config[key] = value;
    await fs.writeFileSync(defaultConfigFileObject, yaml.dump(config));
    return true;
  }

  private async updateHostsFile(ip: string, endpoint: string): Promise<any> {
    const lines = await getFromHosts(false);
    for (const line of lines) {
      // line format: [IP, HOST]
      const ipInHostsFile: string = line[0];
      const hostInHostsFile: string = line[1];
      if (hostInHostsFile === endpoint) {
        await removeFromHosts(ipInHostsFile, hostInHostsFile);
      }
    }
    await setInHosts(ip, endpoint);
  }
}
