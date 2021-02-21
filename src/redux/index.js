import clockSlicer from './clock.slicer';
import usersSlicer from './users.slicer';
import ssconfsSlicer from './ssconfs.slicer';

import discussThunks from './discuss.thunks';
import discussSlicer from './discuss.slicer';

import markingThunks from './marking.thunks';
import markingSlicer from './marking.slicer';

import profileThunks from './profile.thunks';
import profileSlicer from './profile.slicer';

import networks from './networks';

export const thunks = {
  discuss: discussThunks,
  marking: markingThunks,
  profile: profileThunks,
}

export const slicers = {
  clock: clockSlicer,
  users: usersSlicer,
  ssconfs: ssconfsSlicer,
  discuss: discussSlicer,
  marking: markingSlicer,
  profile: profileSlicer,
};

export const actions = {
  clock: clockSlicer.actions,
  users: usersSlicer.actions,
  ssconfs: ssconfsSlicer.actions,
  discuss: discussSlicer.actions,
  marking: markingSlicer.actions,
  profile: profileSlicer.actions,
};

export const reducers = {
  clock: clockSlicer.reducer,
  users: usersSlicer.reducer,
  ssconfs: ssconfsSlicer.reducer,
  discuss: discussSlicer.reducer,
  marking: markingSlicer.reducer,
  profile: profileSlicer.reducer,
}

const Redux = {
  actions,
  thunks,
  networks,

  slicers,
  reducers,
}
export default Redux;