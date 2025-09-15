# D3.js 可视化项目

这是一个基于 D3.js 的数据可视化项目，展示了如何使用 D3.js 创建交互式图表。

## 功能特性

- 📊 响应式柱状图
- 🎨 现代化的UI设计
- 🖱️ 交互式数据展示
- 📱 移动端适配
- 🔄 动态数据更新

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动项目

```bash
npm start
```

或者使用Python启动本地服务器：

```bash
python -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000`

## 项目结构

```
d3-main/
├── index.html          # 主HTML文件
├── main.js            # D3.js主要代码
├── style.css          # 样式文件
├── package.json       # 项目配置
└── README.md          # 项目说明
```

## 使用说明

1. **更新数据**: 点击"更新数据"按钮随机更新所有数据点的值
2. **添加数据**: 点击"添加数据点"按钮添加新的城市数据
3. **重置数据**: 点击"重置数据"按钮恢复到初始数据状态

## 技术栈

- D3.js v7.8.5
- HTML5
- CSS3
- JavaScript ES6+

## 学习资源

- [D3.js 官方文档](https://d3js.org/)
- [D3.js 教程](https://observablehq.com/@d3/learn-d3)
- [D3.js 示例集合](https://observablehq.com/@d3/gallery)
