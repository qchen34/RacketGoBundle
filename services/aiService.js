const OpenAI = require('openai');

class AIService {
  constructor(apiKey, baseURL) {
    this.openai = new OpenAI({
      apiKey,
      baseURL
    });
  }

  // AI 调用方法
  async getRecommendation(userData) {
    try {
      const prompt = this.buildPrompt(userData);
      console.log('发送的 prompt:', prompt);  // 调试信息

      const completion = await this.openai.chat.completions.create({
        model: "qwen-plus",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        // 使用非流式响应
        stream: false
      });

      console.log('API 响应:', completion);  // 调试信息

      // 检查响应
      if (!completion.choices || !completion.choices[0]) {
        throw new Error('无效的 API 响应');
      }

      // 返回完整的文本响应
      return {
        success: true,
        data: completion.choices[0].message.content
      };

    } catch (error) {
      console.error('API 调用失败:', error);
      return {
        success: false,
        error: '推荐获取失败',
        message: error.message
      };
    }
  }

  // 构建 prompt
  buildPrompt(userData) {
    return `
请根据以下用户信息推荐网球拍：
- 身高：${userData.height}cm
- 体重：${userData.weight}kg
- 水平：${userData.level}
- 打球风格：${userData.preference}

请按照以下格式回复：

【推荐球拍】
1. [球拍名称]
- 价格：xxx元
- 重量：xxx克
- 拍面：xxx平方英寸
- 手柄型号：x号柄
- 平衡点：xxx
- 适合水平：xxx
- 推荐理由：xxx
- 同款球拍使用球星：xxx


2. [球拍名称]
...（同上格式，共推荐4款球拍）

【综合对比】
1. 价格对比：
2. 重量对比：
3. 操控性对比：
4. 上手难度对比：
5. 性价比对比：
`;
  }
}

module.exports = AIService; 