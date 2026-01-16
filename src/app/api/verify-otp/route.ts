import { NextResponse } from 'next/server';
import { verifyOTPFromDb } from '@/lib/db/otp';

export async function POST(request: Request) {
    try {
        const { otp, sessionId } = await request.json();

        if (!otp || !sessionId) {
            return NextResponse.json(
                { success: false, error: 'OTP and Session ID (Identifier) are required' },
                { status: 400 }
            );
        }

        // Verify OTP from our Firestore database
        const verification = await verifyOTPFromDb(sessionId, otp);

        if (verification.success) {
            return NextResponse.json({
                success: true,
                message: "OTP Verified Successfully"
            });
        } else {
            return NextResponse.json(
                { success: false, error: verification.error || 'Invalid OTP' },
                { status: 400 }
            );
        }

    } catch (error: any) {
        console.error('OTP Verification Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
