import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, business, type, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "PT Designs Contact <onboarding@resend.dev>",
    to: "Phillip.Treitel@gmail.com",
    replyTo: email,
    subject: `New enquiry from ${name}${business ? ` — ${business}` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
        <h2 style="margin-bottom:24px;">New website enquiry via PT Designs</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1a1a1a;">${email}</a></td></tr>
          ${business ? `<tr><td style="padding:8px 0;color:#666;">Business</td><td style="padding:8px 0;">${business}</td></tr>` : ""}
          ${type ? `<tr><td style="padding:8px 0;color:#666;">Project type</td><td style="padding:8px 0;">${type}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
        <p style="color:#666;margin-bottom:8px;">Message</p>
        <p style="white-space:pre-wrap;line-height:1.6;">${message}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
        <p style="color:#999;font-size:12px;">Sent from ptdesigns.ca contact form. Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send. Please email directly." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
