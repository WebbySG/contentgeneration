import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the webhook URL from environment variable
    const webhookUrl = process.env.ONBOARD_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          code: 500,
          text: "Webhook URL is not configured",
        },
        { status: 500 }
      );
    }

    // Get the request body (onboarding form data)
    const body = await request.json();

    // Send data to webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if webhook request was successful
    if (!response.ok) {
      return NextResponse.json(
        {
          code: response.status,
          text: "Failed to submit data to webhook",
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({
      code: 200,
      text: "Your data is successfully submitted",
    });
  } catch (error) {
    console.error("Error submitting onboarding data:", error);
    return NextResponse.json(
      {
        code: 500,
        text: "An error occurred while submitting your data",
      },
      { status: 500 }
    );
  }
}

