"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Integration = {
  name: string;
  status: "Connected" | "Disconnected";
  logoUrl: string;
};

const initialIntegrations: Integration[] = [
  {
    name: "Square POS",
    status: "Connected",
    logoUrl: "/settings/square.svg",
  },
  {
    name: "Toast POS",
    status: "Disconnected",
    logoUrl: "/settings/package.svg",
  },
  {
    name: "QuickBooks",
    status: "Disconnected",
    logoUrl: "/settings/love.svg",
  },
  {
    name: "Clover",
    status: "Disconnected",
    logoUrl: "/settings/clover.svg",
  },
];

export const Integration=()=>{
const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);

  const toggleConnection = (name: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.name === name
          ? {
              ...item,
              status: item.status === "Connected" ? "Disconnected" : "Connected",
            }
          : item
      )
    );
  };

  return (
    <div className="py-16 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Integrations</h2>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={integration.logoUrl}
                    alt={`${integration.name} logo`}
                    height={40}
                    width={40}
                    className="w-10 h-10 rounded-md object-contain"
                   
                  />
                  {/* Fallback emoji if image fails */}
                  <span className="hidden text-3xl">
                    {integration.name === "Square POS"
                      ? "▪️"
                      : integration.name === "Toast POS"
                      ? "🥪"
                      : integration.name === "QuickBooks"
                      ? "💚"
                      : "🍀"}
                  </span>

                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <Badge
                      variant="secondary"
                      className={
                        integration.status === "Connected"
                          ? "bg-green-900 text-green-100"
                          : "text-muted-foreground"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant={integration.status === "Connected" ? "destructive" : "default"}
                  onClick={() => toggleConnection(integration.name)}
                >
                  {integration.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    )
}