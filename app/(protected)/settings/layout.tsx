import { SettingMenu } from "@/webcomponent/resturent-management";
import { Heading } from "@/webcomponent/reusable";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 py-16">
      <Heading
        title="Settings"
        subtitle="Manage your organization, users, and application preferences"
      />

      <div className="flex gap-3.5  rounded-md ">
        <div className="md:w-52 w-8 dark:bg-[#1D293D] box-shadow-card p-2.5 rounded-lg h-fit ">
          <SettingMenu />
        </div>
        <div className="flex-1 dark:bg-[#1D293D] box-shadow-card p-2.5 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
