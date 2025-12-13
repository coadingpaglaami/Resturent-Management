"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Assuming Popover is available from the UI library
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BellIcon,
  ChevronDownIcon,
  ChevronRight,
  UserIcon,
  LocationEditIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export const NavBar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // State to control language options visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify the type of the reference

  // Toggle function for showing/hiding the language options
  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is outside the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false); // Close the dropdown when clicking outside
      }
    };

    // Add the event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="justify-between sticky top-0 h-16 flex items-center shadow-md z-10">
      <Select defaultValue="downtown">
        <SelectTrigger className="w-auto flex items-center space-x-2 p-2 rounded-md">
          <LocationEditIcon className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-md shadow-lg w-auto">
          <SelectItem value="airport" className="cursor-pointer p-2">
            Downtown Location
          </SelectItem>
          <SelectItem value="downtown" className="cursor-pointer p-2">
            Airport Location
          </SelectItem>
          <SelectItem value="chinaTown" className="cursor-pointer p-2">
            China Town Location
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Notification Icon */}

      <div className="flex gap-4 items-center">
        <div className="relative">
          <BellIcon />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
        </div>
        <div className="relative bg-green-400 p-2.5 rounded-full -z-10">
          <UserIcon className="" />
        </div>

        <div>
          <span className="font-semibold">John Smith</span>
          <br />
          <span className="text-gray-400">Manager</span>
        </div>

        {/* Use Popover here instead of Dropdown */}
        <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <PopoverTrigger asChild>
            <ChevronDownIcon className="w-4 h-4 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent
            ref={dropdownRef}
            className="rounded-mdshadow-lg w-48"
          >
            <PopoverItem>Profile</PopoverItem>
            <PopoverItem>Appearance</PopoverItem>
            <PopoverItem>
              <Switch
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              />
            </PopoverItem>
            <PopoverItem>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <PopoverItem onClick={toggleLanguage}>
                  <div className="flex items-center justify-between">
                    <span>Language</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </PopoverItem>
              </motion.div>

              {/* Language Options appear after clicking "Language" */}
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    ease: "easeInOut",
                  }}
                >
                  <PopoverItem>English</PopoverItem>
                  <PopoverItem>Spanish</PopoverItem>
                </motion.div>
              )}
            </PopoverItem>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const PopoverItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div className="cursor-pointer p-2" onClick={onClick}>
    {children}
  </div>
);
