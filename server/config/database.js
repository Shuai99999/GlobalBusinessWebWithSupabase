import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 构建 MongoDB 连接字符串
const buildMongoURI = () => {
  // 优先使用完整的 MongoDB URI（如果设置了）
  if (process.env.MONGODB_URI) {
    console.log('📝 Using MONGODB_URI from environment variable');
    return process.env.MONGODB_URI;
  }

  // 否则使用分段的配置
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER;
  const database = process.env.MONGODB_DATABASE || 'evermotion';
  const appName = process.env.MONGODB_APP_NAME || 'evermotion';

  // 验证必要的环境变量
  if (!username || !password || !cluster) {
    const missing = [];
    if (!username) missing.push('MONGODB_USERNAME');
    if (!password) missing.push('MONGODB_PASSWORD');
    if (!cluster) missing.push('MONGODB_CLUSTER');
    
    throw new Error(
      `❌ Missing required MongoDB environment variables: ${missing.join(', ')}\n` +
      `Please set either MONGODB_URI or all of: MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER`
    );
  }

  // 对密码进行 URL 编码，以防密码中包含特殊字符
  const encodedPassword = encodeURIComponent(password);
  
  const uri = `mongodb+srv://${username}:${encodedPassword}@${cluster}/${database}?appName=${appName}`;
  console.log('📝 Built MongoDB URI (credentials hidden)');
  return uri;
};

// 连接 MongoDB
export const connectDB = async () => {
  try {
    const mongoURI = buildMongoURI();
    
    console.log('🔄 Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      // 使用新的连接选项（mongoose 6+）
      serverSelectionTimeoutMS: 10000, // 增加到10秒超时
      socketTimeoutMS: 45000, // Socket 超时
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('💡 Tip: Make sure all MongoDB environment variables are set in Railway');
    console.error('   Required: MONGODB_URI (or MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER)');
    process.exit(1);
  }
};

// 断开连接
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

