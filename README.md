# 声存 · 播客下载器

在线使用：https://anthony20040603.github.io/podcast-downloader-web/

已部署到 GitHub Pages，发布来源为 main 分支根目录。

响应式纯 HTML 网页。双击 index.html 即可在浏览器打开，默认显示“搜索播客”，下面直接是节目下载列表。没有依赖、构建步骤或服务器程序。

支持：使用 Apple 官方跨站回调按名称搜索 Apple Podcasts（中国区，兼容本地 HTML 和 GitHub Pages）；读取允许跨站访问的 RSS；导入 RSS 文件或粘贴 XML；标题筛选与节目勾选；试听；单集和批量下载；下载进度与停止。

## GitHub Pages 部署

1. 创建独立的公开仓库，例如 podcast-downloader-web。
2. 把 index.html、README.md 和 .nojekyll 放到 main 分支的根目录。
3. 在 Settings → Pages 中选择 Deploy from a branch，main 分支，/(root)，保存。
4. 等待 Pages 发布完成，用设置页显示的 github.io 地址打开。

## 实际限制

GitHub Pages 只托管静态页面。RSS 和音频由浏览器直接连接发布者，能否跨站读取取决于发布者的 CORS 设置。不能读取时，导入 RSS 文件；音频无法直接下载时，用“打开音频”在原站保存。小宇宙网页链接不是 RSS，请使用公开 RSS，或搜索播客名称。

浏览器可能要求允许多个文件下载；实际文件请在浏览器的下载列表确认。单文件内存下载上限 200 MB。停止后再下载会重新开始，刷新不会保留下载进度。页面没有账号登录、公共代理或服务器端转发。

设计与实现源自对 daruizi/xiaoyuzhou-downloader 工作流程的网页改造。网页为独立的 JavaScript 实现，不在浏览器内执行 Python。
