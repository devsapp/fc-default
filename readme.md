# 组件说明

该组件只支持命令式交互：

## 设置

命令： `s cli fc-default set`

子命令：
- web-framework
    - nas
    - container
- deploy-type
    - sdk
    - pulumi
- fc-endpoint
- enable-fc-endpoint
- fc-cluster-ip

例如：
- 部署web-framework时，将代码放在nas（默认设置）：`s cli fc-default set web-framework nas`
- 部署web-framework时，也可选择将代码放在镜像文件内：`s cli fc-default set web-framework container`
- 部署函数时，默认采用sdk方案：`s cli fc-default set deploy-type sdk`
- 部署函数时，若要使用自定义的 endpoint: 
```bash
$ s cli fc-default set fc-endpoint xxx
$ s cli fc-default set enable-fc-endpoint true
```
- 部署函数时，若要使用测试集群 ip: `s cli fc-default set fc-cluster-ip xxx`



## 获取

命令： `s cli fc-default get`

默认：

```yaml
web-framework: nas
deploy-type: sdk
fc-endpoint: xxx
enable-fc-endpoint: 'true'
```

## 上层组件调用

1. 获取所有配置
```
const fcDefault = await core.loadComponent('devsapp/fc-default');
const res = await fcDefault.get();
```

2. 获取指定配置
```
const fcDefault = await core.loadComponent('devsapp/fc-default');
const res = await fcDefault.get({args: "deploy-type"});
```
此时会有提醒，例如：
```
📎 Using fc deploy type: pulumi, If you want to deploy with sdk, you can [s cli fc-default set deploy-type sdk] to switch.
```

3. 强制获取配置
```
process.env['s-default-deploy-type'] = 'pulumi'
const fcDefault = await core.loadComponent('devsapp/fc-default');
const res = await fcDefault.get({args: "deploy-type"});
```
此时获取的配置被指定为`pulumi`，同时不会有任何提醒
