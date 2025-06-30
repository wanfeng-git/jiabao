const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports = ({ strapi }) => ({
  async sendNotification(emailData) {
    // 获取服务器配置
    const serverConfig = strapi.config.get('server');
    const protocol = serverConfig.https ? 'https' : 'http';
    const host = serverConfig.host || 'localhost';
    const port = serverConfig.port || 1338;
    const serverUrl = process.env.PUBLIC_URL || `${protocol}://${host}:${port}`;

    // 修正关键命名空间
    const transporter = nodemailer.createTransport({
      host: strapi.config.get('plugin::email.providerOptions.host'),
      port: strapi.config.get('plugin::email.providerOptions.port'),
      secure: strapi.config.get('plugin::email.providerOptions.secure'),
      auth: {
        user: strapi.config.get('plugin::email.providerOptions.auth.user'),
        pass: strapi.config.get('plugin::email.providerOptions.auth.pass')
      },
      logger: true,
      debug: true
    });

const processAttachment = async (attachment) => {
  try {
    if (attachment.provider === 'local') {
      const filePath = path.join(
        strapi.dirs.static.public,
        attachment.url.replace(/^\/public\//, '') 
      );
      strapi.log.info(`处理附件路径: ${filePath}`); // <-- 新增行
      if (!fs.existsSync(filePath)) {
        strapi.log.error(`文件不存在: ${filePath}`);
        return null;
      }
      return { 
        filename: attachment.name, 
        content: fs.createReadStream(filePath) 
      };
    } else {
      strapi.log.info(`处理附件路径: ${attachment}`);
      return {
        
        filename: attachment.name,
        path: attachment.url.startsWith('http') 
          ? attachment.url 
          : `${serverUrl}${attachment.url}`
      };
    }
  } catch (error) {
    strapi.log.error('附件处理失败:', error);
    return null;
  }
};

    // 构建邮件内容
    const mailOptions = {
      
      from: strapi.config.get('plugin::email.settings.defaultFrom'),
      to: strapi.config.get('plugin::email.settings.defaultReplyTo'),
      subject: `📨 新的留言 📨`,
      html: `
        <h2>新消息通知</h2>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 12px; text-align: left;">项目名称</th>
            <td style="padding: 12px;">${emailData.productName}</td>
          </tr>
          ${emailData.contact ? `<tr><th>联系人</th><td>${emailData.contact}</td></tr>` : ''}
          ${emailData.phone ? `<tr><th>电话</th><td>${emailData.phone}</td></tr>` : ''}
          ${emailData.address ? `<tr><th>地址</th><td>${emailData.address}</td></tr>` : ''}
          ${emailData.message ? `<tr><th>留言内容</th><td>${emailData.message}</td></tr>` : ''}
          
        </table>
        ${emailData.attachment ? `<p style="margin-top: 20px;">附件已随邮件发送（${emailData.attachment.name}）</p>` : ''}
      `,
      attachments: []
    };
if(emailData){
  strapi.log.info('邮件数据字段验证 ------');
strapi.log.info('产品名称:', emailData.productName);
strapi.log.info('联系人:', emailData.contact);
strapi.log.info('电话:', emailData.phone);
strapi.log.info('附件信息:', JSON.stringify(emailData.attachment, null, 2));
}
     // 处理附件
if (emailData.attachment) {
  try {
    const attachmentConfig = await processAttachment(emailData.attachment);
    if (attachmentConfig) {
      mailOptions.attachments.push(attachmentConfig);
    }
  } catch (error) {
    strapi.log.error('附件处理异常:', error);
  }
}
    // 插入日志：邮件附件详情
strapi.log.info('邮件附件详情:', JSON.stringify(mailOptions.attachments)); 
    // 发送邮件
    try {
      
      const info = await transporter.sendMail(mailOptions);
      strapi.log.info('邮件发送成功:', info.messageId);

      // 记录邮件日志
      await strapi.entityService.create('plugin::email.email-log', {
        data: {
          messageId: info.messageId,
          to: mailOptions.to,
          subject: mailOptions.subject,
          status: 'sent',
          attachmentCount: mailOptions.attachments.length
        }
      });
      return true;
    } catch (error) {
      strapi.log.error('邮件发送失败:', error);
      
      // 记录失败日志
      await strapi.entityService.create('plugin::email.email-log', {
        data: {
          to: mailOptions.to,
          subject: mailOptions.subject,
          status: 'failed',
          error: error.toString()
        }
      });
      throw new Error(`邮件发送失败: ${error.message}`);
    }
  }
});