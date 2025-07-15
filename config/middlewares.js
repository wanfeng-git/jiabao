// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: false // 禁用安全策略
    }
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3002',       // 精确开发地址
        'http://localhost:3000',
        'http://127.0.0.1:3002',       // 备用本地地址
        'http://8.148.217.190'       // 生产地址
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      headers: ['Content-Type', 'Authorization']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
];