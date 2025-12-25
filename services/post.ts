import { api } from "@/lib/fetch";
import { IPost } from "@/types/post.type";

export const PostService = {
  getPosts: async (): Promise<IPost[]> => {
    return await api.get("/posts");
  },
};
