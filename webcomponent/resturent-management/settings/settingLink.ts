import { Building2, Users, AlertTriangle, Scale, Plug, Bell, Paintbrush, LucideIcon } from "lucide-react";

export const settingsLink: { label: string, icon: LucideIcon, href: string }[] = [
    {
        label: "Organization",
        href: '/settings/organization',
        icon: Building2
    },
    {
        label: "Users & Roles",
        href: '/settings/user&roles',
        icon: Users
    },
    {
        label: "Allergens",
        href: '/settings/allergens',
        icon: AlertTriangle
    },
    {
        label: "Units & Conversions",
        href: '/settings/unit&conversions',
        icon: Scale
    },
    {
        label: "Integrations",
        href: '/settings/integrations',
        icon: Plug
    },
    {
        label: "Notifications",
        href: '/settings/notification',
        icon: Bell
    },
    {
        label: "Appearance",
        href: '/settings/appearance',
        icon: Paintbrush
    }
];