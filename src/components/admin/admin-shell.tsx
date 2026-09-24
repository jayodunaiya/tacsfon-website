"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  FiShield,
} from "react-icons/fi";

import AdminNav from "@/components/admin/admin-nav";
import { supabase } from "@/lib/supabase/client";

type AuthState =
  | "checking"
  | "authorized"
  | "unauthorized";

const AdminShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const [
    authState,
    setAuthState,
  ] =
    useState<AuthState>(
      "checking"
    );

  const isLoginPage =
    pathname ===
    "/admin/login";

  useEffect(() => {
    /*
     * Login page must remain publicly
     * accessible.
     */
    if (isLoginPage) {
      setAuthState(
        "authorized"
      );

      return;
    }

    let isMounted = true;

    const verifyAdmin =
      async () => {
        try {
          setAuthState(
            "checking"
          );

          /*
           * 1. Verify that there is a
           * real authenticated Supabase user.
           */
          const {
            data: {
              user,
            },
            error:
              userError,
          } =
            await supabase.auth.getUser();

          if (
            userError ||
            !user
          ) {
            if (
              isMounted
            ) {
              setAuthState(
                "unauthorized"
              );

              router.replace(
                "/admin/login"
              );
            }

            return;
          }

          /*
           * 2. Authentication alone is
           * not enough.
           *
           * Verify that the user exists
           * in your protected admin system.
           */
          const {
            data: isAdmin,
            error:
              adminError,
          } =
            await supabase.rpc(
              "is_admin"
            );

          if (
            adminError ||
            !isAdmin
          ) {
            console.error(
              "Admin authorization failed:",
              adminError
            );

            await supabase.auth.signOut();

            if (
              isMounted
            ) {
              setAuthState(
                "unauthorized"
              );

              router.replace(
                "/admin/login"
              );

              router.refresh();
            }

            return;
          }

          if (isMounted) {
            setAuthState(
              "authorized"
            );
          }
        } catch (error) {
          console.error(
            "Unable to verify admin:",
            error
          );

          await supabase.auth.signOut();

          if (
            isMounted
          ) {
            setAuthState(
              "unauthorized"
            );

            router.replace(
              "/admin/login"
            );

            router.refresh();
          }
        }
      };

    void verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, [
    isLoginPage,
    router,
  ]);

  /*
   * Login must not receive the
   * admin navigation.
   */
  if (isLoginPage) {
    return (
      <>
        {children}
      </>
    );
  }

  /*
   * Don't render protected content
   * while authorization is being
   * determined.
   */
  if (
    authState ===
    "checking"
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F3] px-5">
        <div className="text-center">
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border border-black/10 border-t-green-700" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              <FiShield />
            </div>
          </div>

          <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
            Verifying Admin
          </p>
        </div>
      </main>
    );
  }

  /*
   * Never flash protected content
   * while redirecting.
   */
  if (
    authState ===
    "unauthorized"
  ) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3]">
      <AdminNav />

      <div className="min-h-screen pt-[70px] lg:ml-[250px] lg:pt-0">
        {children}
      </div>
    </div>
  );
};

export default AdminShell;