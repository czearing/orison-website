"use client";

import { useState, FormEvent } from "react";
import { Label, Caption } from "@/components/common/Typography";
import styles from "./EmailCapture.module.css";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: Implement email capture API
    console.log("Email submitted:", email);

    setStatus("success");
    setEmail("");

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Label className={styles.heading}>Join the congregation</Label>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={styles.input}
              aria-label="Email address"
            />
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>

          {status === "success" && (
            <Caption className={styles.message}>
              Thank you for joining the congregation
            </Caption>
          )}

          {status === "error" && (
            <Caption className={styles.error}>
              Something went wrong. Please try again.
            </Caption>
          )}
        </form>
      </div>
    </section>
  );
}
