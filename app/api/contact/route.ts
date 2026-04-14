import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, business, type, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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
    }),
  });

  const data = await res.json();

  if (!data.success) {
    console.error("Web3Forms error:", data);
    return NextResponse.json({ error: "Failed to send. Please email directly." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
