# Default starter for Gridsome

This is the project you get when you run `gridsome create new-project`.

### 1. Install Gridsome CLI tool if you don't have

`npm install --global @gridsome/cli`

### 2. Create a Gridsome project

1. `gridsome create my-gridsome-site` to install default starter
2. `cd my-gridsome-site` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`
4. Happy coding 🎉🙌


#### 3. features
- 预渲染: 除非强制刷新浏览器,否则路由的内容都是预渲染出来的, 不再请求服务端

#### gridsome.server.js
- `gridsome` 内部的服务

#### 项目级别配置
- [Project configuration](https://www.gridsome.cn/docs/config/)

#### 页面
- [Pages](https://www.gridsome.cn/docs/pages/)
- 动态路由,文件名就要用中括号 `[] 包起来`

#### Collections in GraphQ
Each collection will add two root fields to the GraphQL schema that are used to retrieve nodes in your pages. The field names are auto-generated based on the collection name. If you name the collection Post, you will have these fields available in the schema:
- `post` Get a single node by id.
- `allPost` Get a list of nodes. (Can be sorted and filtered.)

#### templates
- 给`Collections`添加模板, 在 `gridsome.config.js`配置
```js
  templates: {
    // 集合的名称(Post): 规则
    Post: [
      {
        path: '/posts/:id', // `posts`是自定义的(也可以叫articles), 但id 必须是 collection集合中有效的field
        component: './src/templates/Post.vue'
        /**
         * Post.vue中的内容
         * <page-query>
            # ID类型,不能为空.
            query ($id: ID!) {
              post(id: $id) {
                id
                title
                content
              }
            }
            </page-query>
         * /
      }
    ]
  }
```
#### 加载markdown文件
- 使用插件 `@gridsome/source-filesystem` 和 `@gridsome/transformer-remark`

#### gridsomm 应用
- gridsome 关心的是将模板和数据预渲染的静态html
- 