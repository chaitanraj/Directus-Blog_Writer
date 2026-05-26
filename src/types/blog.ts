export type BlogPost = {
  id: number | string;
  status?: string | null;
  sort?: number | null;
  user_created?: string | null;
  post_data?: string | null;
  date_created?: string | null;
};

export type DirectusSchema = {
  posts: BlogPost[];
};
