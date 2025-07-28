import { SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import HeaderContainer from "@/components/shared/HeaderContainer";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <SidebarInset>
        <HeaderContainer />
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default GeneralLayout;
