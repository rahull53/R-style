import { NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/emailService';
import { saveOTPToDb } from '@/lib/db/otp';

export async function POST(request: Request) {
    try {
        const { mobile, email } = await request.json();

        if (!mobile && !email) {
            return NextResponse.json(
                { success: false, error: 'Mobile or Email is required' },
                { status: 400 }
            );
        }

        // Generate a single 6-digit OTP for both channels
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const identifier = mobile || email; // Identify the user session

        // 1. Save OTP to Firestore for consistent verification
        const saved = await saveOTPToDb(identifier, otp);
        if (!saved) {
            throw new Error("Failed to store OTP in database. Verification will fail.");
        }

        const results: any = {
            sms: { success: false },
            email: { success: false }
        };

        // 2. Send via SMS (2Factor.in)
        if (mobile) {
            try {
                const apiKey = process.env.TWO_FACTOR_API_KEY;
                // Using 2Factor.in Transactional SMS to send our custom OTP
                // Note: This requires a pre-approved template in India (DLT)
                // If this fails, we could fallback to their AUTOGEN but then OTPs wouldn't match.
                // For now, let's try to send it.
                const smsUrl = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/${otp}/OTP_TEMPLATE`;
                const smsRes = await fetch(smsUrl);
                const smsData = await smsRes.json();
                results.sms = { success: smsData.Status === 'Success', data: smsData };

                // Fallback for demo/test: If template fails, use regular message if allowed
                if (!results.sms.success) {
                    console.warn("SMS Template failed, attempting direct SMS...");
                    // This is just a placeholder logic; 2factor varies by account type
                }
            } catch (err) {
                console.error("SMS Sending Error:", err);
            }
        }

        // 3. Send via Email (Nodemailer)
        if (email) {
            const emailRes = await sendOTPEmail(email, otp);
            results.email = emailRes;
        }

        return NextResponse.json({
            success: results.sms.success || results.email.success,
            message: "OTP sent successfully",
            results,
            // We return sessionId as identifier for the frontend to use in verify-otp
            sessionId: identifier
        });

    } catch (error: any) {
        console.error('Send OTP Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
