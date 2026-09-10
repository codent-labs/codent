"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message?: string;
};

export async function subscribeNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please add a valid email address." };
  }

  const endpoint = process.env.NEWSLETTER_ENDPOINT;
  if (!endpoint) {
    return {
      status: "unconfigured",
      message:
        "The newsletter isn't connected to a provider yet — email hello@codentlabs.com and we'll add you.",
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error(`Newsletter API responded ${res.status}`);
    return {
      status: "success",
      message: "You're on the list — roughly once a month, no spam.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Couldn't subscribe right now — try hello@codentlabs.com instead.",
    };
  }
}