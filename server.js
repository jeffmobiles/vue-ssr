// const createApp = require("/path/to/built-server-bundle.js");

// server.get('*',(req,res)=>{
//   const context = {url:req.url};
//   createApp(context).then(app=>{
//     renderer.renderToString(app,(err,html)=>{
//       if (err) {
//         if (err.code == 404){
//           res.status(404).end('page not found');
//         } else {
//           res.status(500).end('内部错误');
//         }
//
//       } else {
//         res.end(html);
//       }
//     })
//   })
// })

const {createBundleRenderer} = require("vue-server-renderer")
const express = require('express')
const server = express()
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(serverBundle, {
  ruunInNewContext: false, //tuijian
  //template, // kexuan
  //clientManifest //
})

server.get('*', (req, res) => {
  const context = { url: req.url}
  renderer.renderToString(context, (err, html) => {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    res.end(html);
  })
})
const port = process.env.PORT || 2080
server.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
