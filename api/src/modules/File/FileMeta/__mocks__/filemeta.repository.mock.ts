export class Repository {
  public create(): Promise<any> {
    return Promise.resolve({id: '1'});
  }

  public count(): Promise<any> {
    return Promise.resolve(10);
  }

  public deleteById(): Promise<any> {
    return Promise.resolve();
  }

  public find(): Promise<any> {
    return Promise.resolve([{id: '1'}]);
  }

  public findOne(): Promise<any> {
    return Promise.resolve({id: '1'});
  }

  public findOneById(): Promise<any> {
    return Promise.resolve({id: '1'});
  }

  public save(): Promise<any> {
    return Promise.resolve({id: '1'});
  }

  public clear(): Promise<any> {
    return Promise.resolve();
  }

  public update(): Promise<any> {
    return Promise.resolve({id: '1'});
  }

  public insertMany(): Promise<any> {
    return Promise.resolve({id: '1'});
  }
}
