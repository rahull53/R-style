import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { otp, sessionId } = await request.json();

        if (!otp || !sessionId) {
            return NextResponse.json(
                { success: false, error: 'OTP and Session ID are required' },
                { status: 400 }
            );
        }

        const apiKey = '5d2c647c-ec7d-11f0-a6b2-0200cd936042';

        // ✅ CORRECT URL for Verification
        const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`;

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
                message: "OTP Verified Successfully",
                data
            });
        } else {
            return NextResponse.json(
                { success: false, error: data.Details || 'Invalid OTP' },
                { status: 400 }
            );
        }

    } catch (error: any) {
        console.error('2Factor Verification Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
