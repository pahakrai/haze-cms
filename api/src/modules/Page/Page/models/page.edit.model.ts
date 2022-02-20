export class PageEditModel {
  readonly title: object;
  readonly path: string;
  readonly remarks: string;
  readonly workspace: string;
  readonly layout: string;
  readonly type: string;
  readonly content: object;
  readonly version: number;
  readonly diffNodes: Array<{
    version: number;
    up: object;
    down: object;
    date: string;
  }>;
  readonly isActive: boolean;
}
