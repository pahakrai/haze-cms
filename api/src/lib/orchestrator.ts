export interface IBag {
  [key: string]: any;
}

export type ExecutionFunction<Bag = IBag> = (bag: Bag) => Promise<Bag | void>;
export type RevertFunction<Bag = IBag> = (bag: Bag) => Promise<Bag | void>;

export class Orchestrator<Bag = IBag> {
  execFns: ExecutionFunction<Bag>[] = [];
  revertFns: RevertFunction<Bag>[] = [];
  bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  conduct = (
    execFn: ExecutionFunction<Bag>,
    revertFn?: RevertFunction<Bag>
  ): Orchestrator<Bag> => {
    this.execFns.push(execFn);
    this.revertFns.push(revertFn || (() => null));
    return this;
  };

  start = async (): Promise<Bag> => {
    for (const [index, execFn] of this.execFns.entries()) {
      try {
        this.bag = {...this.bag, ...(await execFn(this.bag))};
      } catch (err) {
        for (let i = index - 1; i >= 0; i--) {
          await this.revertFns[i](this.bag);
        }
        throw err;
      }
    }
    return this.bag;
  };
}
