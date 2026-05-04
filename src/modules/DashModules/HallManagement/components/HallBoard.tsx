import { useState, useRef, useEffect } from "react";
import { HallLayout } from "../types";
import { FloorElement } from "./FloorElement";

interface HallBoardProps {
  layout: HallLayout;
  selectedIds: string[];
  zoom: number;
  isDragging: boolean;
  onElementPositionChange: (id: string, x: number, y: number) => void;
  onElementRemove: (id: string) => void;
  onElementStatusChange: (id: string, status: any) => void;
  onToggleSelection: (id: string, multi: boolean) => void;
  onClearSelection: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  draggedId: string | null;
  setDraggedId: (id: string | null) => void;
}

export const HallBoard = ({
  layout,
  selectedIds,
  zoom,
  isDragging,
  onElementPositionChange,
  onElementRemove,
  onElementStatusChange,
  onToggleSelection,
  onClearSelection,
  onDragStart,
  onDragEnd,
  draggedId,
  setDraggedId
}: HallBoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectionBox, setSelectionBox] = useState<{ startX: number, startY: number, currentX: number, currentY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('hall-canvas')) return;
    
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    setSelectionBox({ startX: x, startY: y, currentX: x, currentY: y });
    if (!e.ctrlKey && !e.metaKey) onClearSelection();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectionBox || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    setSelectionBox(prev => prev ? { ...prev, currentX: x, currentY: y } : null);

    // Calculate selection
    const left = Math.min(selectionBox.startX, x);
    const top = Math.min(selectionBox.startY, y);
    const right = Math.max(selectionBox.startX, x);
    const bottom = Math.max(selectionBox.startY, y);

    layout.elements.forEach(el => {
      const isInside = (
        el.x < right &&
        el.x + el.width > left &&
        el.y < bottom &&
        el.y + el.height > top
      );
      if (isInside && !selectedIds.includes(el.id)) {
        onToggleSelection(el.id, true);
      }
    });
  };

  const handleMouseUp = () => {
    setSelectionBox(null);
  };

  useEffect(() => {
    if (selectionBox) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [selectionBox]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    const el = layout.elements.find(item => item.id === id);
    if (el && boardRef.current) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / zoom;
      const offsetY = (e.clientY - rect.top) / zoom;
      setDragOffset({ x: offsetX, y: offsetY });
    }
    
    e.dataTransfer.setData("elementId", id);
    setDraggedId(id);
    onDragStart();
    
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const primaryEl = layout.elements.find(e => e.id === draggedId);
    if (!primaryEl) return;

    // Proposed new position for the primary element
    let newX = (e.clientX - rect.left) / zoom - dragOffset.x;
    let newY = (e.clientY - rect.top) / zoom - dragOffset.y;

    // If part of a selection, clamp based on the entire group's bounding box
    if (selectedIds.includes(draggedId)) {
      const selectedElements = layout.elements.filter(el => selectedIds.includes(el.id));
      
      const minX = Math.min(...selectedElements.map(el => el.x));
      const minY = Math.min(...selectedElements.map(el => el.y));
      const maxX = Math.max(...selectedElements.map(el => el.x + el.width));
      const maxY = Math.max(...selectedElements.map(el => el.y + el.height));

      const dx = newX - primaryEl.x;
      const dy = newY - primaryEl.y;

      // Clamp deltas
      const clampedDx = Math.max(-minX, Math.min(dx, layout.width - maxX));
      const clampedDy = Math.max(-minY, Math.min(dy, layout.height - maxY));

      newX = primaryEl.x + clampedDx;
      newY = primaryEl.y + clampedDy;
    } else {
      // Simple individual clamping
      newX = Math.max(0, Math.min(newX, layout.width - primaryEl.width));
      newY = Math.max(0, Math.min(newY, layout.height - primaryEl.height));
    }

    onElementPositionChange(draggedId, newX, newY);
  };

  return (
    <div 
      className="flex-1 min-h-[400px] md:min-h-0 bg-zinc-100 dark:bg-black/20 rounded-lg border border-zinc-200 dark:border-white/5 overflow-auto custom-scrollbar relative"
      onClick={(e) => e.target === e.currentTarget && onClearSelection()}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={boardRef}
        className="bg-white dark:bg-zinc-900 shadow-2xl relative rounded-lg border border-zinc-300 dark:border-white/10 hall-canvas"
        style={{ 
          width: layout.width, 
          height: layout.height,
          transform: `scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center'
        }}
        onDragOver={handleDragOver}
      >
        {/* Selection Box Visual */}
        {selectionBox && (
          <div 
            className="absolute border-2 border-primary bg-primary/10 z-[200] pointer-events-none rounded-sm"
            style={{
              left: Math.min(selectionBox.startX, selectionBox.currentX),
              top: Math.min(selectionBox.startY, selectionBox.currentY),
              width: Math.abs(selectionBox.currentX - selectionBox.startX),
              height: Math.abs(selectionBox.currentY - selectionBox.startY),
            }}
          />
        )}

        {layout.elements.map((el) => (
          <FloorElement
            key={el.id}
            element={el}
            isSelected={selectedIds.includes(el.id)}
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelection(el.id, e.ctrlKey || e.metaKey);
            }}
            onRemove={onElementRemove}
            onUpdateStatus={onElementStatusChange}
          />
        ))}
      </div>
    </div>
  );
};
