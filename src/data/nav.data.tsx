import {
  Bell,
  CircleDollarSign,
  ClipboardList,
  Crown,
  Settings,
} from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navMain: TNavMain = [
  {
    title: "Company List",
    url: "/dashboard/company-list",
    icon: <ClipboardList />,
  },
  {
    title: "Earning Overview",
    url: "/dashboard/earnings",
    icon: <CircleDollarSign />,
  },
  {
    title: "Subscription Plans",
    url: "/dashboard/subscription-plans",
    icon: <Crown />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
];
