# 使用 Debian 基础镜像而不是 Alpine，避免 musl 问题
FROM node:22-slim

# 安装必要的系统依赖，包括 Sharp 所需的库
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /opt/app

# 复制 package 文件
COPY package*.json ./
COPY .npmrc ./

# 设置环境变量
ENV NODE_ENV=production
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
ENV SHARP_PLATFORM=linux
ENV SHARP_ARCH=x64
ENV SHARP_LIBC=glibc

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
