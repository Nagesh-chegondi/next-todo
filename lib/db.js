import mongoose from 'mongoose';

// Replace the dummy URI below with your real MongoDB connection string.
// Keep your original collection names (users, todos).
const MONGO_URI = process.env.MONGODB_URI;

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB(){
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then(m=>m);
  }
  cached.conn = await cached.promise;
  console.log('✅ MongoDB connected (direct URI)');
  return cached.conn;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const TodoSchema = new mongoose.Schema({
  titles: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

export const User = mongoose.models.users || mongoose.model('users', UserSchema);
export const Todo = mongoose.models.todos || mongoose.model('todos', TodoSchema);
