import {Entity} from '../../core/common/models';

export interface Blog {

  posts: Record<number, Post>;

  comments: Record<number, Comment>;

  albums: Record<number, Album>;

  photos: Record<number, Photo>;

  todos: Record<number, Todo>;

  users: Record<number, User>;

}

export interface Post extends Entity {

  userId: number;

  title: string;

  body: string;

}

export interface Comment extends Entity {

  postId: number;

  name: string;

  email: string;

  body: string;

}

export interface Album extends Entity {

  userId: number;

  title: string;

}

export interface Photo extends Entity {

  albumId: number;

  title: string;

  url: string;

  thumbnailUrl: string;

}

export interface Todo extends Entity {

  userId: number;

  title: string;

  completed: boolean;

}

export interface User extends Entity {

  name: string;

  username: string;

  email: string;

  address: {

    street: string;

    suite: string;

    city: string;

    zipcode: string;

    geo: {

      lat: string;

      lng: string;

    };

  };

  phone: string;

  website: string;

  company: {

    name: string;

    catchPhrase: string;

    bs: string;

  };

}

export type BlogNavParams = {
  Users: undefined;
  User: {
    id: number;
  };
}
