// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    // 读取本地文件, markdown
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost', // 名字可以自定义的
        path: './content/blog/**/*.md',
      }
    },
    // 访问本地服务的数据
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['post', 'tag'], // StrapiPost
        // typeName: 'Strapi',
        singleTypes: ['general'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    // StrapiPost 是由 插件生成的 typeName + contentType 组成的
    StrapiPost: [
      {
        path: '/post/:id',
        component: './src/templates/Post.vue'
      }
    ],
    StrapiTag: [
      {
        path: '/tag/:id',
        component: './src/templates/Tag.vue'
      }
    ]
  }
}
