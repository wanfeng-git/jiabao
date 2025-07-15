# 使用官方 Node.js 镜像
FROM node:22-alpine

# 安装必要的系统依赖，包括 Sharp 所需的库
RUN apk add --no-cache \
    vips-dev \
    build-base \
    python3 \
    make \
    g++ \
    libc6-compat

# 设置工作目录
WORKDIR /opt/app

# 复制 package 文件
COPY package*.json ./
COPY .npmrc ./

# 设置环境变量
ENV NODE_ENV=production
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 1337

# 启动应用
CMD ["npm", "start"]
