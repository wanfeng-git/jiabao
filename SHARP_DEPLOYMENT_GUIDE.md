# Sharp 部署问题解决指南

## 问题描述

在 Strapi Cloud 部署时遇到 Sharp 包安装失败的错误：

```
sharp: Installation error: Status 503 Service Unavailable
```

## 解决方案

### 1. 自动修复（推荐）

项目已配置自动修复脚本，在每次 `npm install` 后会自动运行：

```bash
npm install
```

如果自动修复失败，可以手动运行：

```bash
npm run fix-sharp
```

### 2. 手动修复

如果自动修复不起作用，可以按以下步骤手动修复：

```bash
# 1. 删除现有的 Sharp 安装
npm uninstall sharp

# 2. 清理 npm 缓存
npm cache clean --force

# 3. 设置环境变量
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_BINARY_HOST=https://github.com/lovell/sharp-libvips/releases/download/

# 4. 重新安装 Sharp
npm install sharp@^0.33.0
```

### 3. 配置文件说明

项目包含以下配置文件来解决 Sharp 问题：

#### `.npmrc`
```
sharp_binary_host=https://github.com/lovell/sharp-libvips/releases/download/
sharp_libvips_binary_host=https://github.com/lovell/sharp-libvips/releases/download/
sharp_ignore_global_libvips=1
```

#### `package.json` 中的 overrides
```json
{
  "overrides": {
    "sharp": "^0.33.0"
  }
}
```

### 4. Strapi Cloud 特定配置

在 Strapi Cloud 部署时，确保以下环境变量已设置：

```
SHARP_IGNORE_GLOBAL_LIBVIPS=1
SHARP_BINARY_HOST=https://github.com/lovell/sharp-libvips/releases/download/
SHARP_LIBVIPS_BINARY_HOST=https://github.com/lovell/sharp-libvips/releases/download/
```

### 5. 验证安装

部署完成后，可以通过以下方式验证 Sharp 是否正常工作：

1. 检查 Strapi 启动日志，确保没有 Sharp 相关错误
2. 尝试上传图片文件，确保图片处理功能正常
3. 检查生成的图片缩略图是否正确

## 常见问题

### Q: 为什么会出现 Sharp 安装问题？

A: Sharp 是一个原生模块，需要为特定的操作系统和架构编译。在容器环境中，可能会遇到预编译二进制文件下载失败的问题。

### Q: 如果问题仍然存在怎么办？

A: 可以尝试以下方法：

1. 使用不同的镜像源
2. 联系 Strapi Cloud 支持
3. 考虑使用其他图片处理库

### Q: 这些配置会影响本地开发吗？

A: 不会。这些配置主要针对生产环境，本地开发环境通常不会遇到这些问题。

## 相关链接

- [Sharp 官方文档](https://sharp.pixelplumbing.com/)
- [Strapi 部署指南](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/)
- [Strapi Cloud 文档](https://docs.strapi.io/cloud/)
