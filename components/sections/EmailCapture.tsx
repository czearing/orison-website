"use client";

import { useState, FormEvent, useEffect } from "react";
import { Label, Caption, Body } from "@/components/common/Typography";
import { useSubscribe } from "@/utils/useSubscribe";
import styles from "./EmailCapture.module.css";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess, isError, reset } = useSubscribe();

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      const timeout = setTimeout(() => reset(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => reset(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isError, reset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Label className={styles.heading}>Join the Procession</Label>
        <Body size="sm" className={styles.subheading}>
          New releases, exclusive content, and early access to what's next
        </Body>

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
            <button
              type="submit"
              className={styles.submit}
              disabled={isPending}
            >
              {isPending ? "Joining..." : "Join Now"}
            </button>
          </div>

          {isSuccess && (
            <Caption className={styles.message}>
              Thank you for joining the procession
            </Caption>
          )}

          {isError && (
            <Caption className={styles.error}>
              Something went wrong. Please try again.
            </Caption>
          )}
        </form>
      </div>
    </section>
  );
}
