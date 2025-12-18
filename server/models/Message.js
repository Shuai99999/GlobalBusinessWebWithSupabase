import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '姓名是必填项'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '邮箱是必填项'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '请输入有效的邮箱地址']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    required: [true, '留言内容是必填项'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 创建索引以提高查询性能
messageSchema.index({ createdAt: -1 }); // 按创建时间倒序索引
messageSchema.index({ email: 1 }); // 按邮箱索引

const Message = mongoose.model('Message', messageSchema);

export default Message;







