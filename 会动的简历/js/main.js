/*把code写到#code和style标签里*/
function writeCss(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
      styleTag.innerHTML = prefix +  code.substring(0, n)
      domCode.scrollTop = domCode.scrollHeight
      if (n >= code.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 20)
  }
  function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
      n += 1
      domPaper.innerHTML = markdown.substring(0, n)
      domPaper.scrollTop = domPaper.scrollHeight
      if (n >= markdown.length) {
        window.clearInterval(id)
        fn && fn.call()
      }
    }, 15)
  }

  var css1 = `/* 
  * 面试官你好，我是叶飞飞
  * 只用文字作做我介绍太单调了
  * 我就用代码来介(zhuang)绍(bi)吧
  * 首先准备一些样式
  */
 
 *{
   transition: all 1s;
 }
 html{
   background: #eee;
 }
 #code{
   border: 1px solid #aaa;
   padding: 16px;
 }
 
 /* 我需要一点代码高亮 */
 
 .token.selector{ color: #690; }
 .token.property{ color: #905; }
 
 /* 加一个呼吸效果 */
 
 #code{
   animation: breath 0.5s infinite alternate-reverse;
 }
 
 /* 现在正式开始 */
 
 /* 我需要一张白纸 */
 
 #code-wrapper{
   width: 50%; left: 0; position: fixed; 
   height: 100%;
 }
 
 #paper > .content {
  display: block;
 }
 
 /* 于是我就可以在白纸上写字了，请看右边 */
 `
 
 var css2 = `
 /* 接下来用一个优秀的库 marked.js
  * 把 Markdown 变成 HTML
  */
 
 
 
 `
 var md = `
 # 自我介绍
 
 我叫 叶飞飞
 1994 年 8 月出生
 自学前端半年
 希望应聘前端开发岗位
 
 # 技能介绍
 
 熟悉 HTML CSS JavaScript Vue   
 
 # 项目介绍

1. ios风格无缝轮播
2. 会动的简历
3. canvas画板
4. vue技术栈搭建cnode社区

 # 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`

writeCss('', css1, ()=>{ // writeCss call the function
    createPaper(() => {
      writeMarkdown(md, ()=> {
        writeCss(css1, css2, ()=>{
          convertMarkdownToHtml(()=>{
            writeCss(css1 + css2, css3, ()=> {
              console.log('完成')
            })
          })
        })
      })
    })
  })
  
  
  
  
  function createPaper(fn){
    var paper = document.createElement('div') 
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
  }
  
  function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
  }
  
  