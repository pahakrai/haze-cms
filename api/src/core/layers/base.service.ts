import {
  Model as MongooseModel,
  Document as MongooseDocument,
  PaginateModel as MongoosePaginateModel
} from 'mongoose';
import _get from 'lodash/get';
import _set from 'lodash/set';

export type ICustomPopulateFunction<T> = (
  doc: T,
  fields: {[key: string]: any}
) => Promise<T>;

export class BaseService<_Document extends MongooseDocument> {
  // prettier-ignore
  protected repository: MongooseModel<_Document> | MongoosePaginateModel<_Document>;
  protected customPopulateFns: {
    [populatePath: string]: ICustomPopulateFunction<_Document>;
  } = {};

  public constructor(
    repository?: MongooseModel<_Document> | MongoosePaginateModel<_Document>
  ) {
    this.repository = repository;
  }

  /**
   * add a custom populate field
   *
   * @param populatePath field name to be populated
   * @param handleFn handler function, which return a mongoose.Document
   */
  protected async _addCustomPopulate(
    populatePath: string,
    handleFn: ICustomPopulateFunction<_Document>
  ) {
    this.customPopulateFns[populatePath] = handleFn;
  }

  /**
   * map to display mode
   * @param data data source
   * @param lang current language
   */
  public _mapToDisplay(data, lang: string) {
    if (data.toJSON) {
      data = data.toJSON();
    }
    if (data instanceof Array) {
      data.forEach((d, index) => {
        if (d && typeof d === 'object') {
          if (d.en && d['zh-hk'] && d['zh-cn']) {
            data[index] = d[lang];
          } else if (d._bsontype === 'ObjectId') {
            data[index] = d.toString();
          } else if (d._doc) {
            data[index] = d._doc;
            d = data[index];
            this._mapToDisplay(data[index], lang);
          } else if (typeof data === 'object') {
            this._mapToDisplay(data[index], lang);
          }
        }
      });
    } else if (typeof data === 'object') {
      const props = Object.keys(data);
      props.forEach(prop => {
        let currentValue = data[prop];
        if (prop === '_id') {
          data[prop] = currentValue.toString();
          currentValue = data[prop];
        }
        if (currentValue && typeof currentValue === 'object') {
          if (
            currentValue.en &&
            currentValue['zh-hk'] &&
            currentValue['zh-cn']
          ) {
            data[prop] = currentValue[lang];
          } else if (currentValue._bsontype === 'ObjectId') {
            data[prop] = currentValue.toString();
          } else if (currentValue._doc) {
            data[prop] = currentValue._doc;
            currentValue = data[prop];
            this._mapToDisplay(data[prop], lang);
          } else if (typeof data === 'object') {
            this._mapToDisplay(data[prop], lang);
          }
        }
      });
    }
  }

  /**
   * populate document based on fields defined in client side
   * @param docs mongooce document(s)
   * @param repo repository
   * @param populates array of fields to be populated
   */
  public async _populate<T = any>(
    docs: T,
    populates = [],
    options: {
      populateFields?: {[populatePath: string]: any};
      repo?: any;
    } = {}
  ): Promise<T | null> {
    const opts = {
      populateFields: {},
      ...options
    };
    // repo can be overwrite
    const repo = opts.repo || this.repository;

    if (populates.length) {
      // go through each populate to build a populate object array
      const populate = populates.reduce((popObj, popStr) => {
        // split the populate string by '.'
        const popParts = popStr.split('.');
        // regex for identifying non-populate fields (string starting with $)
        const nonPopulateRegex = /^\$\w+$/;
        // rebuilt path from according to populate or non-populate
        const currentPopObjKeyPath = [];
        // array of fields to be grouped for non-populate fields
        const groupField = [];

        for (const popPart of popParts) {
          // add to groupField
          groupField.push(popPart.replace('$', ''));
          // if not nonPopulate field, add to popObj
          if (!nonPopulateRegex.test(popPart)) {
            // add new path to current key path array
            currentPopObjKeyPath.push(groupField.join('.'));
            // get existing field from current key path
            const existingField = _get(popObj, currentPopObjKeyPath);
            // if current key path not exist, add it
            if (!existingField) {
              _set(popObj, currentPopObjKeyPath, {});
            }
            // clear group field since we've used it
            groupField.splice(0);
          }
        }
        // return updated popObj
        return popObj;
      }, {});

      const buildPopulate = pop => {
        // for each item in pop object, create a populate structure
        return Object.keys(pop).map(o => ({
          path: o,
          populate: Object.keys(pop[o]).length
            ? buildPopulate(pop[o])
            : undefined
        }));
      };
      // build a recursive populate from basic populate object
      const builtPopulate = buildPopulate(populate);
      // run repo populate with built populate object
      let result = await repo.populate(docs, builtPopulate);
      // go through each custom populate functions,
      // and update doc based on the function
      result = await Object.keys(this.customPopulateFns)
        .filter(populatePath => {
          return populates.some(p => {
            const regex = new RegExp(`^${populatePath.replace('$', '\\$')}`);
            return regex.test(p);
          });
        })
        .reduce(async (docsArrOrObj, customPopulateFnKey) => {
          const thisDoc = await docsArrOrObj;
          return Array.isArray(thisDoc)
            ? Promise.all(
                thisDoc.map(async d =>
                  this.customPopulateFns[customPopulateFnKey](
                    d,
                    opts.populateFields[customPopulateFnKey]
                  )
                )
              )
            : this.customPopulateFns[customPopulateFnKey](
                thisDoc,
                opts.populateFields[customPopulateFnKey]
              );
        }, result);
      // return document result
      return result;
    }
    // populates empty, so return original docs
    return docs;
  }
}
