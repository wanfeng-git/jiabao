#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Installing Sharp for Strapi Cloud deployment...');

try {
  // Check if we're in a Docker/Alpine environment
  const isAlpine = fs.existsSync('/etc/alpine-release');
  
  if (isAlpine) {
    console.log('📦 Detected Alpine Linux environment');
    
    // Install system dependencies for Alpine
    try {
      execSync('apk add --no-cache vips-dev build-base python3 make g++', { stdio: 'inherit' });
    } catch (error) {
      console.warn('⚠️  Could not install system dependencies, continuing...');
    }
  }
  
  // Force rebuild Sharp
  console.log('🔨 Rebuilding Sharp...');
  execSync('npm rebuild sharp', { stdio: 'inherit' });
  
  console.log('✅ Sharp installation completed successfully!');
} catch (error) {
  console.error('❌ Sharp installation failed:', error.message);
  
  // Try alternative installation method
  console.log('🔄 Trying alternative installation method...');
  try {
    execSync('npm uninstall sharp && npm install sharp --platform=linux --arch=x64', { stdio: 'inherit' });
    console.log('✅ Alternative Sharp installation completed!');
  } catch (altError) {
    console.error('❌ Alternative installation also failed:', altError.message);
    console.log('💡 Consider using a different image processing library or contact Strapi Cloud support');
    process.exit(1);
  }
}
