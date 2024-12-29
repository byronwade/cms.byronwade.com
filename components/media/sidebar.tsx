import { FolderTree, Image, Video, FileText, Music, Filter } from 'lucide-react'
import { CommonSidebar, SidebarSection, SidebarItem } from "@/components/common/sidebar"

interface MediaSidebarProps {
  isOpen: boolean
}

export function MediaSidebar({ isOpen }: MediaSidebarProps) {
  return (
    <CommonSidebar isOpen={isOpen} side="left">
      <SidebarSection title="Files">
        <SidebarItem icon={<FolderTree className="h-4 w-4" />}>
          All Files
        </SidebarItem>
        <SidebarItem icon={<Image className="h-4 w-4" />}>
          Images
        </SidebarItem>
        <SidebarItem icon={<Video className="h-4 w-4" />}>
          Videos
        </SidebarItem>
        <SidebarItem icon={<FileText className="h-4 w-4" />}>
          Documents
        </SidebarItem>
        <SidebarItem icon={<Music className="h-4 w-4" />}>
          Audio
        </SidebarItem>
      </SidebarSection>
      <SidebarSection title="Filters">
        <SidebarItem icon={<Filter className="h-4 w-4" />}>
          Recently Added
        </SidebarItem>
        <SidebarItem icon={<Filter className="h-4 w-4" />}>
          Recently Modified
        </SidebarItem>
      </SidebarSection>
    </CommonSidebar>
  )
}

