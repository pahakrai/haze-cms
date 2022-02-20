interface IPage {
  title: Record<string, string>;
  meta: IMeta;
  content: Object;
  layout: IPage;
  path?: string;
  isActive?: boolean;
}
interface IMeta extends Record<string, string> {
  // [key:string]:string
}

interface IPageParam {
  meta: IMeta;
  workspace?: Partial<IWorkspace>;
}
