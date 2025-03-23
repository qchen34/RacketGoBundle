const express = require('express');
const OpenAI = require('openai');
const AIService = require('../services/aiService');
const router = express.Router();

// 添加调试信息
console.log('recommend.js 中的 API Key:', process.env.OPENAI_API_KEY);

// 修改初始化方式
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // 改用 OPENAI_API_KEY
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

console.log('API Key:', process.env.OPENAI_API_KEY);
console.log('OpenAI 配置:', {
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.OPENAI_API_KEY?.substring(0, 5) + '...'  // 只显示前几位
});

const aiService = new AIService(
  process.env.OPENAI_API_KEY,
  "https://dashscope.aliyuncs.com/compatible-mode/v1"
);

router.post('/recommend', async (req, res) => {
  try {
    const result = await aiService.getRecommendation(req.body);
    
    // 确保返回正确的数据格式
    res.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('推荐生成失败:', error);
    res.status(500).json({
      success: false,
      error: error.message || '推荐生成失败'
    });
  }
});

module.exports = router;

