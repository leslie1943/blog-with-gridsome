<template>
  <Layout>
    <!-- Page Header -->
    <header
      class="masthead"
      :style="{backgroundImage: `url(${GRIDSOME_API_URL + general.cover.url})`}"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{general.title}}</h1>
              <span class="subheading">{{general.subtitle}}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview" v-for="edge in $page.posts.edges" :key="edge.id">
            <g-link :to="`/post/${edge.node.id}`">
              <h2 class="post-title">{{edge.node.title}}</h2>
              <!-- <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3> -->
            </g-link>
            <p class="post-meta">
              Posted by
              <a
                href="#"
              >{{edge.node.created_by.firstname + edge.node.created_by.lastname}}</a>
              on {{edge.node.created_at}}
            </p>
            <div v-html="mdToHtml($edge.node.content)"></div>
            <p>
              <span v-for="tag in edge.node.tags" :key="tag.id">
                <g-link :to="`/tag/${tag.id}`">{{tag.title}}</g-link>&nbsp;&nbsp;
              </span>
            </p>
            <hr />
          </div>
          <div class="pager">
            <Pager :info="$page.posts.pageInfo" />
          </div>
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
query($page: Int) {
  posts: allStrapiPost(perPage: 10, page: $page) @paginate {
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
  general:allStrapiGeneral {
    edges {
      node {
        id
        title
        subtitle
        cover {
          url
        }
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default {
  name: 'HomePage',
  metaInfo: {
    title: 'Hello, world!'
  },
  components: { Pager },
  computed: {
    general() {
      return this.$page.general.edges[0].node
    }
  },
  methods: {
    mdToHtml(markdown) {
      return md.render(markdown)
    }
  }
}
</script>

<style>
.pager a {
  padding: 10px;
}
</style>>

