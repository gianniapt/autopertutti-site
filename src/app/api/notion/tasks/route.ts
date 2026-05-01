import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const databaseId = '352767edf3c981c0b6a0d32227e0e6de';
    const notionToken = process.env.NOTION_API_TOKEN;

    if (!notionToken) {
      return NextResponse.json(
        { error: 'Notion API token not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionToken}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch from Notion' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Add CORS headers for cross-origin requests
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Content-Type', 'application/json');

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error fetching Notion tasks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
