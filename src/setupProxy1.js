const {createProxyMiddleware}=require("http-proxy-middleware")
module.exports=function(app){    
    app.use('/api', createProxyMiddleware({
        target: 'http://65.2.37.223:8089/',
        changeOrigin: true,
        pathRewrite: {
        '^/api': '/'
        }
    }));
}