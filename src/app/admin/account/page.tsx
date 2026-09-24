"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";

const AdminAccountPage = () => {
  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    const loadUser =
      async () => {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        setEmail(
          user?.email ?? ""
        );
      };

    loadUser();
  }, []);

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError("");
      setMessage("");

      if (
        password.length < 8
      ) {
        setError(
          "Your new password must contain at least 8 characters."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "The passwords do not match."
        );

        return;
      }

      try {
        setIsSubmitting(true);

        const {
          error:
            updateError,
        } =
          await supabase.auth.updateUser(
            {
              password,
            }
          );

        if (updateError) {
          throw updateError;
        }

        setPassword("");
        setConfirmPassword("");

        setMessage(
          "Your admin password has been updated successfully."
        );
      } catch (err) {
        console.error(
          "Password update failed:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to update your password."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-14">

        {/* HEADER */}
        <section className="border-b border-black/10 pb-8 sm:pb-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-green-700">
            Admin Settings
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Account &
            <span className="block text-green-700">
              Security.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-black/45">
            Manage the account used to
            access the TACSFON LAUTECH
            administration area.
          </p>
        </section>

        <div className="grid gap-8 py-8 md:py-10 lg:grid-cols-[0.75fr_1.25fr]">

          {/* ACCOUNT */}
          <section className="border border-black/10 bg-white p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-white">
              <FiShield />
            </div>

            <p className="mt-8 text-[8px] font-semibold uppercase tracking-[0.22em] text-green-700">
              Administrator
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
              Admin account
            </h2>

            <p className="mt-3 text-xs leading-6 text-black/45">
              This account has access to
              protected website management
              features.
            </p>

            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/30">
                Login Email
              </p>

              <div className="mt-3 flex min-w-0 items-center gap-3">
                <FiMail className="shrink-0 text-green-700" />

                <p className="min-w-0 break-all text-sm font-medium">
                  {email ||
                    "Loading..."}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="flex items-center gap-2 text-xs text-black/45">
                <FiCheck className="text-green-700" />

                Authenticated through Supabase
              </div>
            </div>
          </section>

          {/* PASSWORD */}
          <section className="bg-black p-6 text-white sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-400">
                  Security
                </p>

                <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                  Change password
                </h2>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-700">
                <FiLock />
              </div>
            </div>

            <p className="mt-4 max-w-lg text-xs leading-6 text-white/45">
              Choose a strong password you
              do not use for another
              account.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8"
            >
              <div>
                <label
                  htmlFor="new-password"
                  className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/45"
                >
                  New Password
                </label>

                <div className="relative mt-2">
                  <input
                    id="new-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      password
                    }
                    onChange={(
                      event
                    ) =>
                      setPassword(
                        event.target
                          .value
                      )
                    }
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    className="
                      w-full
                      border border-white/15
                      bg-white/[0.06]
                      px-4 py-4 pr-12
                      text-sm text-white
                      outline-none
                      placeholder:text-white/25
                      focus:border-green-500
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute right-0 top-0
                      flex h-full w-12
                      items-center justify-center
                      text-white/40
                      transition-colors
                      hover:text-white
                    "
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="confirm-password"
                  className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/45"
                >
                  Confirm New Password
                </label>

                <input
                  id="confirm-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event
                  ) =>
                    setConfirmPassword(
                      event.target
                        .value
                    )
                  }
                  autoComplete="new-password"
                  placeholder="Enter password again"
                  className="
                    mt-2 w-full
                    border border-white/15
                    bg-white/[0.06]
                    px-4 py-4
                    text-sm text-white
                    outline-none
                    placeholder:text-white/25
                    focus:border-green-500
                  "
                />
              </div>

              {error && (
                <div className="mt-5 border border-red-400/20 bg-red-400/10 px-4 py-3 text-xs leading-5 text-red-200">
                  {error}
                </div>
              )}

              {message && (
                <div className="mt-5 border border-green-400/20 bg-green-400/10 px-4 py-3 text-xs leading-5 text-green-200">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !password ||
                  !confirmPassword
                }
                className="
                  mt-7
                  inline-flex w-full
                  items-center justify-center
                  gap-2
                  bg-green-700
                  px-6 py-4
                  text-[9px] font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-white
                  transition-colors
                  hover:bg-white
                  hover:text-black
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:w-auto
                "
              >
                <FiLock />

                {isSubmitting
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminAccountPage;