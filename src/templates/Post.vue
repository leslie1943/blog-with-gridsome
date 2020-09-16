<template>
  <Layout>
    <!-- Page Header -->
    <!-- background-image: url('/img/post-bg.jpg') -->
    <header
      class="masthead"
      :style="{
        backgroundImage: $page.post.cover && $page.post.cover.url ? `url(${GRIDSOME_API_URL + $page.post.cover.url})`: 'url(/img/post-bg.jpg)'}"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>{{$page.post.title}}</h1>
              <!-- <h2 class="subheading">no sub title :(</h2> -->
              <span class="meta">
                Posted by
                <a
                  href="#"
                >{{$page.post.created_by.firstname + ' ' + $page.post.created_by.lastname}}</a>
                on {{$page.post.created_at | date('YYYY-MM-DD')}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto" v-html="mdToHtml($page.post.content)"></div>
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>
query($id: ID!) {
  post: strapiPost(id: $id) {
    id
    title
    content
    created_at
    cover {
      url
    }
    created_by{
      id
      lastname
      firstname
    }
    tags {
      id
      title
    }
  }
}
</page-query>
<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  name: 'PostPage',
  methods: {
    mdToHtml(markdown) {
      return md.render(markdown)
    }
  }
}
</script>

<style>
</style>