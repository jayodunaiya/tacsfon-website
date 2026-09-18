"use client";

import { FormEvent, useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

interface NewsletterFormProps {
  variant?: "light" | "dark";
  onSuccess?: () => void;
}

const NewsletterForm = ({
  variant = "dark",
  onSuccess,
}: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isDark = variant === "dark";

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Enter your email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "We couldn't subscribe you right now."
        );
        return;
      }

      setSubmitted(true);
      setEmail("");
      onSuccess?.();
    } catch (error) {
      console.error("Newsletter error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
          <FiCheck size={14} />
        </span>

        <div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Check your inbox.
          </p>

          <p
            className={`mt-1 text-xs leading-5 ${
              isDark ? "text-white/45" : "text-black/50"
            }`}
          >
            Confirm your email to receive fellowship updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex items-center border-b transition-colors ${
          isDark
            ? "border-white/25 focus-within:border-green-400"
            : "border-black/20 focus-within:border-green-700"
        }`}
      >
        <input
          type="email"
          value={email}
          required
          autoComplete="email"
          aria-label="Email address"
          placeholder="Your email address"
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          className={`min-w-0 flex-1 bg-transparent py-4 pr-3 text-sm outline-none ${
            isDark
              ? "text-white placeholder:text-white/30"
              : "text-black placeholder:text-black/35"
          }`}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`group flex shrink-0 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] transition disabled:cursor-not-allowed disabled:opacity-40 ${
            isDark
              ? "text-white hover:text-green-400"
              : "text-black hover:text-green-700"
          }`}
        >
          {isSubmitting ? "Joining..." : "Subscribe"}

          {!isSubmitting && (
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;