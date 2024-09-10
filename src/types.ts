export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type WithoutImageId<T> =Prettify<Omit<T, 'imageId'>>;