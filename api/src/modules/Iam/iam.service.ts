import {Injectable, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import crypto from '@golpasal/crypto';
import {BaseService} from 'src/core/layers/base.service';

import {CRYPTO_KEY} from './constants';
import {IamSearchModle} from './models';
import {IAM, IAMModel, IamFindOption} from './interfaces';

const {decrypt} = crypto;

@Injectable()
export class IamService extends BaseService<IAM> {
  constructor(
    @InjectModel('Iams') private readonly iamRepository: IAMModel,
    @Inject(CRYPTO_KEY) private readonly cryptoKey: string
  ) {
    super(iamRepository);
  }

  public async find(query: IamSearchModle) {
    return this.iamRepository.find(query).exec();
  }

  public async findOne(
    query: IamSearchModle,
    options: IamFindOption = {decryptCredential: false}
  ) {
    console.log(this.cryptoKey, 'crypto key here');
    // find IAM
    const iam = await this.iamRepository.findOne(query).exec();

    // decrypt credentials if options.decryptCredential = true
    if (iam && options.decryptCredential && options?.fields.length > 0) {
      for (const field of options.fields) {
        // decrypt filed value
        if (iam.credentials[field]) {
          iam.credentials[field] = decrypt(
            iam.credentials[field],
            this.cryptoKey
          );
        }
      }
    }
    return iam;
  }

  public async insertMany(createModels) {
    return this.iamRepository.insertMany(createModels);
  }
}
