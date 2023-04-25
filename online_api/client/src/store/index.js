import { create } from 'zustand';
import { searchSlice } from './seachSlice';

export const useBoundStore = create((...a) => ({
  ...searchSlice(...a),
}));
