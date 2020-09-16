<template>
  <Layout>
    <header class="masthead" style="background-image: url('/img/home-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1># {{$page ? $page.tag.title :'-'}}</h1>
              <!-- <span class="subheading">苏震的blog</span> -->
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview" v-for="post in posts" :key="post.id">
            <g-link :to="`/post/${post.id}`">
              <h2 class="post-title">{{post.title}}</h2>
            </g-link>
            <p class="post-meta">Posted on {{post.created_at | date('YYYY-MM-DD') }}</p>
            <!-- <div v-html="mdToHtml(post.content)"></div> -->
            <!-- <p>
              <span v-for="tag in edge.node.tags" :key="tag.id">
                <g-link :to="`/tag/${tag.id}`">{{tag.title}}</g-link>&nbsp;&nbsp;
              </span>
            </p>-->
            <hr />
          </div>
          <!-- <div class="pager">
            <Pager :info="$page.posts.pageInfo" />
          </div>-->
          <!-- Pager -->
          <!-- <div class="clearfix">
            <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
          </div>-->
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query($id: ID!){
  tag:strapiTag(id:$id){
    id
    title
    posts{
      created_at
      title
      content
      id
    }
  }
}
</page-query>
<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  name: 'TagPage',
  methods: {
    mdToHtml(markdown) {
      return md.render(markdown)
    }
  },
  computed: {
    posts() {
      return this.$page.tag.posts ? this.$page.tag.posts.reverse() : []
    }
  },
}
</script>

<style>
</style>