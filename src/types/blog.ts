export type BlogPost = {
  id: number | string;
  status?: string | null;
  sort?: number | null;
  user_created?: string | null;
  post_data?: string | null;
  featured_image?:
    | string
    | number
    | { id?: string | number | null; directus_files_id?: string | { id?: string | null } | null }
    | Array<string | number | { id?: string | number | null; directus_files_id?: string | { id?: string | null } | null }>
    | null;
  image?: string | number | { id?: string | number | null } | null;
  date_created?: string | null;
};

export type Comment = {
  id: number | string;
  content?: string | null;
  post?: number | string | BlogPost | null;
  date_created?: string | null;
};

export type DirectusSchema = {
  posts: BlogPost[];
  comments: Comment[];
};
