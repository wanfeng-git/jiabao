module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/messages',
        handler: 'message.create',
        config: {
          policies: []
        }
      }
    ]
  };