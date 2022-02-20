import {IsString, ValidateNested} from 'class-validator';

class PolicyStatementCreateModel {
  @IsString()
  Effect: string;

  @IsString({each: true})
  Action: string[];

  @IsString()
  Resource: string;
}

export class PolicyCreateModel {
  @IsString()
  name: string;

  @ValidateNested()
  Statement: PolicyStatementCreateModel[];
}
