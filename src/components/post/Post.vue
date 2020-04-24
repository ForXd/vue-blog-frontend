<template>
   <div class="container">
      <div class="toc" :style="tocStyle">
         <div class="left-bar">
            <div class="cur-active" :style="activeStyle"></div>
         </div>
         <div class="right-content" :style="contentStyle">
            <tree-link 
            v-for="item in links" 
            :link="item" 
            :key="item.id" 
            :focusId="active"
            :focusTo="focusTo"/>
         </div>
      </div>
      <div class="content" v-html="compiledContent">
      </div>
   </div>
</template>
<script>
import TreeLink from './TreeLink.vue';
import marked from 'marked';
const render = new marked.Renderer();
let index = 1;
render.heading = function(text, level) {
   return `<h${level}><a id=${index++} class="anchor">${text}</a></h${level}>`;
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
      rawContent: String,
      tocHeight: Number
   },
   components: {
      TreeLink
   },
   data() {
      return {
         active: 1,
         activeOffset: 0,
         contentOffset: 0
      }
   }, 
   methods: {
      focusTo(id, offsetTop) {
         this.active = id;
         this.activeOffset = offsetTop;
         if (this.activeOffset > this.tocHeight/2) {
            this.contentOffset = this.tocHeight/2 - 20;
         } else {
            this.contentOffset = 0;
         }
      },
      handleScroll() {
         let anchors = document.querySelectorAll('.anchor');
         anchors.forEach(anchor => {
            if (anchor.offsetTop < document.documentElement.scrollTop) {
               this.active = Number(anchor.id);
            }
         })
      }
   },
   computed: {
      navShow() {
         return this.$store.state.navFlag;
      },
      compiledContent() {
         return marked(this.rawContent);
      },
      tocStyle() {
         let style = {};
         if (this.navShow) {
            style.top = '60px';
         }
         style.height = this.tocHeight + 'px';
         return style;
      },
      contentStyle() {
         let style = {};
         style.transform = `translateY(${-this.contentOffset}px)`;
         return style;
      },
      activeStyle() {
         return { transform: `translateY(${this.activeOffset - this.contentOffset}px)`};
      },
      links() {
         let regex = /^#+ (.+)/mg;
         let result = this.rawContent.match(regex);
         let regex1 = /^(#+) (.+)/
         let links = [];
         if (!result) return [];
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
      window.addEventListener('scroll', this.handleScroll, false);
   },
   destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
   },
}
</script>
<style scoped>
/* flex 默认会等高，但是sticky属性在父子元素等高时无效，所以需要align-self设置高度 */
   .container {
      display: flex;
      position: relative;
   }
   .toc {
      text-align: left;
      position: sticky;
      top: 0;
      transition: all 0.6s ease;
      align-self: flex-start;
      border: 1px solid #ccc;
      padding: 0 1em;
      width: 10em;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
   }
   .left-bar {
      border-right: 2px solid #ccc;
      margin: 0 10px;
      position: relative;
   }
   .cur-active {
      background: #000;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: -4px;
      transition: all 0.6s ease;
   }
   .right-content {
      text-overflow:ellipsis;
      width: 100%;
      transition: all 0.6s ease;
   }
   .content {
      white-space: pre-line;
      text-align: left;
   }
</style>
