// 创建测试文件
require('dotenv').config();
const OpenAI = require('openai');
const AIService = require('../services/aiService');


// 初始化 OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

// 初始化 AIService
const aiService = new AIService(
  process.env.OPENAI_API_KEY,
  "https://dashscope.aliyuncs.com/compatible-mode/v1"
);

// 测试用例
const testCases = [
  {
    height: 175,
    weight: 70,
    level: "2.5",
    preference: "控制型"
  }
];

// 测试函数
async function runTest() {
  console.log('开始测试网球拍推荐系统...\n');

  for (const testCase of testCases) {
    try {
      console.log('用户信息：');
      console.log(`身高：${testCase.height}cm`);
      console.log(`体重：${testCase.weight}kg`);
      console.log(`水平：${testCase.level}`);
      console.log(`打球风格：${testCase.preference}`);
      console.log('\n正在生成推荐...\n');

      const result = await aiService.getRecommendation(testCase);

      if (result.success) {
        console.log('推荐结果：\n');
        // 直接打印文本内容
        console.log(result.data);
      } else {
        console.error('推荐失败：', result.error);
      }

      console.log('\n' + '='.repeat(50) + '\n');

    } catch (error) {
      console.error('测试执行失败：', error);
    }
  }
}

// 运行测试
runTest(); 