import clockSlicer from './clock.slicer';
import usersSlicer from './users.slicer';

import discussThunks from './discuss.thunks';
import discussSlicer from './discuss.slicer';
import networks from './networks';

export const thunks = {
  discuss: discussThunks,
}

export const slicers = {
  clock: clockSlicer,
  users: usersSlicer,
  discuss: discussSlicer,
};

export const actions = {
  clock: clockSlicer.actions,
  users: usersSlicer.actions,
  discuss: discussSlicer.actions,
};

export const reducers = {
  clock: clockSlicer.reducer,
  users: usersSlicer.reducer,
  discuss: discussSlicer.reducer,
}

const Redux = {
  actions,
  thunks,
  networks,

  slicers,
  reducers,
}
export default Redux;