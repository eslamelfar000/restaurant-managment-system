import { useState, useEffect } from "react";
import {
  FloorElement,
  HallLayout,
  ElementType,
  ChairDirection,
} from "../types";

const STORAGE_KEY = "restaurant_hall_layout_v2";

const INITIAL_LAYOUT: HallLayout = {
  id: "main-hall",
  name: "Main Dining Hall",
  gridSize: 20,
  width: 1200,
  height: 800,
  elements: [
    {
      id: "t1",
      number: "1",
      status: "available",
      x: 100,
      y: 100,
      width: 80,
      height: 80,
      type: "table-square",
    },
    {
      id: "c1",
      number: "1",
      status: "available",
      x: 120,
      y: 60,
      width: 50,
      height: 50,
      type: "chair",
      direction: "up",
      parentId: "t1",
    },
  ],
};

export const useHallLayout = () => {
  const [layout, setLayout] = useState<HallLayout>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved ? JSON.parse(saved) : INITIAL_LAYOUT;

    // Migration: Patch old chair sizes
    return {
      ...initial,
      elements: initial.elements.map((el: any) =>
        el.type === "chair" && (el.width < 50 || el.height < 50)
          ? { ...el, width: 50, height: 50 }
          : el,
      ),
    };
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }, [layout]);

  const updateElementPosition = (id: string, x: number, y: number) => {
    setLayout((prev) => {
      const element = prev.elements.find((e) => e.id === id);
      if (!element) return prev;

      const dx = x - element.x;
      const dy = y - element.y;

      // If the moved element is part of a selection, move the whole selection
      if (selectedIds.includes(id)) {
        return {
          ...prev,
          elements: prev.elements.map((e) =>
            selectedIds.includes(e.id) ? { ...e, x: e.x + dx, y: e.y + dy } : e,
          ),
        };
      }

      return {
        ...prev,
        elements: prev.elements.map((e) => (e.id === id ? { ...e, x, y } : e)),
      };
    });
  };

  const addElement = (type: ElementType, direction?: ChairDirection) => {
    const newElement: FloorElement = {
      id: `${type}-${Date.now()}`,
      number: (
        layout.elements.filter((e) => e.type.startsWith("table")).length + 1
      ).toString(),
      status: "available",
      x: 100,
      y: 100,
      width: type === "chair" ? 50 : 80,
      height: type === "chair" ? 50 : 80,
      type,
      direction,
    };

    setLayout((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
  };

  const removeElement = (id: string) => {
    setLayout((prev) => ({
      ...prev,
      elements: prev.elements.filter((e) => e.id !== id),
    }));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const removeSelected = () => {
    setLayout((prev) => ({
      ...prev,
      elements: prev.elements.filter((e) => !selectedIds.includes(e.id)),
    }));
    setSelectedIds([]);
  };

  const copySelected = () => {
    setLayout((prev) => {
      const selectedElements = prev.elements.filter((e) =>
        selectedIds.includes(e.id),
      );
      const copies = selectedElements.map((e) => ({
        ...e,
        id: `${e.type}-${Date.now()}-${Math.random()}`,
        x: e.x + 30,
        y: e.y + 30,
      }));

      return {
        ...prev,
        elements: [...prev.elements, ...copies],
      };
    });
  };

  const updateElementStatus = (id: string, status: FloorElement["status"]) => {
    setLayout((prev) => ({
      ...prev,
      elements: prev.elements.map((e) => (e.id === id ? { ...e, status } : e)),
    }));
  };

  const updateElementNumber = (id: string, number: string) => {
    setLayout((prev) => ({
      ...prev,
      elements: prev.elements.map((e) => (e.id === id ? { ...e, number } : e)),
    }));
  };

  const updateSelectedNumber = (number: string) => {
    setLayout((prev) => ({
      ...prev,
      elements: prev.elements.map((e) =>
        selectedIds.includes(e.id) ? { ...e, number } : e,
      ),
    }));
  };

  const updateHallDimensions = (width: number, height: number) => {
    setLayout((prev) => ({ ...prev, width, height }));
  };

  const toggleSelection = (id: string, multi: boolean) => {
    if (multi) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const clearSelection = () => setSelectedIds([]);

  return {
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
    clearSelection,
  };
};
