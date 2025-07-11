import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler((server) => {
  // 工具1: 乘法操作
  server.tool("multiply", {
    a: z.number(),
    b: z.number()
  }, async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `Result: ${a * b}`
    }],
  }));

  // 工具2: 问候工具，接收一个名字，返回问候语
  server.tool("greet", {
    name: z.string()
  }, async ({ name }) => ({
    content: [{
      type: "text",
      text: `Hello, ${name}! 欢迎访问 Hikafeng 的 MCP 服务器。`
    }],
  }));

  // 工具3: 检查回文工具，判断输入文本是否为回文
  server.tool("checkPalindrome", {
    text: z.string()
  }, async ({ text }) => {
    const normalized = text.toLowerCase().replace(/[\W_]/g, "");
    const reversed = normalized.split("").reverse().join("");
    const isPalindrome = normalized === reversed;
    return {
      content: [{
        type: "text",
        text: `文本 "${text}" ${isPalindrome ? "是" : "不是"}回文。`
      }],
    };
  });
  
  // 工具4: 返回 MCP 服务器设计者信息
  server.tool("serverInfo", {}, async () => ({
    content: [{
      type: "text",
      text: `MCP 服务器设计者为 Hikafeng, 时间为 2025年7月11日`
    }],
  }));
  
  // 工具5: 问 Hikafeng 最喜欢的诗歌
  server.tool("askFavoritePoem", {}, async () => ({
    content: [{
      type: "text",
      text: `垆边人似月，皓腕凝霜雪`
    }],
  }));
});

export { handler as GET, handler as POST, handler as DELETE };