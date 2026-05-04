import { CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { MdChair } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FloorElement as IFloorElement } from "../types";

interface FloorElementProps {
  element: IFloorElement;
  isSelected: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onClick: (e: React.MouseEvent) => void;
  onRemove: (id: string) => void;
  onUpdateStatus: (id: string, status: IFloorElement['status']) => void;
}

export const FloorElement = ({
  element: el,
  isSelected,
  onDragStart,
  onDragEnd,
  onClick,
  onRemove,
  onUpdateStatus
}: FloorElementProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, el.id)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "absolute flex items-center justify-center cursor-move select-none group",
        isSelected ? "ring-2 ring-primary ring-offset-4 ring-offset-white dark:ring-offset-zinc-900 z-[100]" : "z-50"
      )}
      style={{
        left: el.x,
        top: el.y,
        width: el.width,
        height: el.height,
        borderRadius: el.type === 'table-circle' ? '50%' : '12px',
        backgroundColor: isSelected 
          ? 'hsl(var(--primary) / 0.15)' 
          : (el.type.startsWith('table') 
            ? (el.status === 'available' ? 'hsl(var(--primary) / 0.05)' : 'rgba(0,0,0,0.05)')
            : 'rgba(0,0,0,0.02)'),
        border: `2px solid ${isSelected ? 'hsl(var(--primary))' : (el.type.startsWith('table') ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--primary) / 0.4)')}`,
        boxShadow: isSelected ? '0 0 20px hsl(var(--primary) / 0.2), 0 10px 30px rgba(0,0,0,0.1)' : 'none',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <div className="flex flex-col items-center justify-center h-full w-full ">
        {el.type === 'chair' && (
          <div className={cn(
            "text-zinc-400 group-hover:text-primary transition-colors flex items-center justify-center",
            el.direction === 'up' && "rotate-0",
            el.direction === 'down' && "rotate-180",
            el.direction === 'left' && "-rotate-90",
            el.direction === 'right' && "rotate-90",
          )}>
            <MdChair size={32} />
          </div>
        )}
        <span className="text-[12px] opacity-50 leading-none">{el.number}</span>
      </div>

      {/* Status Indicator */}
      {el.type.startsWith('table') && (
        <div className={cn(
          "absolute top-2 right-2 h-2 w-2 rounded-full",
          el.status === 'available' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-zinc-400"
        )} />
      )}

      {/* Element Actions */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-2xl z-[110]">
         <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onRemove(el.id); }} className="h-7 w-7 rounded-lg text-red-500">
            <Trash2 size={12} />
         </Button>
         {el.type.startsWith('table') && (
           <Button variant="ghost" size="icon" onClick={(e) => { 
             e.stopPropagation(); 
             onUpdateStatus(el.id, el.status === 'available' ? 'occupied' : 'available'); 
           }} className="h-7 w-7 rounded-lg">
              {el.status === 'available' ? <CheckCircle2 size={12} className="text-green-500" /> : <XCircle size={12} />}
           </Button>
         )}
      </div>
    </div>
  );
};
