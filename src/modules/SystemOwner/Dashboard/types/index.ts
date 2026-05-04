export interface SystemStat {
  label: string;
  value: string;
  icon: any;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  detail: string;
  color: string;
}

export interface SystemActivity {
  id: number;
  type: string;
  title: string;
  target: string;
  time: string;
  icon: any;
  color: string;
  bg: string;
}
