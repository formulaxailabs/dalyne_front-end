const {createProxyMiddleware}=require("http-proxy-middleware")
module.exports=function(app){    
    app.use('/api', createProxyMiddleware({
        target: 'http://13.235.195.1:8089',
        changeOrigin: true,
        pathRewrite: {
        '^/api': '/api/v1/'
        }
    }));
}