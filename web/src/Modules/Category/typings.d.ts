interface ICategory {
  _id: string;
  name?: string;
  code?: string;
  children?: ICategory[];
}
