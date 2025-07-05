import { useState } from "react";
import styles from "@/styles/subForm.module.css";

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("Sending...");

        const res = await fetch("/api/emails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            setStatus("Subscribed!");
            setEmail("");
        } else {
            setStatus(data.error || "Error subscribing");
        }
    }

    return (
        <form className={styles.SubscribeForm} onSubmit={handleSubmit}>
            <h2>Join the Mailing List:</h2>
            <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
                Subscribe
            </button>
            <span className={styles.status}>{status}</span>
        </form>
    );
}