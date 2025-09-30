import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Initialize Mailjet client
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY || "",
      apiSecret: process.env.MAILJET_API_SECRET || "",
    });

    // Add contact to Mailjet contact list
    const result = await mailjet
      .post("contact", { version: "v3" })
      .request({
        IsExcludedFromCampaigns: false,
        Email: email,
      });

    // Optionally add to a specific contact list
    if (process.env.MAILJET_LIST_ID) {
      await mailjet
        .post("contactslist", { version: "v3" })
        .id(process.env.MAILJET_LIST_ID)
        .action("managecontact")
        .request({
          Action: "addnoforce",
          Email: email,
        });
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Mailjet subscription error:", error);

    // Handle duplicate contact error (already subscribed)
    if (error.statusCode === 400) {
      return NextResponse.json(
        { message: "Already subscribed!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
