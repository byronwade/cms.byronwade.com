"use client"

import React, { useEffect, useRef } from 'react'
import { MoreVertical, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BuildBlockProps {
  id: string
  title: string
  subtitle?: string
  status: 'running' | 'crashed' | 'stopped'
  timestamp?: string
  type: 'service' | 'database' | 'cache'
  icon?: React.ReactNode
  volumeInfo?: string
  position: { x: number, y: number }
  isSelected: boolean
  onSelect: (id: string, multiple: boolean) => void
  onPositionChange: (id: string, position: { x: number, y: number }) => void
}

export function BuildBlock({ 
  id,
  title, 
  subtitle, 
  status, 
  timestamp, 
  type,
  icon,
  volumeInfo,
  position,
  isSelected,
  onSelect,
  onPositionChange
}: BuildBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only handle left click
    onSelect(id, e.shiftKey)
  }

  return (
    <div 
      ref={blockRef}
      id={`block-${id}`}
      className={`absolute bg-[#1a1a1a] rounded-lg border ${
        isSelected ? 'border-blue-500' : 'border-[#2a2a2a]'
      } w-[300px] transition-colors hover:border-[#3a3a3a] cursor-move select-none`}
      onMouseDown={handleMouseDown}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h3 className="text-sm font-medium text-white">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onMouseDown={e => e.stopPropagation()} // Prevent dragging when clicking menu
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Logs</DropdownMenuItem>
              <DropdownMenuItem>Restart</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          {status === 'running' && (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">Running</span>
            </>
          )}
          {status === 'crashed' && (
            <>
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-500">
                Crashed {timestamp && `${timestamp}`}
              </span>
            </>
          )}
          {status === 'stopped' && (
            <>
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-500">Stopped</span>
            </>
          )}
        </div>

        {volumeInfo && (
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#2a2a2a]" />
            {volumeInfo}
          </div>
        )}
      </div>
    </div>
  )
}

