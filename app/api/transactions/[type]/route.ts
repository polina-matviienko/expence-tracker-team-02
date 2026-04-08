import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

type Props = {
  params: Promise<{ type: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { type } = await params;

    const { searchParams } = new URL(request.url);

    const res = await api.get(`/transactions/${type}`, {
      params: Object.fromEntries(searchParams),
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
