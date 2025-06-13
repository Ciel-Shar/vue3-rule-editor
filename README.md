# Suricata 规则可视化编辑器

一个基于 Vue3 和 DaisyUI 的 Suricata 规则可视化编辑器，支持通过图形界面创建和编辑 Suricata 规则。

## 功能特点

- 可视化规则编辑界面
- 关键字分类树形展示
- 支持关键字拖拽排序
- 实时规则预览
- 协议特定关键字自动筛选
- 绿色主题设计

## 技术栈

- Vue 3 (组合式 API)
- DaisyUI (基于 Tailwind CSS)
- Vue.Draggable
- JavaScript
- HTML/CSS

## 开发环境设置

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
  ├── App.vue              # 主应用组件
  ├── main.js             # 应用入口
  ├── data/
  │   └── SuricataKeyWords.js  # 关键字数据集
  ├── components/
  │   ├── LoadingPage.vue     # 加载页面
  │   ├── MainPage.vue        # 主编辑页面
  │   └── KeywordForm.vue     # 关键字参数表单
  └── assets/
      └── main.css           # 全局样式
```

## 使用说明

1. 选择协议类型
2. 从左侧关键字树中选择需要的关键字
3. 填写关键字参数
4. 通过拖拽调整关键字顺序
5. 实时预览生成的规则

## 主题定制

项目使用 DaisyUI 的绿色主题，主要颜色包括：

- 主色调：#10B981
- 辅助色：#34D399
- 背景色：#F3F4F6
- 文本色：#1F2937

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT 