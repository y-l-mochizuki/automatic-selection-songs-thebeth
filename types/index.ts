type Base = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
};

export type Music = Base;

export type Album = Base & {
  musics: Music[];
};
