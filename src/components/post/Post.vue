<template>
   <div class="container">
      <div class="toc">
         <tree-link v-for="item in links" :link="item" :key="item.id"/>
      </div>
      <div class="content" v-html="compiledContent">
      </div>
   </div>
</template>
<script>
import TreeLink from './TreeLink.vue';
import marked from 'marked';
const render = new marked.Renderer();
render.heading = function(text, level) {
   return `<h${level}><a href="javascript:">${text}</a></h${level}>`;
}
marked.setOptions({
   renderer: render,
   gfm: true,
   tables: true,
   breaks: false,
   pedantic: false,
   sanitize: false,
   smartLists: true,
   smartypants: false,
});
export default {
   props: {
      rawContent: String
   },
   components: {
      TreeLink
   },
   data() {
      return {
         test: '# h1 \n## h11\n### h111\n## h12\n# h2\n## hh\n### hhhh\n# jfis'
      }
   },
   computed: {
      compiledContent() {
         return marked(this.test);
      },
      links() {
         let regex = /^#+ (.+)/mg;
         let result = this.test.match(regex);
         let regex1 = /^(#+) (.+)/
         let links = [];
         for (let i = 0; i < result.length; ++i) {
            let temp = result[i].match(regex1);
            let item = {};
            item.level = temp[1].length;
            for (let j = links.length - 1; j >= 0; --j) {
               if (links[j].level < item.level) {
                  item.parentId = links[j].id;
                  break;
               }
            }
            item.parentId = item.parentId ? item.parentId : 0;
            item.title = temp[2];
            item.id = i + 1;
            links.push(item);
         }
         links.forEach(item => delete item.level);
         links = links.filter(link => {
            link.children = links.filter(item => 
               item.parentId == link.id
            )
            return link.parentId == 0;
         })
         return links;
      }
   },
   mounted() {
   }
}
</script>
<style scoped>
/* flex 默认会等高，但是sticky属性在父子元素等高时无效，所以需要align-self设置高度 */
   .container {
      display: flex;
   }
   .toc {
      text-align: left;
      position: sticky;
      top: 10px;
      align-self: flex-start;
      border: 1px solid #ccc;
      padding: 1em;
   }
   .content {
      white-space: pre-line;
      text-align: left;
   }
</style>
