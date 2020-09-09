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

#### 预取 strapi 服务的数据
- 使用插件 `@gridsome/source-strapi` 加载数据

#### 查询分页数据
- `GraphQL` 的查询参数
query($page:Int) {
  posts: allStrapiPost(perPage:2,page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        content
        created_at
        tags {
          id
          title
        }
        created_by {
          id
          firstname
          lastname
        }
      }
    }
  }
}
- `GridSome` 的 `Pager` 组件 import { Pager } from 'gridsome'
- `<Pager :info="$page.posts.pageInfo" />`


#### markdown-it
- 使用 `markdown-it`显示markdown文本


#### 服务端安装
- 安装MySql `sudo apt-get install mysql-server mysql-client`
- 查看 `mysql --version`
- `sudo mysql_secure_installation`

#### 解决无法登录的问题
打开MySQL目录下的配置文件(我的目录是/etc/mysql/mysql.conf.d/mysqld.cnf, 可能有的系统是my.ini)
在文件的最后添加一行 `skip-grant-tables` 保存并关闭文件
2、重启MySQL服务(`service mysql restart`)

3.在命令行中输入 `mysql -u root -p` (不输入密码)，回车即可进入数据库

4. show databases; 查看当前的数据库
5. create database blog;

create user "suzhen'@'%" identified by '1234qwer';

#### 创建 / 查看 user
```bash
use mysql
# 创建本地账户
create user 'moon'@'localhost' identified by '1234qwer';  # moon / 1234qwer
GRANT all privileges ON *.* TO `moon`@`localhost`

create user 'moon'@'%' identified by '1234qwer';  # moon / 1234qwer
GRANT all privileges ON *.* TO `moon`@`%`
flush privileges
```


#### 解决 MYSQL 2003问题
修改 `etc/mysql/mysql.conf.d/musqld.cnf` 文件,
```bash
# 原
bind-address = 127.0.0.1
# 修改为
bind-address = 0.0.0.0
```

#### 解决 MYSQL 1003问题
```bash
UPDATE USER SET Host='%' where User='你的账号';
flush privileges
```

#### 解决 MYSQL 2059问题
```bash
ALTER USER 'moon'@'%' IDENTIFIED BY '你的密码' PASSWORD EXPIRE NEVER;
ALTER USER 'moon'@'%' IDENTIFIED WITH mysql_native_password BY '你的密码';
```


#### git 安装不成功
之前安装的时候报错
```
E: Failed to fetch http://mirrors.cloud.aliyuncs.com/ubuntu/pool/main/c/curl/libcurl3-gnutls_7.68.0-1ubuntu2.1_amd64.deb  404  Not Found [IP: 100.100.2.148 80]
E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
```
- `apt-get update`
- `apt install git`
- `git`

#### 执行 strapi
- git clone https://github.com/leslie1943/strapi-4-gridsome.git
- cd your_dir
- npm install
- npm run build
- npm run start
- pm2 start npm -- run start --name="strapi-blog"