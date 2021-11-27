import {createSelector} from '@reduxjs/toolkit';
import _ from 'lodash';
import {passProps, selector} from '../../core/state/state.util';

export const selectBlog = selector(state => state.blog)();

export const selectBlogPosts = selector(state => state.blog.data.posts)();

export const selectBlogComments = selector(state => state.blog.data.comments)();

export const selectBlogAlbums = selector(state => state.blog.data.albums)();

export const selectBlogPhotos = selector(state => state.blog.data.photos)();

export const selectBlogTodos = selector(state => state.blog.data.todos)();

export const selectBlogUsers = selector(state => state.blog.data.users)();

export const selectBlogUserPostList = createSelector(
  [selectBlogPosts, passProps<number>()],
  (posts, userId) => _.filter(posts, {userId})
);

export const selectBlogPostCommentList = createSelector(
  [selectBlogComments, passProps<number>()],
  (comments, postId) => _.filter(comments, {postId})
);

export const selectBlogUserAlbumList = createSelector(
  [selectBlogAlbums, passProps<number>()],
  (albums, userId) => _.filter(albums, {userId})
);

export const selectBlogAlbumPhotoList = createSelector(
  [selectBlogPhotos, passProps<number>()],
  (photos, albumId) => _.filter(photos, {albumId})
);

export const selectBlogUserTodoList = createSelector(
  [selectBlogTodos, passProps<number>()],
  (todos, userId) => _.filter(todos, {userId})
);

export const selectBlogUserList = createSelector(selectBlogUsers, users => _.values(users));

export const selectBlogPost = selector((state, id: number) => state.blog.data.posts[id]);

export const selectBlogComment = selector((state, id: number) => state.blog.data.comments[id]);

export const selectBlogAlbum = selector((state, id: number) => state.blog.data.albums[id]);

export const selectBlogPhoto = selector((state, id: number) => state.blog.data.photos[id]);

export const selectBlogTodo = selector((state, id: number) => state.blog.data.todos[id]);

export const selectBlogUser = selector((state, id: number) => state.blog.data.users[id]);
