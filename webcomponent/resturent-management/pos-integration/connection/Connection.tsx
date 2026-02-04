'use client';
import { Heading } from "@/webcomponent/reusable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Link2,
  Link2Off,
  RefreshCw,
  Settings,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const Connection = () => {
  const router = useRouter();
  const posCards = [
    {
      key: "toast",
      name: "Toast POS",
      logo: "🍞",
      status: "Connected",
      statusIcon: CheckCircle2,
      statusClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      lastSync: "2025-11-24 08:45 AM",
      nextSync: "2025-11-24 09:00 PM",
      actions: [
        {
          label: "Sync Now",
          icon: RefreshCw,
          variant: "default",
          className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white",
        },
        {
          label: "",
          icon: Settings,
          variant: "outline",
          className:
            "dark:border-gray-700 dark:text-gray-300 hover:bg-gray-800",
        },
      ],
      logoBg: "bg-orange-500/20",
      linkIcon: Link2,
    },
    {
      key: "square",
      name: "Square",
      logo: "🟨",
      status: "Not Connected",
      statusIcon: AlertCircle,
      statusClass:
        "dark:bg-gray-600/20 dark:text-gray-400 dark:border-gray-600/30",
      lastSync: null,
      nextSync: null,
      actions: [
        {
          label: "Connect Square",
          icon: Link2,
          variant: "default",
          className:
            "flex-1 dark:bg-gray-700 hover:dark:bg-gray-600 dark:text-gray-200",
        },
      ],
      logoBg: "dark:bg-gray-600/20",
      linkIcon: Link2Off,
      viewurl:"/pos-integration/square",
    },
    {
      key: "clover",
      name: "Clover",
      logo: "🍀",
      status: "Not Connected",
      statusIcon: AlertCircle,
      statusClass: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      lastSync: null,
      nextSync: null,
      actions: [
        {
          label: "Connect Clover",
          icon: Link2,
          variant: "default",
          className: "flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200",
        },
      ],
      viewurl:"/pos-integration/clover",
      logoBg: "dark:bg-green-600/20",
      linkIcon: Link2Off,
    },
  ];

  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="POS Integration"
        subtitle="Manage your point-of-sale system integrations"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posCards.map((pos) => {
          const StatusIcon = pos.statusIcon;
          const LinkIcon = pos.linkIcon;

          return (
            <Card key={pos.key} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`${pos.logoBg} p-3 rounded-lg`}>
                      <div className="md:text-4xl">{pos.logo}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{pos.name}</h3>
                      {pos.status && (
                        <Badge
                          variant="secondary"
                          className={`mt-1 ${pos.statusClass}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {pos.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {LinkIcon && (
                    <LinkIcon className="w-5 h-5 dark:text-gray-500" />
                  )}
                </div>

                {pos.lastSync && pos.nextSync && (
                  <div className="space-y-3 text-sm md:text-gray-400">
                    <div className="flex justify-between">
                      <span>Last Sync:</span>
                      <span className="md:text-gray-300">{pos.lastSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Sync:</span>
                      <span className="md:text-gray-300">{pos.nextSync}</span>
                    </div>
                  </div>
                )}

                <div
                  className={`mt-6 ${
                    pos.actions.length === 1 ? "mt-12" : ""
                  } flex gap-3`}
                >
                  {pos.actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        className={action.className}
                        variant={
                          (action.variant as
                            | "outline"
                            | "default"
                            | "ghost"
                            | "link"
                            | "destructive"
                            | "primary"
                            | "secondary"
                            | "secondaryTwo"
                            | "buttonBlue") || "default"
                        }
                      
                      >
                        {Icon && <Icon className="" />}
                        {action.label}
                      </Button>
                    );
                  })}
                  <Button className="" variant={"outline"} onClick={()=>router.push(pos.viewurl || '#')}>
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Connection Details */}
      <div>
        <Card className="">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8">Connection Details</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Toast Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-lg font-medium">Toast POS - Connected</h3>
                  <Badge className="dark:bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Healthy
                  </Badge>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="dark:text-gray-500">API Status</span>
                    <p className="dark:text-gray-300 mt-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Healthy
                    </p>
                  </div>
                  <div>
                    <span className="dark:text-gray-500">
                      Last Transaction Sync
                    </span>
                    <p className="dark:text-gray-300 mt-1">
                      2025-11-24 08:45 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Sync Mode */}
              <div className="space-y-6">
                <div>
                  <span className="dark:text-gray-500">Data Sync Mode</span>
                  <p className="text-lg font-medium dark:text-gray-200 mt-1">
                    Automatic (Every 15 min)
                  </p>
                </div>
                <Separator className="dark:bg-gray-800" />
                <div>
                  <span className="dark:text-gray-500">
                    Total Transactions Synced
                  </span>
                  <p className="text-2xl font-bold dark:text-gray-100 mt-2">
                    12,456
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
