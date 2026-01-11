import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { mobile } = await request.json();

        if (!mobile) {
            return NextResponse.json(
                { success: false, error: 'Mobile number required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.TWO_FACTOR_API_KEY;

        // ✅ CORRECT URL
        const url = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/AUTOGEN`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'cache-control': 'no-cache'
            }
        });

        const data = await response.json();

        if (data.Status === 'Success') {
            return NextResponse.json({
                success: true,
                sessionId: data.Details,
                data
            });
        } else {
            return NextResponse.json(
                { success: false, error: data.Details || 'Failed to send SMS' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('2Factor Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
