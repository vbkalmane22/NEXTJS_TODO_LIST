export type SortType = "alphabetical" | "status"|"null";
export type Todo = {
    id: number;
    text: string;
    done: boolean;
    category: string;
    date ?:string;
  };