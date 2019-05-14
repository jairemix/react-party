export interface AdventurerClass {
  id: string;
  title: string;
  calculateHealth(level: number): number;
}
