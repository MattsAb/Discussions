export type Discussion = {
  id: number;
  title: string;
  description: string;
  _count: {
    comments: number;
  };
};