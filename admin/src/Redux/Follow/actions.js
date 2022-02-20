import { createActions } from 'reduxsauce';

export let { Types, Creators } = createActions(
  {
    getUserFollowCount: ['userId'],
    setUserFollowCountIds: ['ids'],
    reset: null
  },
  { prefix: '_FOLLOWER_' }
);

export const FollowerTypes = Types;
export default Creators;
