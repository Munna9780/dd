import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  
  if (!tag) {
    return NextResponse.json({ error: 'Missing tag parameter' }, { status: 400 })
  }

  try {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
  }
}
