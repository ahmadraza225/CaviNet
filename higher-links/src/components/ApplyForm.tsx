"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { submitApplication } from "@/lib/api";
import { EMAIL_RE, cn } from "@/lib/utils";

type Errors = { name?: string; email?: string; form?: string };

const inputClass =
  "mt-1.5 block h-[26px] w-full rounded-lg border border-[#DEDEDE] bg-white px-2.5 text-[11px] text-[#1F1F1F] outline-none transition-[border-color,box-shadow] placeholder:text-[#9A9A9A] focus:border-[#5A7DD9] focus:shadow-[0_0_0_3px_rgba(90,125,217,0.15)] aria-[invalid=true]:border-[#D9534F]";

export function ApplyForm({ slug, brandLabel }: { slug: string; brandLabel: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter your full name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email, like you@example.com.";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (next.name || next.email) return;
    setStatus("sending");
    try {
      await submitApplication({ slug, name: name.trim(), email: email.trim() });
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setErrors({ form: err instanceof Error ? err.message : "Something went wrong. Try again." });
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start">
        <span className="grid size-10 place-items-center rounded-full bg-[#E9EEFB] text-[#5A7DD9]">
          <CircleCheck className="size-5" strokeWidth={2.25} />
        </span>
        <h2 className="mt-4 text-[17px] font-semibold text-[#1F1F1F]">Application sent ✓</h2>
        <p className="mt-1 text-[13px] text-[#6B6B6B]">
          {brandLabel} will be in touch at{" "}
          <span className="font-medium text-[#1F1F1F]">{email.trim()}</span>.
        </p>
        <Link
          href="/"
          className="mt-5 text-[13px] font-medium text-[#5A7DD9] underline-offset-4 hover:underline"
        >
          Back to Higher Links
        </Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <h2 className="text-[15.25px] font-semibold leading-5 tracking-[-0.01em] text-[#1F1F1F]">
        Start your application
      </h2>
      <p className="mt-px text-[9.75px] leading-[14px] text-[#6B6B6B]">
        {brandLabel} sees your application as soon as you send it.
      </p>

      <label
        htmlFor="apply-name"
        className="mt-[16.5px] block text-[11.25px] font-medium leading-4 text-[#1F1F1F]"
      >
        Full name
      </label>
      <input
        id="apply-name"
        name="name"
        autoComplete="name"
        placeholder="Mia Alvarez"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "apply-name-error" : undefined}
        className={inputClass}
      />
      {errors.name && (
        <p id="apply-name-error" className="mt-1 text-[11px] text-[#C9302C]">
          {errors.name}
        </p>
      )}

      <label
        htmlFor="apply-email"
        className="mt-4 block text-[11.25px] font-medium leading-4 text-[#1F1F1F]"
      >
        Email
      </label>
      <input
        id="apply-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "apply-email-error" : undefined}
        className={inputClass}
      />
      {errors.email && (
        <p id="apply-email-error" className="mt-1 text-[11px] text-[#C9302C]">
          {errors.email}
        </p>
      )}

      {errors.form && (
        <p role="alert" className="mt-3 text-[12px] text-[#C9302C]">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "mt-5 flex h-8 w-full items-center justify-center rounded-lg bg-[#5A7DD9] text-[12.75px] font-medium text-white transition-colors hover:bg-[#4C6FCC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A7DD9] focus-visible:ring-offset-2",
          status === "sending" && "cursor-wait opacity-80",
        )}
      >
        {status === "sending" ? "Sending…" : "Continue"}
      </button>
    </form>
  );
}
