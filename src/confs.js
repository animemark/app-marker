const confs = {

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
        error: null,
        errorNo: 0,
        errors: [],
        showing: false,
        posting: false,
        message: '',
        files: {},
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
        disabled: true,
      },
    },
    menu_default: 'marks',
  },

  errors: {
    unknown: {
      file: 'unknown',
      text: 'Unknown error',
    },
    system: {
      file: 'system',
      text: 'System error',
    },
    fileSystem: {
      file: 'fileSystem',
      text: 'File system error',
    },
    database: {
      file: 'database',
      text: 'Database error',
    },
    session: {
      file: 'session',
      text: 'Session error',
    },
    account: {
      file: 'account',
      text: 'Account error',
    },
    loginRequired: {
      file: 'loginRequired',
      text: 'Login required',
    },
    param: {
      file: 'param',
      text: 'Param error',
    },
    input: {
      file: 'input',
      text: 'Input error',
    },
    unique: {
      file: 'unique',
      text: 'Same entry exists',
    },
    mailer: {
      file: 'mailer',
      text: 'Mailer system error',
    },
    captcha: {
      file: 'captcha',
      text: 'Captcha error',
    },
    jwtoken: {
      file: 'jwtoken',
      text: 'Jwtoken invalid',
    },
    no_permission: {
      file: 'no_permission',
      text: 'No permission',
    },
    // account
    email_is_exist: {
      file: 'email_is_exist',
      text: 'Email already exist',
    },
    email_no_exist: {
      file: 'email_no_exist',
      text: 'Email does not exist',
    },
    user_is_exist: {
      file: 'user_is_exist',
      text: 'User already exist',
    },
    user_no_exist: {
      file: 'user_no_exist',
      text: 'User does not exist',
    },
    name_is_exist: {
      file: 'name_is_exist',
      text: 'Name already exist',
    },
    name_no_exist: {
      file: 'name_no_exist',
      text: 'Name does not exist',
    },
    pass_incorrect: {
      file: 'pass_incorrect',
      text: 'Password incorrect',
    },
  },
  /**
   * @deprecated use errors
   */
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
};

export default confs;