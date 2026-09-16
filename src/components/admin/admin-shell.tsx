"use client";

import { usePathname } from "next/navigation";
import AdminNav from "@/components/admin/admin-nav";

const AdminShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
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