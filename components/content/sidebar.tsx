import { FileText, Folder, Image, Video } from 'lucide-react'
import { CommonSidebar, SidebarSection, SidebarItem } from "@/components/common/sidebar"

interface ContentSidebarProps {
  isOpen: boolean
}

export function ContentSidebar({ isOpen }: ContentSidebarProps) {
  return (
    <CommonSidebar isOpen={isOpen} side="left">
      <SidebarSection title="Content">
        <SidebarItem icon={<FileText className="h-4 w-4" />}>
          Home
        </SidebarItem>
        <SidebarItem icon={<FileText className="h-4 w-4" />}>
          About
        </SidebarItem>
        <SidebarItem icon={<FileText className="h-4 w-4" />}>
          Contact
        </SidebarItem>
      </SidebarSection>
      <SidebarSection title="Media">
        <SidebarItem icon={<Image className="h-4 w-4" />}>
          Images
        </SidebarItem>
        <SidebarItem icon={<Video className="h-4 w-4" />}>
          Videos
        </SidebarItem>
      </SidebarSection>
      <SidebarSection title="Collections">
        <SidebarItem icon={<Folder className="h-4 w-4" />}>
          Blog Posts
        </SidebarItem>
        <SidebarItem icon={<Folder className="h-4 w-4" />}>
          Products
        </SidebarItem>
      </SidebarSection>
    </CommonSidebar>
  )
}

