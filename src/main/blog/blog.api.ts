import Axios from 'axios';
import _ from 'lodash';
import {Entity} from '../../core/common/models';
import {Blog} from './blog.model';

const client = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});

export async function fetch(): Promise<Blog> {
  return {
    posts: await record('posts'),
    comments: await record('comments'),
    albums: await record('albums'),
    photos: await record('photos'),
    todos: await record('todos'),
    users: await record('users')
  };
}

async function record<T extends Entity>(path: keyof Blog): Promise<Record<number, T>> {
  let {data} = await client.get<T[]>(`/${path}`);
  return _.reduce(data, (prev, curr) => _.set(prev, curr.id, curr), {});
}
