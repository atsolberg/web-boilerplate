/**
 * Example data store for blog posts
 * Store reducers use immer for immutability.
 */

import { createContext, useContext } from 'react';
import produce from 'immer';

import { providerError } from './store';
import { entityTable } from './array';

const defaultState = {
  loading: true,
  fetching: false,

  posts: {
    byId: {},
    allIds: [],
    active: null
  },

  reviews: {
    byId: {},
    allIds: []
  }
};

/**
 * Fetch blog posts and return a promise.
 * @returns {JQuery.jqXHR}
 */
function fetchPosts(dispatch) {
  dispatch({ type: 'fetching', payload: true });

  const dfd = $.ajax({
    url: '/api/my-blog-posts',
    data: {
      last: '10',
      since: Date.now()
    }
  });

  dfd
    .done((posts) => {
      logger.info(`Blog posts fetched:`, posts);
      dispatch({ type: 'posts', payload: posts });
    })
    .always(() => dispatch({ type: 'fetching', payload: false }));

  return dfd;
}

/**
 * The blog posts store blueprint.
 * Blueprints require four elements...
 * name: for logging,
 * context: to allow react to provide data without prop-drilling,
 * handle: the 'redux' like reducer function,
 * getDefaultState: to give the store it's default state.
 * @type {{getDefaultState(): *, name: string, context: React.Context<null>, handle: (function(Object=, {type: string}))}}
 */
const blueprint = {
  name: 'blogposts',

  context: createContext(null),

  /**
   * Store handler to execute store actions.
   * @param {object} state - The store state.
   * @param {object} action - The action to execute.
   * @param {string} action.type - The type of action to execute.
   * @return {object} state - The new state object.
   */
  handle: (state = defaultState, action) =>
    produce(state, (draft) => {
      switch (action.type) {
        case 'loading': {
          draft.loading = action.payload;
          return draft;
        }

        case 'posts': {
          draft.posts = entityTable(action.payload);
          // Sort by most recent
          draft.posts.allIds.sort((a, b) => b.created - a.created);
          // Set most recent post as active
          draft.posts.active = draft.posts.allIds[0];

          return draft;
        }

        case 'post.select': {
          draft.posts.active = action.payload;
          return draft;
        }

        default: {
          return draft;
        }
      }
    }),

  getDefaultState() {
    return defaultState;
  }
};

/**
 * Hook to provide store state and dispatching.
 */
export function useStore() {
  const context = useContext(blueprint.context);
  if (!context) throw providerError(blueprint.name);

  // We augmented our context with a re-usable dispatching helper to fetch posts.
  return {
    ...context,
    fetchPosts
  };
}

export default blueprint;
