import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { contact } = req.body;
  if (!contact || !contact.trim()) {
    return res.status(400).json({ error: "Missing contact info" });
  }

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "calvin@bridgeintelligence.co",
    subject: "New Join Submission",
    html: `<p>New submission from the join page:</p><p><strong>${contact.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</strong></p>`,
  });

  return res.status(200).json({ ok: true });
}
