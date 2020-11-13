import { omit } from "ramda";
import { Post, PostWithContent } from "../pages/api/posts";

type SortDirection = "asc" | "desc";

export const sortPosts = <T extends Post>(posts: T[], direction: SortDirection = "asc"): T[] =>
  posts.sort((post1, post2) => {
    const d1 = Date.parse(post1.meta.date);
    const d2 = Date.parse(post2.meta.date);

    if (d1 > d2) return direction == "desc" ? -1 : 1;
    return direction == "desc" ? 1 : -1;
  });

// export const sortPostsDescending = (posts: Post[]): Post[] =>
//   posts.sort((post1, post2) =>
//     Date.parse(post1.meta.date ?? "") > Date.parse(post2.meta.date ?? "") ? -1 : 1
//   );

export const getPostRootCoverImagePath = ({ meta: { coverImage }, slug }: Post) =>
  coverImage.startsWith("./") ? `/posts/${slug}/${coverImage.replace("./", "")}` : coverImage;

export const getPostYear = (post: Post): number => new Date(post.meta.date).getFullYear();

export type PostsByYear = {
  [year: number]: Post[];
};

export type PostsByTag<T extends Post> = {
  [tag: string]: T[];
};

export const groupPostsByYear = (posts: Post[]): PostsByYear => {
  let postsByYear: PostsByYear = {};

  for (let post of posts) {
    const year = getPostYear(post);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  }

  return postsByYear;
};

export const groupPostsByTag = <T extends Post>(posts: T[]): PostsByTag<T> => {
  let postsByTag: PostsByTag<T> = {};

  for (let post of posts) {
    for (let tag of post.meta.tags) {
      if (!postsByTag[tag]) postsByTag[tag] = [];
      postsByTag[tag].push(post);
    }
  }

  return postsByTag;
};

export const getPostsByYear = (year: string, posts: Post[]) =>
  groupPostsByYear(posts)[parseInt(year)];

export const getAllYears = (posts: Post[]) => Object.keys(groupPostsByYear(posts));

export const getAllTags = (posts: Post[]) => Object.keys(groupPostsByTag(posts));

export const sortYears = (years: string[], direction: SortDirection = "asc") =>
  years.sort((a, b) => (parseInt(a) - parseInt(b)) * (direction == "desc" ? -1 : 1));

export const removeContentFromPosts = (posts: PostWithContent[]): Post[] =>
  posts.map((post) => omit(["content"], post));
