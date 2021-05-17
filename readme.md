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