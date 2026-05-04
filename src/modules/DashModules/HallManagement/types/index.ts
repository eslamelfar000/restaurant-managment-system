export type ElementType = 'table-square' | 'table-circle' | 'chair';
export type ChairDirection = 'up' | 'down' | 'left' | 'right';
export type ElementStatus = 'available' | 'occupied' | 'reserved';

export interface FloorElement {
  id: string;
  type: ElementType;
  number: string;
  status: ElementStatus;
  x: number;
  y: number;
  width: number;
  height: number;
  direction?: ChairDirection;
  parentId?: string; // To group chairs with tables
}

export interface HallLayout {
  id: string;
  name: string;
  gridSize: number;
  width: number; // Hall width in pixels/units
  height: number; // Hall height in pixels/units
  elements: FloorElement[];
}
