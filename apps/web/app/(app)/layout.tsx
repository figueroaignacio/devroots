import { CheckAuth } from "@/modules/auth/components/check-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckAuth>
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-dvh gap-x-3 px-3">
        <aside className="col-span-3 lg:border-r">sidebar</aside>
        <main className="col-span-6 ">
          main content
          {children}
        </main>
        <section className="col-span-3 lg:border-l">other content</section>
      </div>
    </CheckAuth>
  );
}
