"use server";

export type ContactState = {
  status: "idle" | "success" | "error" | "fallback";
  message?: string;
  mailto?: string;
};

const EMAIL = "hello@codentlabs.com";

function buildMailto(input: {
  name: string;
  email: string;
  problem: string;
  timeline: string;
}) {
  const subject = `Project enquiry from ${input.name}`;
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Timeline: ${input.timeline || "Flexible"}`,
    "",
    input.problem,
  ].join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();

  if (name.length < 2) {
    return { status: "error", message: "Please add your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please add a valid email address." };
  }
  if (problem.length < 10) {
    return {
      status: "error",
      message:
        "Tell us a little more about where you're stuck - at least 10 characters.",
    };
  }

  const endpoint = process.env.CONTACT_API_URL;
  const payload = { name, email, timeline, problem };

  // No mail provider configured (see README): degrade to a prefilled mailto so
  // the message still reaches hello@codentlabs.com today.
  if (!endpoint) {
    return {
      status: "fallback",
      message: "Your email draft is open - hit send and it lands at the lab.",
      mailto: buildMailto(payload),
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_API_KEY
          ? { Authorization: `Bearer ${process.env.CONTACT_API_KEY}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Contact API responded ${res.status}`);
    return {
      status: "success",
      message:
        "Got it - we reply with a one-pager within 48 hours. No deck, no follow-ups.",
    };
  } catch {
    return {
      status: "error",
      message: `Message couldn't be sent. Please email us directly at ${EMAIL}.`,
    };
  }
}