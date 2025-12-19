"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/webcomponent/reusable";
import { CheckCheck, Package, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: "alert" | "warning" | "success" | "info";
  read: boolean;
  isNew?: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Low Stock Alert",
    description:
      "Flour (all-purpose) is below minimum stock level (8 units remaining)",
    timestamp: "11/15/2024",
    type: "alert",
    read: false,
    isNew: true,
  },
  {
    id: 2,
    title: "Expiration Warning",
    description: "5 items expiring within 48 hours — review inventory",
    timestamp: "11/15/2024",
    type: "warning",
    read: false,
    isNew: true,
  },
  {
    id: 3,
    title: "Purchase Order Delivered",
    description:
      "PO #1245 from US Foods has been delivered and awaiting receiving",
    timestamp: "11/15/2024",
    type: "success",
    read: false,
    isNew: true,
  },
  {
    id: 4,
    title: "Medication Due",
    description: "Temperature check medications due in the next 15 minutes",
    timestamp: "11/15/2024",
    type: "alert",
    read: false,
    isNew: true,
  },
];

export const Notification = () => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true, isNew: false }))
    );
  };

  const clearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  const getFilteredNotifications = () => {
    if (activeTab === "unread") {
      return notifications.filter((n) => !n.read);
    }
    return notifications;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "border-l-red-500";
      case "warning":
        return "border-l-orange-500";
      case "success":
        return "border-l-green-500";
      case "info":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const filteredNotifications = getFilteredNotifications();
  return (
    <div className="py-16 flex  flex-col gap-6">
      <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
        <Heading
          title="Notifications"
          subtitle={`You have ${unreadCount} unread notifications`}
        />
        <div className="flex md:flex-row flex-col gap-2.5 ">
          <Button
            variant="default"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            onClick={clearRead}
            disabled={notifications.every((n) => !n.read)}
            className="bg-[#FCC7C7] text-red-700 hover:bg-[#DC2626]/80 border border-red-300"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Read
          </Button>
        </div>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "all" | "unread")}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2 bg-blue-600">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No {activeTab === "unread" ? "unread" : ""} notifications at
                  this time.
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notif) => (
                <Card
                  key={notif.id}
                  className={`overflow-hidden border-l-4 ${getTypeColor(
                    notif.type
                  )} ${!notif.read ? "bg-muted/50" : ""}`}
                >
                  <CardContent className="p-5 flex items-start justify-between">
                    <div className="flex-1">
                      <div
                        className={`flex items-center gap-3 w-full  ${
                          notif.isNew ? "md:justify-between w-full" : ""
                        }`}
                      >
                        <div className="flex items-center  gap-2 ">
                          <h4 className="font-semibold">{notif.title}</h4>
                          <span className="flex items-center gap-1.5 p-1.5 rounded-lg border border-gray-300">
                            <Package /> Inventory
                          </span>
                        </div>

                        {notif.isNew && (
                          <Badge className="bg-green-600 text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notif.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {notif.timestamp}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
