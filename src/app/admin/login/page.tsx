"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

const AdminLoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const {
      data,
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (!data.user) {
      setError("Unable to sign in.");
      return;
    }

    router.push("/admin/sermons");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#F7F7F3] px-6 py-24 mt-12 text-black">
      <div className="mx-auto flex min-h-[75vh] max-w-[1400px] items-center justify-center">

        <div className="w-full max-w-md">

          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
              TACSFON Admin
            </p>

            <h1 className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.05em]">
              Welcome back.
            </h1>

            <p className="mt-5 text-sm leading-7 text-black/50">
              Sign in to manage sermons and other website content.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6 border border-black/10 bg-white p-6 md:p-8"
          >

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                autoComplete="email"
                className="w-full border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-green-700"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                autoComplete="current-password"
                className="w-full border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-green-700"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

        </div>
      </div>
    </main>
  );
};

export default AdminLoginPage;