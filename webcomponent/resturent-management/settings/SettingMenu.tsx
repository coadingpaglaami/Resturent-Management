'use client';
import { usePathname } from "next/navigation";
import { settingsLink } from "./settingLink";
import Link from "next/link";
import clsx from "clsx";

export const SettingMenu = () => {
    const pathname = usePathname();
    return (
        <>
            {settingsLink.map((link, idx) => {
                const isActive = pathname === link.href;
                return(
                                <Link
              key={idx}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 p-2 rounded-md cursor-pointer dark:text-gray-300 text-[#4A5565]",
                isActive ? "dark:bg-[#155DFC] bg-[#4338CA] text-white" : ""
              )}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
                )
                
            })}
        </>
    );
}