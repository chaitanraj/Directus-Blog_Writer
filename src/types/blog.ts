export type DirectusFile = {
  id: string;
  title?: string | null;
  filename_download?: string | null;
};

export type BlogPost = {
  id: number | string;
  slug: string;
  title: string;
  content?: string | null;
  status?: string | null;
  post_data?: string | null;
  cover_image?: string | DirectusFile | null;
  published_at?: string | null;
  date_created?: string | null;
};

export type DirectusSchema = {
  posts: BlogPost[];
  directus_files: DirectusFile[];
};
