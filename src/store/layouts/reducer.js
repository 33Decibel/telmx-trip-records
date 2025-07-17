import {
  CHANGE_LAYOUT,
  CHANGE_SIDEBAR_THEME,
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_LAYOUT_POSITION,
  CHANGE_TOPBAR_THEME,
  CHANGE_SIDEBAR_SIZE_TYPE,
  CHANGE_SIDEBAR_VIEW,
  CHANGE_SIDEBAR_IMAGE_TYPE,
  RESET_VALUE,
  CHANGE_PRELOADER,
  CHANGE_SIDEBAR_VISIBILITY,
  SET_TOAST,
  SET_LOADING,
  SET_LOADING_MODEL,
  TOGGEL_ALERT_BAR,
} from './actionType';

//constants
import {
  layoutTypes,
  leftSidebarTypes,
  layoutModeTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
  sidebarVisibilitytypes,
} from '../../Components/constants/layout';

const INIT_STATE = {
  layoutType: layoutTypes.HORIZONTAL,
  leftSidebarType: leftSidebarTypes.LIGHT,
  layoutModeType: layoutModeTypes.LIGHTMODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  topbarThemeType: topbarThemeTypes.LIGHT,
  leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
  leftSidebarImageType: leftSidebarImageTypes.NONE,
  preloader: preloaderTypes.DISABLE,
  loading: {
    show: false,
    msg: 'Loading...',
  },
  loadingModel: {
    show: false,
    msg: 'Loading...',
    icon: 'https://cdn.lordicon.com/kyzecdyf.json',
  },
  sidebarVisibilitytype: sidebarVisibilitytypes.SHOW,
  setToast: {
    isShow: false,
    type: '',
    message: '',
  },
  showAlertBar: false,
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };

    case CHANGE_LAYOUT_MODE:
      return {
        ...state,
        layoutModeType: action.payload,
      };

    case CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSidebarType: action.payload,
      };

    case CHANGE_LAYOUT_WIDTH:
      return {
        ...state,
        layoutWidthType: action.payload,
      };

    case CHANGE_LAYOUT_POSITION:
      return {
        ...state,
        layoutPositionType: action.payload,
      };

    case CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarThemeType: action.payload,
      };

    case CHANGE_SIDEBAR_SIZE_TYPE:
      return {
        ...state,
        leftsidbarSizeType: action.payload,
      };

    case CHANGE_SIDEBAR_VIEW:
      return {
        ...state,
        leftSidebarViewType: action.payload,
      };

    case CHANGE_SIDEBAR_IMAGE_TYPE:
      return {
        ...state,
        leftSidebarImageType: action.payload,
      };

    case RESET_VALUE:
      return {
        ...state,
        resetValue: INIT_STATE,
      };
    case CHANGE_PRELOADER:
      return {
        ...state,
        preloader: action.payload,
      };

    case CHANGE_SIDEBAR_VISIBILITY:
      return {
        ...state,
        sidebarVisibilitytype: action.payload,
      };
    case SET_TOAST:
      return {
        ...state,
        setToast: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    case SET_LOADING_MODEL:
      return {
        ...state,
        loadingModel: { ...state.loadingModel, ...action.payload },
      };
    case TOGGEL_ALERT_BAR:
      return {
        ...state,
        showAlertBar: !state.showAlertBar,
      };
    default:
      return state;
  }
};

export default Layout;
