import {Injectable} from '@nestjs/common';

const excelToJson = require('convert-excel-to-json');

@Injectable()
export class DataMappingService {
  constructor() {}

  /**
   * importDataMappingsFromExcel
   */
  public async importDataMappingsFromExcel(file: any) {
    const results: any = excelToJson({
      sourceFile: file.path,
      header: {
        rows: 1
      },
      columnToKey: {
        A: 'code',
        B: 'sku',
        C: 'name_en',
        D: 'name_zhhk',
        E: 'name_zhcn',
        F: 'description_en',
        G: 'description_zhhk',
        H: 'description_zhcn',
        I: 'platformTypes',
        J: 'category',
        K: 'content_en',
        L: 'content_zhhk',
        M: 'content_zhcn',
        N: 'sku_qty',
        O: 'sku_currency',
        P: 'sku_amount',
        Q: 'sku_discountAmount',
        R: 'Attribute_Name',
        S: 'Attribute_Values'
      }
    });
    let datamappingList = [];
    const dataMapping_Promise_list = [];

    async function dataMappingObj(result) {
      const datamapping: any = {
        ...result
      };
      return datamapping;
    }

    for (const key of Object.keys(results)) {
      for (const result of results[key]) {
        dataMapping_Promise_list.push(dataMappingObj(result));
      }
    }
    datamappingList = await Promise.all(dataMapping_Promise_list);
    return datamappingList;
  }

  public async dataMappingToOrder(file: any, rows: 1, columnToKey: {}) {
    const results: any = excelToJson({
      sourceFile: file.path,
      header: {
        rows: rows
      },
      columnToKey: {
        ...columnToKey
      }
    });

    let datamappingList = [];
    const dataMapping_Promise_list = [];

    async function dataMappingObj(result) {
      const datamapping: any = {
        ...result
      };
      return datamapping;
    }

    for (const key of Object.keys(results)) {
      for (const result of results[key]) {
        dataMapping_Promise_list.push(dataMappingObj(result));
      }
    }
    datamappingList = await Promise.all(dataMapping_Promise_list);
    return datamappingList;
  }
}
