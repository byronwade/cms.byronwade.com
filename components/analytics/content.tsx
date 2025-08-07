import { AnalyticsHeader } from './header'

interface AnalyticsContentProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function AnalyticsContent({ sidebarOpen, onToggleSidebar }: AnalyticsContentProps) {
  return (
    <>
      <AnalyticsHeader
        leftSidebarOpen={sidebarOpen}
        rightSidebarOpen={false}
        onToggleLeftSidebar={onToggleSidebar}
        onToggleRightSidebar={() => {}}
      />
      <div 
        className="fixed top-20 bottom-0 left-0 right-0 bg-[#2a2a2a] transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          left: sidebarOpen ? 'var(--sidebar-width)' : '0',
        }}
      >
        <div className="h-full p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4 text-white">Analytics Dashboard</h1>
          <p className="text-gray-300">Welcome to your analytics dashboard. Here you can view various reports and insights about your website's performance.</p>
          {/* Add more analytics content here */}
        </div>
      </div>
    </>
  )
}

