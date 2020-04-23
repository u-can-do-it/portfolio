export async function sendEmail(data) {
  try {
    let response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Try again later");
  } catch (e) {
    return e.message;
  }
}
