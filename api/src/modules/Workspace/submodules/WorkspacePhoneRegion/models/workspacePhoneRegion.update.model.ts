import {IsNotEmpty, IsMongoId} from 'class-validator';

export class WorkspacePhoneRegionUpdateModel {
  @IsMongoId()
  @IsNotEmpty()
  workspace: string;

  @IsMongoId()
  @IsNotEmpty()
  phoneRegion: string;
}
