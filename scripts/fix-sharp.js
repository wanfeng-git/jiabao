#!/usr/bin/env node

/**
 * 修复 Sharp 安装问题的脚本
 * 用于解决在 Strapi Cloud 或其他容器环境中的 Sharp 安装失败问题
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 开始修复 Sharp 安装问题...');

// 设置环境变量
process.env.SHARP_IGNORE_GLOBAL_LIBVIPS = '1';
process.env.SHARP_BINARY_HOST = 'https://github.com/lovell/sharp-libvips/releases/download/';
process.env.SHARP_LIBVIPS_BINARY_HOST = 'https://github.com/lovell/sharp-libvips/releases/download/';

try {
  // 检查是否已安装 Sharp
  try {
    const sharp = require('sharp');
    console.log('✅ Sharp 已正确安装，版本:', sharp.versions);
    process.exit(0);
  } catch (error) {
    console.log('❌ Sharp 未安装或安装有问题，开始修复...');
    console.log('错误详情:', error.message);
  }

  // 删除现有的 Sharp 安装
  console.log('🗑️  删除现有的 Sharp 安装...');
  try {
    execSync('npm uninstall sharp', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  删除 Sharp 时出现警告，继续...');
  }

  // 清理 npm 缓存
  console.log('🧹 清理 npm 缓存...');
  try {
    execSync('npm cache clean --force', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  清理缓存时出现警告，继续...');
  }

  // 重新安装 Sharp
  console.log('📦 重新安装 Sharp...');
  execSync('npm install sharp@^0.32.6 --platform=linux --arch=x64', {
    stdio: 'inherit',
    env: {
      ...process.env,
      SHARP_IGNORE_GLOBAL_LIBVIPS: '1',
      npm_config_sharp_binary_host: 'https://github.com/lovell/sharp-libvips/releases/download/',
      npm_config_sharp_libvips_binary_host: 'https://github.com/lovell/sharp-libvips/releases/download/'
    }
  });

  // 验证安装
  console.log('🔍 验证 Sharp 安装...');
  require('sharp');
  console.log('✅ Sharp 安装成功！');

} catch (error) {
  console.error('❌ Sharp 修复失败:', error.message);
  console.log('\n📝 建议的解决方案:');
  console.log('1. 确保在 Linux 环境中运行');
  console.log('2. 检查网络连接');
  console.log('3. 尝试使用不同的镜像源');
  console.log('4. 联系 Strapi Cloud 支持');
  process.exit(1);
}
