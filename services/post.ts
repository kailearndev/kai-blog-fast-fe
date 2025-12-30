import { api } from "@/lib/fetch";
import { IPost } from "@/types/post.type";
import { IResponse } from "@/types/reponse";

export const PostService = {
  getPosts: async (): Promise<IResponse<IPost[]>> => {
    return await api.get("/posts", {
      next: { revalidate: 120 }, //  phút làm mới cache một lần
    });
  },
};
