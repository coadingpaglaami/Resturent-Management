"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidbaarLinks } from "@/data/sidebaarLinks";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
export const SideBaar = () => {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (label: string) => {
    if (openDropdowns.includes(label)) {
      setOpenDropdowns(openDropdowns.filter((l) => l !== label));
    } else {
      setOpenDropdowns([...openDropdowns, label]);
    }
  };
  return (
    <div className="flex flex-col h-full w-64 shadow-md ">
      <div className="flex items-center mb-6 gap-3.5 border-b h-16">
        <Image
          src="/sidebaar/logo.svg"
          alt="logo"
          height={100}
          width={100}
          className="w-10 h-10"
        />
        <span>Food Manager</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {sidbaarLinks.map((link) => {
          const isActive =
            link.href === "/admin/users"
              ? pathname === link.href || pathname.startsWith(`${link.href}/`)
              : pathname === link.href;
          console.log(
            "Link:",
            link.label,
            "isActive:",
            isActive,
            "pathname:",
            pathname,
            "link.href:",
            link.href
          );
          if (link.dropdown) {
            const isOpen = openDropdowns.includes(link.label);
            return (
              <div key={link.label} className="flex flex-col">
                {/* Dropdown Trigger */}
                <div
                  onClick={() => toggleDropdown(link.label)}
                  className={clsx(
                    "flex items-center  p-2 rounded-md cursor-pointer select-none text-[#4A5565] dark:text-gray-300",
                    isActive ? "bg-[#EEF2FF] dark:bg-[#1D293D] " : ""
                  )}
                >
                  <div className="flex items-center gap-2">
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRightIcon
                    className={clsx(
                      "ml-auto transition-transform dark:text-gray-300 text-[#4A5565]",
                      isOpen ? "rotate-90" : ""
                    )}
                  />
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="flex flex-col ml-6 mt-1 gap-1 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {link.dropdown.map((sublink) => {
                        const isSublinkActive = pathname === sublink.href;
                        return (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            className={clsx(
                              "flex items-center gap-2 p-2 rounded-md text-sm",
                              isSublinkActive
                                ? "bg-[#EEF2FF] dark:bg-[#1D293D] border border-primary"
                                : ""
                            )}
                          >
            
                            {sublink.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 p-2 rounded-md cursor-pointer dark:text-gray-300 text-[#4A5565]",
                isActive ? "bg-[#EEF2FF] dark:bg-[#1D293D] " : ""
              )}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
