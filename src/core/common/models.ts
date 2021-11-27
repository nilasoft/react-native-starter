export interface Entity<ID extends number | string = number> {

  id: ID;

}

export type Data<T extends Entity> = Omit<T, 'id'>;

export type Postable<T extends Entity> = Data<T>;

export type Putable<T extends Entity> = Pick<T, 'id'> & { put: Data<T>; };

export type Patchable<T extends Entity> = Pick<T, 'id'> & { patch: Partial<Data<T>>; };
