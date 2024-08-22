export type Creature = {
  name: string; // Add more fields as necessary
  ac: string;
  [key: string]: unknown; // Allows for additional fields
};
