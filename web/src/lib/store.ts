import { atom } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
import type { PostType} from "@/data/types";
import { logger } from "@nanostores/logger";
import { map } from "nanostores";
import type { UserType } from "@/data/types";


const DEBUG = true;

export const $showAddPost = atom(false);

export function toggleAddPost() {
  $showAddPost.set(!$showAddPost.get());
}

export const $posts = atom<PostType[]>([]);
export const $currentPage = atom(1);
export const $hasMorePosts = atom(true);

export function setPosts(posts: PostType[]) {
  $posts.set(posts);
}

export function appendPosts(newPosts: PostType[]) {
  $posts.set([...$posts.get(), ...newPosts]);
}

export function incrementPage() {
  $currentPage.set($currentPage.get() + 1);
}

export function setHasMorePosts(hasMore: boolean) {
  $hasMorePosts.set(hasMore);
}

export function addPost(post: PostType) {
  //$posts.set([post, ...$posts.get()]);
}

export function removePost(id: string) {
  $posts.set($posts.get().filter((post) => post.id !== id));
}

export function updatePostContent(id: string, content: string) {
  $posts.set(
    $posts.get().map((post) => {
      if (post.id === id) {
        return { ...post, content: content };
      }
      return post;
    }),
  );
}


const defaultUser: UserType = {
  id: "",
  name: "",
  username: "",
};
export const $user = map<UserType>(defaultUser);

export function setUser(user: UserType) {
  $user.set(user);
}

export function clearUser() {
  $user.set(defaultUser);
}

export const $enableFilter = atom(false); // Enable filter to show my posts/comments only

export function setEnableFilter(enable: boolean) {
  $enableFilter.set(enable);
}

DEBUG && logger({ $posts, $currentPage, $hasMorePosts, $user });
