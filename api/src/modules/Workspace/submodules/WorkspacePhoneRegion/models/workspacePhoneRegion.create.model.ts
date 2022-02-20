import {IsNotEmpty, IsMongoId} from 'class-validator';

export class WorkspacePhoneRegionCreateModel {
  @IsMongoId()
  @IsNotEmpty()
  workspace: string;

  @IsMongoId()
  @IsNotEmpty()
  phoneRegion: string;
}
