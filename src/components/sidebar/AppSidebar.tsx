"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/assets/logo.png";
import icon from "@/assets/icon.png";
import Link from "next/link";
import { NavMain } from "./NavMain";
import { navMain } from "@/data/nav.data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {state === "expanded" ? (
          <Link
            href={"/dashboard"}
            className="flex items-center justify-between gap-6 mt-2"
          >
            <Image src={logo} alt="logo" width={100} height={100} />
          </Link>
        ) : (
          state === "collapsed" && (
            <Link
              href={"/dashboard"}
              className="flex items-center justify-between gap-6 mt-2"
            >
              <Image
                src={icon}
                alt="logo"
                width={30}
                height={30}
              />
            </Link>
          )
        )}
      </SidebarHeader>
      <SidebarContent className="mt-3">
        <NavMain items={navMain as any} />
      </SidebarContent>
    </Sidebar>
  );
}
