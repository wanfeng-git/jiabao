module.exports = ({env}) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 10 * 1024 * 1024 // 10MB
      }
    }
  },
    email: {
        config: {
          provider: 'nodemailer',
          providerOptions: {
            // QQ邮箱服务器和默认端口
            host: "smtp.qq.com",       // QQ 邮箱 SMTP 服务器
            port: 465,                 // SSL 端口
            secure: true,              // 启用 SSL
            auth: {
              // 发送账号和客户端鉴权码
              user: '1026958200@qq.com',
              pass: 'evccrzrisioabeeh',
            },
            // ... any custom nodemailer options
          },
          settings: {
            // 默认发送账号
            defaultFrom: '1026958200@qq.com',
            // 默认回复账号
            defaultReplyTo: '1026958200@qq.com',
          },
        },
      },

});
