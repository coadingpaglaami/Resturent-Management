import TranstackProvider from "@/provider/TranstackProvider";
import { NavBar, SideBaar } from "@/webcomponent/ui";

export default async function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full ">
      <aside className="hidden md:flex md:flex-col md:w-64 shadow-md">
        <SideBaar />
      </aside>
      <div className="flex flex-col flex-1 h-screen">
        <nav className="shrink-0">
          <TranstackProvider>
            <NavBar />
          </TranstackProvider>
        </nav>
        <main className="flex-1 overflow-auto max-md:px-4 dark:bg-[#0F172B] bg-[#F8FAFC] lg:px-6 px-2">
          <TranstackProvider>{children}</TranstackProvider>
        </main>
      </div>
    </div>
  );
}
