const confs = {
  eno: {
    unknownError: 4001,
    systemError: 4002,
    fileSystemError: 4003,
    databaseError: 4004,
    sessionError: 4005,
    accountError: 4006,
    LoginRequired: 4007,
    paramError: 4008,
    inputError: 4009,
    uniqueError: 4010,
    mailerError: 4011,
    captchaError: 4012,
    jwtokenError: 4013,
    permissionError: 4014,
  },
  localStorageKeys: {
    discuss_sortBy: 'discuss.sortBy',
    marking_sortBy: 'marking.sortBy',
  },

  discuss: {
    sortTypes: {
      hot: 'Upvotes',
      new: 'Newest',
      old: 'Oldest',
    },
    sortByDefault: 'hot',
    maxDepth: 4,
    default_postLis_unit() {
      return {
        loadStatus: 'initial',
        postAdds: [],// newly added postOids
        postOids: [],
        prevOid: null,
        prevPos: null,
      }
    },
    default_formKvs_unit() {
      return {
        errorNo: 0,
        showing: true,
        posting: false,
        message: '',
      }
    },
  },

  marking: {
    sortTypes: {
      hot: 'Upvotes',
      new: 'Newest',
      old: 'Oldest',
    },
    sortByDefault: 'hot',

    default_markLis() {
      return {
        loadStatus: 'initial',
        markOids: [],
        prevOid: null,
        prevPos: null,
      };
    },

    default_formObj() {
      return {
        errorNo: 0,
        posting: false,
        martus: 'doing',
        score: 0,
        comment: '',
      };
    },
  },

  profile: {
    menus: {
      marks: {
        file: 'marks',
        text: 'Marks',
      },
      posts: {
        file: 'posts',
        text: 'Posts',
      },
      files: {
        file: 'files',
        text: 'Files',
        //disabled: true,
      },
    },
    menu_default: 'marks',
  },
};

export default confs;