module.exports = {
  async create(ctx) {
    try {
      // 处理文件字段
      console.log('====== 原始请求体 ======');
      console.dir(ctx.request.files);
      const files = {
        attachment: ctx.request.files['files.attachment']
      };
      
      const entry = await strapi.entityService.create('api::message.message', {
        data: ctx.request.body.data,
        files: files,
        populate: {
          attachment: {
            fields: ['name', 'url', 'provider', 'mime', 'size']
          }
        }
      });
      
      await strapi.service('api::message.message').sendNotification(entry);
      
      return ctx.send(entry);
    } catch (error) {
      console.error('完整错误堆栈:', error.stack);
      return ctx.badRequest(error.message);
    }
  }
};