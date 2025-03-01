// /src/app/api/profile/route.ts

import { NextResponse } from 'next/server';
import { getProfile, updateProfile, createProfile } from '@/lib/supabase-functions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

  try {
    const profile = await getProfile(userId);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

  const updates = await request.json();
  try {
    const updatedProfile = await updateProfile(userId, updates);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const profile = await request.json();
  try {
    const newProfile = await createProfile(profile);
    return NextResponse.json(newProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}