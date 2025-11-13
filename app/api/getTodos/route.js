import { connectDB, Todo } from '../../../lib/db.js';

import jwt from 'jsonwebtoken';
const JWT_SECRET = 'devsecret';

export async function POST(req){
  await connectDB();
  const { token } = await req.json();
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const todos = await Todo.find({ userId: data.id }).lean();
    return new Response(JSON.stringify({ todos }), { status: 200 });
  } catch(e){
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 });
  }
}
