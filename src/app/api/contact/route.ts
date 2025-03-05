import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    // Validate the input
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Here you would typically send an email or store the message in a database
    console.log("Contact form submission:", { email, message });

    // For now, we'll just return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
