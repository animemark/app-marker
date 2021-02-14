import clockSlicer from './clock.slicer';
import usersSlicer from './users.slicer';
import ssconfsSlicer from './ssconfs.slicer';

import discussThunks from './discuss.thunks';
import discussSlicer from './discuss.slicer';

import markingThunks from './marking.thunks';
import markingSlicer from './marking.slicer';


import networks from './networks';

export const thunks = {
  discuss: discussThunks,
  marking: markingThunks,
}

export const slicers = {
  clock: clockSlicer,
  users: usersSlicer,
  ssconfs: ssconfsSlicer,
  discuss: discussSlicer,
  marking: markingSlicer,
};

export const actions = {
  clock: clockSlicer.actions,
  users: usersSlicer.actions,
  ssconfs: ssconfsSlicer.actions,
  discuss: discussSlicer.actions,
  marking: markingSlicer.actions,
};

export const reducers = {
  clock: clockSlicer.reducer,
  users: usersSlicer.reducer,
  ssconfs: ssconfsSlicer.reducer,
  discuss: discussSlicer.reducer,
  marking: markingSlicer.reducer,
}

const Redux = {
  actions,
  thunks,
  networks,

  slicers,
  reducers,
}
export default Redux;