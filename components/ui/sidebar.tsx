"use client"

// Note: First import the base shadcn Sidebar component implementation
// This is the customized version for our Webflow-like UI
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
  }
>(({ defaultOpen = true, className, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const state = open ? "expanded" : "collapsed"

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "group/sidebar flex min-h-screen bg-[#1a1a1a]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    className?: string
    onClose?: () => void
  }
>(({ side = "left", className, onClose, children, ...props }, ref) => {
  const { state, open, setOpen } = useSidebar()

  React.useEffect(() => {
    if (!open && onClose) {
      onClose()
    }
  }, [open, onClose])

  return (
    <div
      ref={ref}
      data-side={side}
      data-state={state}
      className={cn(
        "fixed top-10 z-30 h-[calc(100vh-40px)] w-64 bg-[#1a1a1a] text-white",
        side === "left" ? "left-0 border-r border-[#2a2a2a]" : "right-0 border-l border-[#2a2a2a]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b border-gray-800 p-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto p-4 sidebar-scrollbar", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-6", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-2 flex items-center justify-between text-xs text-gray-400", className)}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pl-4", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean
  }
>(({ active, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-md py-1 text-sm text-gray-300 hover:bg-gray-700",
      active && "bg-gray-700 text-white",
      className
    )}
    {...props}
  />
))
SidebarItem.displayName = "SidebarItem"

const SidebarEmptyState = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center rounded-md bg-[#2a2a2a] p-6 text-center",
      className
    )}
    {...props}
  />
))
SidebarEmptyState.displayName = "SidebarEmptyState"

export {
  Sidebar,
  SidebarContent,
  SidebarEmptyState,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  useSidebar,
}

