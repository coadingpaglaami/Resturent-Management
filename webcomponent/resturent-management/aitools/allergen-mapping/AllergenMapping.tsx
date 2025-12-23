"use client";

import { useEffect, useRef, useState } from "react";
import { Heading } from "@/webcomponent/reusable";
import clsx from "clsx";
import { AnalyzeRecipe } from "./AnalyzeRecipe";
import { BatchAnalysis } from "./BatchAnalysis";
import { AllergenDataReports } from "./AllergenDataReports";


const tabs = [
  { id: "analyze", label: "Analyze Recipe" },
  { id: "batch", label: "Batch Analysis" },
  { id: "reports", label: "View Reports" },
];

export const AllergenMapping = () => {
  const [activeTab, setActiveTab] = useState("analyze");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el) return;

    setIndicator({
      width: el.offsetWidth,
      left: el.offsetLeft,
    });
  }, [activeTab]);

  return (
    <div className="py-16 flex flex-col gap-8">
      <Heading
        title="Allergen Management"
        subtitle="AI-powered allergen detection, manual tagging, and QR code generation for guest safety."
      />

      {/* Tabs */}
      <div className="relative w-fit">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "pb-2 text-sm transition-opacity",
                activeTab === tab.id ? "opacity-100" : "opacity-60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated underline */}
        <span
          className="absolute bottom-0 h-0.5 transition-all duration-300
                      bg-[#155DFC]"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
          }}
        />
      </div>

      {/* Content */}
      <div>
        {activeTab === "analyze" && <AnalyzeRecipe />}
        {activeTab === "batch" && <BatchAnalysis />}
        {activeTab === "reports" && <AllergenDataReports />}
      </div>
    </div>
  );
};
