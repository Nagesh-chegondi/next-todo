import { connectDB, User } from '../../../lib/db.js';

import bcrypt from 'bcrypt';

export async function POST(req){
  await connectDB();
  const { email, password } = await req.json();
  if(!email || !password) return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
  const exists = await User.findOne({ email });
  if(exists) return new Response(JSON.stringify({ message: 'User exists' }), { status: 409 });
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  return new Response(JSON.stringify({ message: 'ok' }), { status: 201 });
}
