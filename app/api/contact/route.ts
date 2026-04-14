import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, business, type, message, captchaToken } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!captchaToken) {
    return NextResponse.json({ error: "Please complete the captcha." }, { status: 400 });
  }

  if (!process.env.WEB3FORMS_KEY) {
    return NextResponse.json({ error: "Contact form not configured." }, { status: 500 });
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_KEY,
      subject: `New enquiry from ${name}${business ? ` — ${business}` : ""}`,
      from_name: "PT Designs Contact Form",
      name,
      email,
      business: business || "—",
      "project type": type || "—",
      message,
      "h-captcha-response": captchaToken,
    }),
  });

  const rawText = await res.text();
  console.log("Web3Forms status:", res.status, "| body:", rawText.slice(0, 300));

  let data: { success?: boolean; message?: string } = {};
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error("Web3Forms returned non-JSON:", res.status);
    return NextResponse.json({ error: "Failed to send. Please email directly." }, { status: 500 });
  }

  if (!data.success) {
    console.error("Web3Forms error:", data);
    return NextResponse.json({ error: data.message || "Failed to send. Please email directly." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
