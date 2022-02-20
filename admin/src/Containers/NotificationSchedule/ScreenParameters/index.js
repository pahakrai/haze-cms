import InputParameters from './InputParameters';
import UserProfileParameters from './UserProfileParameters';
import PostParameters from './PostParameters';

export default [
  {
    screen: 'Post',
    lable: 'ID',
    // disabled, placeholder, value = {}, onChange
    ParametersComp: PostParameters,
    parameters: { _id: null }
  }, // parameters { _id(Post) }
  {
    screen: 'Chat',
    lable: 'ID',
    // disabled, placeholder, value = {}, onChange
    ParametersComp: InputParameters,
    parameters: { _id: null }
  }, // parameters { _id(Room) }
  {
    screen: 'UserProfile',
    lable: 'ID',
    // disabled, placeholder, value = {}, onChange
    ParametersComp: UserProfileParameters,
    parameters: { _id: null }
  } // parameters { _id(userId) }
];
