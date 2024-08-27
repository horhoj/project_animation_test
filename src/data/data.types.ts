export interface InfoItem {
  id: string;
  year: number;
  text: string;
}

export interface DataItem {
  id: string;
  title: string;
  startYear: number;
  endYear: number;
  info: InfoItem[];
}
