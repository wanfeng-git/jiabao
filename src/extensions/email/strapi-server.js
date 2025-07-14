module.exports = (plugin) => {
    plugin.contentTypes['email-log'] = {
      schema: {
        collectionName: 'email_logs',
        info: {
          singularName: 'email-log', 
          pluralName: 'email-logs',
          displayName: 'Email Log'
        },
        options: { draftAndPublish: false },
        attributes: {
          messageId: { type: 'string' },
          to: { type: 'string', required: true },
          subject: { type: 'string' },
          status: { type: 'string' },
          attachmentCount: { type: 'integer' },
          error: { type: 'text' }
        }
      }
    };
    return plugin;
  };