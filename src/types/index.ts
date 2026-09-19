export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type ApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
