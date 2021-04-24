## 模仿 vue-cli 制作的一个脚手架

该脚手架并不针对于某一特定框架如 vue, react 等，本意是为了方便一些不使用第三方框架的项目，如可视化项目(d3.js)等

如果有需求的话也可以通过插件的方式扩展来支持 vue, react 等

![](https://i.loli.net/2021/04/04/uikQC1c7srzSeXh.gif)

使用方法：

```bash
holo create <project>
```

#### 已完成功能

功能

- [x] 选择特性
- [x] 选择包管理器
- [x] 选择不同的 eslint 风格

插件

- [x] eslint 插件
- [x] webpack 插件
- [x] commitlint 插件
- [x] babel 插件

#### TODO

功能

- [ ] 支持通过 `add` 的方式去添加插件

插件

- [ ] 支持不同的 packer（如 vite, rollup）
- [ ] 支持 typescript
