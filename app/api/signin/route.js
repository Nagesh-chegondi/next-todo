import { connectDB, User } from '../../../lib/db.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'devsecret';

export async function POST(req){
  await connectDB();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if(!user) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  return new Response(JSON.stringify({ token }), { status: 200 });
}
