import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import Message from './models/Message.js';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 配置
// 允许的环境变量中指定的前端域名，或开发环境允许所有来源
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

console.log('CORS Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGINS: allowedOrigins,
  hasAllowedOrigins: !!process.env.ALLOWED_ORIGINS
});

const corsOptions = {
  origin: function (origin, callback) {
    // 允许没有 origin 的请求（如移动应用、Postman 或服务器端请求）
    if (!origin) {
      console.log('Request without origin, allowing');
      return callback(null, true);
    }
    
    // 开发环境允许所有来源
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Development mode: allowing origin ${origin}`);
      return callback(null, true);
    }
    
    // 生产环境检查允许的来源
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`Allowed origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`Blocked origin: ${origin}. Allowed origins:`, allowedOrigins);
      callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// 中间件
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 连接 MongoDB
connectDB();

// API路由：接收留言并保存到 MongoDB
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // 验证必填字段
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    // 防重复提交：检查最近5秒内是否有相同邮箱和相同内容的留言
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();
    const fiveSecondsAgo = new Date(Date.now() - 5000);
    
    const duplicateMessage = await Message.findOne({
      email: trimmedEmail,
      message: trimmedMessage,
      createdAt: { $gte: fiveSecondsAgo }
    });

    if (duplicateMessage) {
      return res.status(400).json({ 
        success: false, 
        error: 'Duplicate message detected. Please wait a moment before submitting again.' 
      });
    }

    // 创建新的留言文档
    const newMessage = new Message({
      name: name.trim(),
      email: trimmedEmail,
      phone: phone ? phone.trim() : '',
      message: trimmedMessage
    });

    // 保存到 MongoDB
    const savedMessage = await newMessage.save();

    res.json({ 
      success: true, 
      message: 'Message saved successfully',
      id: savedMessage._id,
      createdAt: savedMessage.createdAt
    });
  } catch (error) {
    console.error('Error saving message:', error);
    
    // 处理 Mongoose 验证错误
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        error: errors.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save message' 
    });
  }
});

// API路由：获取所有留言列表
app.get('/api/messages', async (req, res) => {
  try {
    // 从 MongoDB 查询所有留言，按创建时间倒序排列
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .select('-__v'); // 排除 __v 字段

    // 格式化返回数据
    const formattedMessages = messages.map(msg => ({
      id: msg._id.toString(),
      name: msg.name,
      email: msg.email,
      phone: msg.phone || '未提供',
      message: msg.message,
      time: msg.createdAt.toLocaleString('zh-CN', { 
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      createdAt: msg.createdAt.toISOString()
    }));

    res.json({
      success: true,
      count: formattedMessages.length,
      messages: formattedMessages
    });
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to read messages'
    });
  }
});

// API路由：获取单个留言内容
app.get('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 验证 MongoDB ObjectId 格式
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid message ID'
      });
    }

    // 从 MongoDB 查询留言
    const message = await Message.findById(id).select('-__v');
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      message: {
        id: message._id.toString(),
        name: message.name,
        email: message.email,
        phone: message.phone || '未提供',
        message: message.message,
        time: message.createdAt.toLocaleString('zh-CN', { 
          timeZone: 'Asia/Shanghai',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        createdAt: message.createdAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error reading message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to read message'
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

