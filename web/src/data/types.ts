export type PostType = {
  id: number;              // Match integer type from backend
  content: string;
  date: number;            // Keep date as timestamp integer
  userId: number;          // Use userId directly, without full UserType
};



export type UserType = {
  id: string;
  name: string;
  username: string;
};
