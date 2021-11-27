import {schema} from 'normalizr';
import {Album, Comment, Photo, Post, Todo, User} from './blog.model';

export const post = new schema.Entity<Post>('posts');

export const comment = new schema.Entity<Comment>('comments');

export const album = new schema.Entity<Album>('albums');

export const photo = new schema.Entity<Photo>('photos');

export const todo = new schema.Entity<Todo>('todos');

export const user = new schema.Entity<User>('users');

post.define({
  comments: [comment]
});

album.define({
  photos: [photo]
});

user.define({
  posts: [post],
  albums: [album],
  todos: [todo]
});
