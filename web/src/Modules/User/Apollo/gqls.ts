import gql from "graphql-tag";
import { CURRENT_USER_FIELDS } from "../../Auth/Apollo/gqls";

export const MUTATION_UPDATE_USER_DOCS = (fields = USER_PROFILE_FIELDS) => gql`
  mutation UpdateMyDocs(
    $files: [Upload!]!,
    $fileType: String
    ) {
    updateMyDocs(files:$files,fileType:$fileType) {
      ${fields}
    }
  }
`;

export const MUTATION_UPDATE_USER_PROFILE = (
  fields = USER_PROFILE_FIELDS
) => gql`
  mutation UpdateMyUserProfile(
    $userProfileUpdateModel: UserProfileUpdateModel
    ) {
    updateMyUserProfile(userProfileUpdateModel:$userProfileUpdateModel) {
      ${fields}
    }
  }
`;

export const QUERY_USER_PROFILE = (fields = USER_PROFILE_FIELDS) => gql`
  query myUserProfile{
    myUserProfile{
      ${fields}
    }
  }
`;
export const MUTATION_UPDATE_MY_AVATAR = (fields = CURRENT_USER_FIELDS) => gql`
  mutation updateMyAvatar($images:[Upload!]!){
    updateMyAvatar(images:$images){
      ${fields}
    }
  }
`;
export const USER_PROFILE_FIELDS = `
  user{
    _id
    avatars {
      _id
      fileMeta {
        _id
        uri
      }
      default
    }
    name
    phone
    phoneRegionCode
    status
    email
    username
    firstName
    lastName
    dob
    gender
    userTypes
    isVerified
    verified {
      phone
      email
    }
  }
  merchant{
    _id
    files{
      fileType
      file{
        _id
        uri
        thumbnailUri
      }
      isVerified
    }
    meta
    level{
      _id
      name
    }
  }
  member{
    _id
    files{
      fileType
      file{
        _id
        uri
        thumbnailUri
      }
      isVerified
    }
    meta
    level{
      _id
      name
    }
  }
  balance{
    cash
    point
  }
`;
