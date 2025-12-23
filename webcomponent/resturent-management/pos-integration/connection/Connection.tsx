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

export const Connection = () => {
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="POS Integration"
        subtitle="Manage your point-of-sale system integrations"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Toast POS */}
        <Card className="dark:bg-gray-900/80 dark:border-gray-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <div className="md:text-4xl">🍞</div>
                  {/* Toast logo placeholder */}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Toast POS</h3>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
              </div>
              <Link2 className="w-5 h-5 md:text-emerald-400" />
            </div>

            <div className="space-y-3 text-sm md:text-gray-400">
              <div className="flex justify-between">
                <span>Last Sync:</span>
                <span className="md:text-gray-300">2025-11-24 08:45 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Next Sync:</span>
                <span className="md:text-gray-300">2025-11-24 09:00 PM</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Now
              </Button>
              <Button
                variant="outline"
                className="dark:border-gray-700 dark:text-gray-300 hover:bg-gray-800"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Square */}
        <Card className="dark:bg-gray-900/80 dark:border-gray-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="dark:bg-gray-600/20 p-3 rounded-lg">
                  <div className="md:text-4xl">🟨</div>
                  {/* Square logo placeholder */}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Square</h3>
                  <Badge
                    variant="secondary"
                    className="mt-1 dark:bg-gray-600/20 dark:text-gray-400 dark:border-gray-600/30"
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Not Connected
                  </Badge>
                </div>
              </div>
              <Link2Off className="w-5 h-5 dark:text-gray-500" />
            </div>

            <div className="mt-12">
              <Button className="w-full dark:bg-gray-700 hover:dark:bg-gray-600 dark:text-gray-200">
                <Link2 className="w-4 h-4 mr-2" />
                Connect Square
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Clover */}
        <Card className="dark:bg-gray-900/80 dark:border-gray-800 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="dark:bg-green-600/20 p-3 rounded-lg">
                  <div className="md:text-4xl">🍀</div>
                  {/* Clover logo placeholder */}
                </div>
                <div>
                  <h3 className="text-lg font-semibold grow">Clover</h3>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-gray-600/20 text-gray-400 border-gray-600/30"
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Not Connected
                  </Badge>
                </div>
              </div>
              <Link2Off className="w-5 h-5 text-gray-500" />
            </div>

            <div className="mt-12">
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200">
                <Link2 className="w-4 h-4 mr-2" />
                Connect Clover
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Details */}
      <div>
        <Card className="dark:bg-gray-900/80 dark:border-gray-800">
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
