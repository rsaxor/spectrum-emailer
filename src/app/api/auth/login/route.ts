import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    const userDoc = querySnapshot.docs[0].data();
    const isPasswordMatch = await bcrypt.compare(password, userDoc.password);

    if (isPasswordMatch) {
      // On success, create the response and set the session cookie
      const response = NextResponse.json({ message: 'Login successful!' });
      response.cookies.set('isLoggedIn', 'true', {
        httpOnly: true, // More secure, prevents client-side script access
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      return response; // Send the response with the cookie
    } else {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}