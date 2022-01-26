import { TriTree } from './types';

export const initialTriTree: TriTree = {
  divided: true,
  children: {
    mid: {
      divided: true,
      children: {
        mid: {
          divided: false,
          orientation: 0,
        },
        left: {
          divided: false,
          orientation: 0,
        },
        right: {
          divided: false,
          orientation: 0,
        },
        top: {
          divided: false,
          orientation: 0,
        },
      },
    },
    left: {
      divided: false,
      orientation: 0,
    },
    right: {
      divided: false,
      orientation: 0,
    },
    top: {
      divided: false,
      orientation: 0,
    },
  },
};
