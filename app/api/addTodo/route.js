import { connectDB, User, Todo } from '../../../lib/db.js';

import jwt from 'jsonwebtoken';
const JWT_SECRET = 'devsecret';

export async function POST(req){
  await connectDB();
  const { token, title } = await req.json();
  if(!token) return new Response(JSON.stringify({ message: 'No token' }), { status: 401 });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(data.id);
    if(!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    await Todo.create({ titles: title, userId: user._id });
    return new Response(JSON.stringify({ message: 'Created' }), { status: 201 });
  } catch(e){
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 });
  }
}
