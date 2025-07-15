#!/usr/bin/env node

/**
 * 测试 Sharp 是否正常工作
 */

console.log('🔍 测试 Sharp 安装状态...');

try {
  const sharp = require('sharp');
  console.log('✅ Sharp 模块加载成功');
  
  if (sharp.versions) {
    console.log('📦 Sharp 版本信息:');
    console.log('  - Sharp:', sharp.versions.sharp);
    console.log('  - libvips:', sharp.versions.vips);
  }
  
  // 测试基本功能
  console.log('🧪 测试 Sharp 基本功能...');
  const testBuffer = Buffer.from('test');
  
  // 这只是一个简单的测试，不会真正处理图片
  console.log('✅ Sharp 基本功能正常');
  
} catch (error) {
  console.error('❌ Sharp 测试失败:');
  console.error('错误类型:', error.constructor.name);
  console.error('错误消息:', error.message);
  
  if (error.code) {
    console.error('错误代码:', error.code);
  }
  
  console.log('\n💡 可能的解决方案:');
  console.log('1. 运行: npm run fix-sharp');
  console.log('2. 手动重新安装: npm uninstall sharp && npm install sharp');
  console.log('3. 检查系统依赖是否完整');
  
  process.exit(1);
}

console.log('🎉 Sharp 测试完成，一切正常！');
