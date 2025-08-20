export interface DayNightToggleProps {
  theme?: 'light' | 'dark';
  scale?: number;
  onChange?: (theme: 'light' | 'dark') => void;
  className?: string;
}

export interface CloudPosition {
  right: string;
  bottom: string;
}