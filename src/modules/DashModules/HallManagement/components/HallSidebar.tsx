import {
  Grid3X3,
  Square,
  Circle,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Hash,
  ChevronRight,
  Layers,
  Trash2,
  Copy,
} from "lucide-react";
import { MdChair } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HallLayout, ElementType, ChairDirection } from "../types";
import { Label } from "@/components/ui/label";

interface HallSidebarProps {
  layout: HallLayout;
  selectedIds: string[];
  onAddElement: (type: ElementType, direction?: ChairDirection) => void;
  onUpdateDimensions: (width: number, height: number) => void;
  onUpdateNumber: (id: string, number: string) => void;
  onUpdateSelectedNumber: (number: string) => void;
  onRemoveSelected: () => void;
  onCopySelected: () => void;
  onClearSelection: () => void;
}

export const HallSidebar = ({
  layout,
  selectedIds,
  onAddElement,
  onUpdateDimensions,
  onUpdateNumber,
  onUpdateSelectedNumber,
  onRemoveSelected,
  onCopySelected,
  onClearSelection,
}: HallSidebarProps) => {
  const selectedElement = layout.elements.find((e) => e.id === selectedIds[0]);

  return (
    <div className="w-full md:w-80 border border-dashed bg-primary/5 rounded-md p-2 flex flex-col gap-4 overflow-y-auto custom-scrollbar h-fit md:h-full">
      {selectedIds.length > 1 && (
        <div className="p-6 rounded-md bg-blue-500/10 border border-blue-500/20 shadow-sm space-y-6 animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="text-zinc-900 dark:text-white text-sm">
                Batch Command
              </h4>
              <p className="text-[10px] text-zinc-500">
                {selectedIds.length} elements selected
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-zinc-400 ml-1">
                Mass Numbering
              </Label>
              <Input
                onChange={(e) => onUpdateSelectedNumber(e.target.value)}
                placeholder="Set all to..."
                className="h-12 rounded-xl border-blue-500/20 bg-white dark:bg-black/20 text-center"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="destructive"
                className="flex-1 h-12 rounded-xl gap-2 font-bold"
                onClick={onRemoveSelected}
              >
                <Trash2 size={16} />
                Delete All
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl gap-2 border-primary/20 text-primary font-bold"
                onClick={onCopySelected}
              >
                <Copy size={16} />
                Copy All
              </Button>
              <Button
                variant="outline"
                className="h-12 w-12 rounded-xl border-blue-500/20 text-blue-500"
                onClick={onClearSelection}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbox */}
      <div className="p-6 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm space-y-6">
        <div>
          <h3 className="text-zinc-900 dark:text-white flex items-center gap-2">
            <Grid3X3 size={18} className="text-primary" />
            Toolbox
          </h3>
          <p className="text-[10px] text-zinc-500 tracking-widest mt-1">
            Add floor elements
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] text-zinc-400 tracking-widest">
              Main Tables
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => onAddElement("table-square")}
                className="h-20 flex-col gap-2 rounded-2xl border-dashed"
              >
                <Square size={20} />
                <span className="text-[10px] font-bold">Square</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onAddElement("table-circle")}
                className="h-20 flex-col gap-2 rounded-2xl border-dashed"
              >
                <Circle size={20} />
                <span className="text-[10px] font-bold">Circle</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] text-zinc-400 tracking-widest">
              Seating Options
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { dir: "up", class: "rotate-0" },
                { dir: "down", class: "rotate-180" },
                { dir: "left", class: "-rotate-90" },
                { dir: "right", class: "rotate-90" },
              ].map(({ dir, class: cls }) => (
                <Tooltip key={dir}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() =>
                        onAddElement("chair", dir as ChairDirection)
                      }
                      className="h-12 rounded-xl border-dashed"
                    >
                      <MdChair size={20} className={cn("text-zinc-400", cls)} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Chair {dir.charAt(0).toUpperCase() + dir.slice(1)}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="p-6 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm space-y-6">
        <div>
          <h3 className="text-zinc-900 dark:text-white flex items-center gap-2">
            <Maximize2 size={18} className="text-primary" />
            Hall Dimensions
          </h3>
          <p className="text-[10px] text-zinc-500 tracking-widest mt-1">
            Adjust floor boundaries
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-zinc-400">Width</span>
              <span className="text-xs text-primary">{layout.width}px</span>
            </div>
            <Slider
              value={[layout.width]}
              min={500}
              max={2000}
              step={100}
              onValueChange={([val]) => onUpdateDimensions(val, layout.height)}
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-zinc-400">Height</span>
              <span className="text-xs text-primary">{layout.height}px</span>
            </div>
            <Slider
              value={[layout.height]}
              min={500}
              max={2000}
              step={100}
              onValueChange={([val]) => onUpdateDimensions(layout.width, val)}
            />
          </div>
        </div>
      </div>

      {/* Selection Details */}
      {selectedIds.length === 1 && selectedElement && (
        <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 shadow-sm space-y-6 animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Hash size={18} />
            </div>
            <div>
              <h4 className="text-zinc-900 dark:text-white text-sm">
                Identity Protocol
              </h4>
              <p className="text-[10px] text-zinc-500">Assign tag number</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={selectedElement.number}
              onChange={(e) =>
                onUpdateNumber(selectedElement.id, e.target.value)
              }
              placeholder="Tag #"
              className="h-12 rounded-xl border-primary/20 bg-white dark:bg-black/20 text-center"
            />
            <Button className="h-12 w-12 rounded-xl" onClick={onClearSelection}>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
