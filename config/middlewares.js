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
      origin: process.env.NODE_ENV === 'production'
          ? ['https://your-domain.com']
          : ['http://localhost:*', 'http://127.0.0.1:*'],
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