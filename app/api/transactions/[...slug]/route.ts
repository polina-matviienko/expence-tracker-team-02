import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

const invalidParamsResponse = (message: string) =>
  NextResponse.json({ error: message }, { status: 400 });

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const slug = (await params).slug ?? [];

    if (slug.length !== 1) {
      return invalidParamsResponse(
        'GET /transactions expects exactly one path segment: {type}.'
      );
    }

    const [type] = slug;
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

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const slug = (await params).slug ?? [];

    if (slug.length !== 2) {
      return invalidParamsResponse(
        'PATCH /transactions expects two path segments: {type}/{id}.'
      );
    }

    const [type, id] = slug;
    const body = await request.json();

    const res = await api.patch(`/transactions/${type}/${id}`, body, {
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

export async function DELETE(_request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const slug = (await params).slug ?? [];

    if (slug.length !== 1 && slug.length !== 2) {
      return invalidParamsResponse(
        'DELETE /transactions expects one path segment: {id}. (Legacy format {type}/{id} is also supported.)'
      );
    }

    const id = slug.length === 1 ? slug[0] : slug[1];

    const res = await api.delete(`/transactions/${id}`, {
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
