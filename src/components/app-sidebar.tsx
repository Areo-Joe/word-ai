import { Home, Inbox, ChevronDown, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { useGetAllWords } from "@/hooks/words";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

function WordsSideBar() {
  const [open, setOpen] = useState(true);
  const { data: words = [] } = useGetAllWords();

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
    >
      <CollapsibleTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <span>
              <Inbox />
              <span>Words</span>
            </span>
          </SidebarMenuButton>
          <SidebarMenuAction>
            {open ? <ChevronDown /> : <ChevronRight />}
          </SidebarMenuAction>
        </SidebarMenuItem>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {words.map(({ word }) => {
            return (
              <SidebarMenuSubItem key={word}>
                <SidebarMenuButton asChild>
                  <Link to="/word/$word" params={{ word: word }}>
                    <span>{word}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Word AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"home"}>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <WordsSideBar />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
