import { connectDB, Todo} from '../../../lib/db.js';

import jwt from 'jsonwebtoken';
const JWT_SECRET = 'devsecret';

export async function POST(req){
  await connectDB();
  const { token, title } = await req.json();
  try {
    const data = jwt.verify(token, JWT_SECRET);
    await Todo.deleteOne({ titles: title, userId: data.id });
    return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
  } catch(e){
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 });
  }
}
