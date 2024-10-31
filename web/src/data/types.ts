export type PostType = {
  id: string;
  content: string;
  date: string;
  author: UserType;
};


export type UserType = {
  id: string;
  name: string;
  username: string;
};
