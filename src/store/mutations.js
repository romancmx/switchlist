import Vue from 'vue';
import { PLATFORM_CATEGORIES, EXCLUDED_PLATFORMS, PLATFORM_BG_HEX, PLATFORM_LOGO_FORMAT, PLATFORM_NAME_OVERRIDES, POPULAR_PLATFORMS } from '@/constants';

export default {
  SET_BOARDS(state, boards) {
    state.boards = boards;
  },

  SET_SESSION_EXPIRED(state, sessionExpired) {
    state.sessionExpired = sessionExpired;
  },

  SET_RELEASES(state, releases) {
    state.releases = releases;
  },

  SET_NOTIFICATION(state, notification) {
    state.notification = notification;
  },

  SET_TWITCH_TOKEN(state, token) {
    state.twitchToken = token;
  },

  CLEAR_BOARD(state) {
    state.board = {};
  },

  SET_ACTIVE_BOARD(state, board) {
    state.board = board;

    // Update board in boards
    const boardIndex = state.boards.findIndex(({ id }) => board.id === id);

    if (boardIndex) {
      Vue.set(state.boards, boardIndex, board);
    }
  },

  SET_PUBLIC_BOARDS(state, publicBoards) {
    state.publicBoards = publicBoards;
  },

  SET_GAME_BOARD(state, board) {
    state.board = board;
  },

  SET_PROFILE(state, profile) {
    state.profile = profile;
  },

  SET_PLATFORMS(state, platforms) {
    state.platforms = platforms
      .filter(({ id }) => !EXCLUDED_PLATFORMS.includes(id))
      .map((platform) => {
        const formattedPlatform = {
          id: platform.id,
          name: PLATFORM_NAME_OVERRIDES[platform.id] || platform.name,
          slug: platform.slug,
          category: PLATFORM_CATEGORIES[platform.category],
          popular: POPULAR_PLATFORMS.includes(platform.id),
          // categoryId: platform.category,
          generation: platform.generation || 0,
          bgHex: PLATFORM_BG_HEX[platform.id] || null,
          logoFormat: PLATFORM_LOGO_FORMAT[platform.id] || 'svg',
        };

        return formattedPlatform;
      });
  },

  SET_BOARD_GAMES(state, boardGames) {
    state.boardGames = boardGames;
  },

  SET_WALLPAPERS(state, wallpapers) {
    state.wallpapers = wallpapers;
  },

  REMOVE_WALLPAPER(state, fullPath) {
    const wallpaperIndex = state.wallpapers.findIndex(wallpaper => wallpaper.fullPath === fullPath);

    state.wallpapers.splice(wallpaperIndex, 1);
  },

  ADD_WALLPAPER(state, wallpaper) {
    state.wallpapers.push(wallpaper);
  },

  ADD_BOARD(state, board) {
    state.boards.push(board);
  },

  ADD_LIST(state, list) {
    state.board.lists.push(list);
  },

  REMOVE_BOARD(state, boardId) {
    const boardIndex = state.boards.findIndex(({ id }) => id === boardId);

    state.boards.splice(boardIndex, 1);
  },

  SET_GAME_MODAL_DATA(state, activeGame) {
    state.activeGame = activeGame;
  },

  CLEAR_GAME_MODAL_DATA(state) {
    state.activeGame = null;
  },

  ADD_GAME_TO_LIST({ board }, { listIndex, game }) {
    board.lists[listIndex].games.push(game.id);
  },

  REMOVE_GAME_FROM_LIST({ board }, { listIndex, game }) {
    const currentList = board.lists[listIndex];

    currentList.games.splice(currentList.games.indexOf(game.id), 1);
  },

  REMOVE_LIST(state, index) {
    state.board.lists.splice(index, 1);
  },

  MOVE_LIST(state, { from, to }) {
    const cutOut = state.board.lists.splice(from, 1)[0];

    state.board.lists.splice(to, 0, cutOut);
  },

  SET_LIST_SORT_ORDER(state, { listIndex, sortOrder }) {
    Vue.set(state.board.lists[listIndex].settings, 'sortOrder', sortOrder);
  },

  SET_LIST_VIEW(state, { listIndex, view }) {
    Vue.set(state.board.lists[listIndex].settings, 'view', view);
  },

  SET_LIST_SETTINGS(state, { listIndex, settings }) {
    Vue.set(state.board.lists[listIndex], 'settings', settings);
  },

  RENAME_LIST(state, { listIndex, listName }) {
    state.board.lists[listIndex].name = listName;
  },

  SET_USER(state, data) {
    state.user = {
      lastLogin: data.metadata.lastSignInTime,
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      emailVerified: data.emailVerified,
      dateJoined: data.metadata.creationTime,
      photoURL: data.photoURL,
    };
  },

  CACHE_GAME_DATA(state, data) {
    data.forEach((game) => {
      Vue.set(state.games, game.id, { ...game });
    });
  },

  SET_SETTINGS(state, settings) {
    state.settings = settings;
  },

  UPDATE_TAG(state, { tagName, tagHex, tempTag }) {
    const updatedTag = {
      ...state.tags[tempTag.tagName],
      hex: tagHex,
    };

    const renaming = tagName !== tempTag.tagName;

    if (renaming) {
      Vue.set(state.tags, tagName, updatedTag);
      Vue.delete(state.tags, tempTag.tagName);
    } else {
      state.tags[tempTag.tagName] = updatedTag;
    }
  },

  SET_TAGS(state, tags) {
    state.tags = tags;
  },

  CLEAR_SESSION(state) {
    state.user = null;
    state.tags = {};
    state.notes = {};
    state.progresses = {};
    state.dragging = false;
    state.gameLists = {};
    state.settings = null;
    state.platform = null;
    state.platforms = [];
    state.results = [];
    state.games = {};
    state.boards = [];
    state.board = {};
    state.boardGames = [];
    state.activeGame = null;
    state.wallpaperUrl = null;
    state.wallpapers = [];
  },

  SET_NOTES(state, notes) {
    state.notes = notes;
  },

  SET_PROGRESSES(state, progresses) {
    state.progresses = progresses;
  },

  REMOVE_GAME_PROGRESS({ progresses }, gameId) {
    if (progresses[gameId]) {
      Vue.delete(progresses, gameId);
    }
  },

  SET_GAME_PROGRESS(state, { progress, gameId }) {
    state.progresses[gameId] = progress;
  },

  SET_GAME_NOTE(state, { note, gameId }) {
    state.notes[gameId] = note;
  },

  SET_DRAGGING_STATUS(state, status) {
    state.dragging = status;
  },

  REMOVE_GAME_NOTE(state, gameId) {
    if (state.notes[gameId]) {
      Vue.delete(state.notes, gameId);
    }
  },

  ADD_GAME_TAG(state, { tagName, gameId }) {
    state.tags[tagName].games.push(gameId);
  },

  REMOVE_GAME_TAG(state, { tagName, gameId }) {
    state.tags[tagName].games.splice(state.tags[tagName].games.indexOf(gameId), 1);
  },

  SET_SEARCH_RESULTS(state, results) {
    state.results = results;
  },

  CLEAR_SEARCH_RESULTS(state) {
    state.results = [];
  },

  UPDATE_SETTING(state, { key, value }) {
    if (!state.settings) {
      state.settings = {};
    }

    state.settings[key] = value;
  },
};
