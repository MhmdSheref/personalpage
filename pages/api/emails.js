export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email } = req.body;

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    try {
        const result = await fetch("https://api.buttondown.email/v1/subscribers", {
            method: "POST",
            headers: {
                Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email_address: email,
                type: "regular",
            }),
        });

        if (!result.ok) {
            const errorData = await result.json();
            return res.status(result.status).json({ error: errorData.detail || "Subscription failed" });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
