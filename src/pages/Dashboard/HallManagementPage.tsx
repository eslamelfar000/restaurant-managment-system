import { useState } from "react";
import { Plus, Minus, Save, Menu, Trash2, Copy, Hash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/shared/layout/PageTransition";
import { ModuleHeader } from "@/components/shared/layout/ModuleHeader";
import { useHallLayout } from "@/modules/DashModules/HallManagement/hooks/useHallLayout";
import { HallBoard } from "@/modules/DashModules/HallManagement/components/HallBoard";
import { HallSidebar } from "@/modules/DashModules/HallManagement/components/HallSidebar";

const HallManagementPage = () => {
  const { 
    layout, 
    selectedIds,
    updateElementPosition, 
    addElement, 
    removeElement, 
    removeSelected,
    copySelected,
    updateElementStatus,
    updateElementNumber,
    updateSelectedNumber,
    updateHallDimensions,
    toggleSelection,
    clearSelection
  } = useHallLayout();

  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <PageTransition className="h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] flex flex-col gap-4 md:gap-6 overflow-y-auto md:overflow-hidden custom-scrollbar">
        <ModuleHeader
          title="Floor Architecture"
          subtitle="Spatial Configuration / Dynamic Seating Management"
          action={
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <div className="flex items-center bg-zinc-100 dark:bg-white/5 rounded-2xl p-1 md:p-1.5 border border-zinc-200 dark:border-white/10 shadow-inner">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-xl"
                >
                  <Minus size={18} />
                </Button>
                <span className="px-2 md:px-3 text-[9px] md:text-[10px] text-zinc-500">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-xl"
                >
                  <Plus size={18} />
                </Button>
              </div>
              <Button className="h-10 md:h-12 px-4 md:px-6 rounded-xl md:rounded-[1.2rem] gap-2 shadow-2xl shadow-primary/20 text-xs md:text-sm">
                <Save size={18} />
                Deploy Layout
              </Button>
            </div>
          }
        />

        {/* Floating Batch Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 flex items-center gap-2 z-[40] animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-200">
            <div className="flex items-center gap-2 px-3 border-r border-zinc-200 dark:border-white/10 mr-1">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                {selectedIds.length} Selected
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2">
              <Hash size={14} className="text-zinc-400" />
              <Input
                placeholder="Mass #"
                className="w-20 h-9 text-[10px] bg-zinc-100 dark:bg-white/5 border-none rounded-lg"
                onChange={(e) => updateSelectedNumber(e.target.value)}
              />
            </div>

            <div className="h-6 w-[1px] bg-zinc-200 dark:border-white/10 mx-1" />

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl text-primary hover:bg-primary/10"
                onClick={copySelected}
              >
                <Copy size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl text-red-500 hover:bg-red-500/10"
                onClick={removeSelected}
              >
                <Trash2 size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl"
                onClick={clearSelection}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 flex md:flex-row flex-col gap-4 md:gap-6 min-h-0 relative">
          <HallBoard
            layout={layout}
            selectedIds={selectedIds}
            zoom={zoom}
            isDragging={isDragging}
            onElementPositionChange={updateElementPosition}
            onElementRemove={removeElement}
            onElementStatusChange={updateElementStatus}
            onToggleSelection={toggleSelection}
            onClearSelection={clearSelection}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              setDraggedId(null);
            }}
            draggedId={draggedId}
            setDraggedId={setDraggedId}
          />

          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <HallSidebar
              layout={layout}
              selectedIds={selectedIds}
              onAddElement={addElement}
              onUpdateDimensions={updateHallDimensions}
              onUpdateNumber={updateElementNumber}
              onUpdateSelectedNumber={updateSelectedNumber}
              onRemoveSelected={removeSelected}
              onCopySelected={copySelected}
              onClearSelection={clearSelection}
            />
          </div>

          {/* Mobile Sidebar Trigger */}
          <div className="md:hidden fixed bottom-6 right-6 z-[100]">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-80 border-none">
                <HallSidebar
                  layout={layout}
                  selectedIds={selectedIds}
                  onAddElement={addElement}
                  onUpdateDimensions={updateHallDimensions}
                  onUpdateNumber={updateElementNumber}
                  onUpdateSelectedNumber={updateSelectedNumber}
                  onRemoveSelected={removeSelected}
                  onCopySelected={copySelected}
                  onClearSelection={clearSelection}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </PageTransition>
    </TooltipProvider>
  );
};

export default HallManagementPage;
