// 首先加载环境变量（必须在最开始）
require('dotenv').config();

// 导入必需的依赖
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const recommendRoute = require('./routes/recommend');  // 导入推荐接口路由
const path = require('path');

// 添加简单的调试信息
console.log('API Key loaded:', !!process.env.OPENAI_API_KEY);

// 创建 express 实例
const app = express();

// 使用中间件
app.use(cors());  // 允许跨域请求
app.use(bodyParser.json());  // 解析 JSON 数据

// 路由配置
app.use('/api', recommendRoute);  // 将 /api 路径下的请求转发到 recommend 路由

// 根路径测试路由
app.get('/', (req, res) => {
  res.send('Hello from chenqiwei.org backend!');
});

// 启动服务器
const PORT = 3000;  // 端口号
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
