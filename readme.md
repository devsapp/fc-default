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

例如：
    - 部署web-framework时，将代码放在nas的默认设置：`s cli fc-default set web-framework nas`
    - 部署函数时，默认采用sdk方案：`s cli fc-default set deploy-type sdk`



## 获取

命令： `s cli fc-default get`

默认：

```yaml
web-framework: nas
deploy-type: sdk
```

## 上层组件调用

1. 获取所有配置
```
const fcDefault = await core.loadComponent('devsapp/fc-default');
const res = await fcDefault.get();
```

2. 获取制定配置
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
