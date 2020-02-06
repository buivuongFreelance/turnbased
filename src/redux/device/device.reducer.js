import { DeviceActionTypes } from "./device.types";

const INITIAL_STATE = {
  brands: [],
  categories: [],
  brandsByCat: [],
  models: [],
  loadingBrand: false,
  featuredDevices: [],
  loadingFeaturedDevices: false,
  loadingCheckImei: false,
  imei: null,
  loadingAddDevice: false,
  loadingMyDevices: false,
  myDevices: [],
  countMyDevices: 0,
  selectedDevice: null,
  selectedDeviceAvailable: null,
  loadingSelectedDevice: null,
  loadingDelete: null,
  loadingImage: false,
  loadingCategory: false,
  loadingBrandByCat: false,
  loadingModel: false,
  loadingWishlist: false,
  wishlist: [],
  countMyWishlist: 0,
  loadingListDeviceAvailable: false,
  filteredDevices: [],
  countFilteredDevices: 0,
  loadingListDeviceHome: false,
  devicesHome: [],
  listSearch: [],
  loadingSearch: false,
  countSearch: 0,
  loadingUpdateAvailable: false,
  loadingMakeAvailable: false
};

const deviceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DeviceActionTypes.LIST_BRAND_START:
      state.loadingBrand = true;
      return state;
    case DeviceActionTypes.LIST_BRAND_SUCCESS:
      state.brands = action.payload;
      state.loadingBrand = false;
      return state;
    case DeviceActionTypes.LIST_BRAND_FAILED:
      state.brands = [];
      state.loadingBrand = false;
      return state;
    case DeviceActionTypes.FEATURED_DEVICE_START:
      state.loadingFeaturedDevices = true;
      return state;
    case DeviceActionTypes.FEATURED_DEVICE_SUCCESS:
      state.featuredDevices = action.payload;
      state.loadingFeaturedDevices = false;
      return state;
    case DeviceActionTypes.FEATURED_DEVICE_FAILED:
      state.featuredDevices = [];
      state.loadingFeaturedDevices = false;
      return state;
    case DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_START:
      state.loadingFeaturedDevices = true;
      return state;
    case DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_SUCCESS:
      state.featuredDevices = action.payload;
      state.loadingFeaturedDevices = false;
      return state;
    case DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_FAILED:
      state.featuredDevices = [];
      state.loadingFeaturedDevices = false;
      return state;
    case DeviceActionTypes.CHECK_IMEI_START:
      state.loadingCheckImei = true;
      return state;
    case DeviceActionTypes.CHECK_IMEI_SUCCESS:
      state.imei = action.payload;
      state.loadingCheckImei = false;
      return state;
    case DeviceActionTypes.CHECK_IMEI_FAILED:
      state.imei = '';
      state.loadingCheckImei = false;
      return state;
    case DeviceActionTypes.ADD_DEVICE_START:
      state.loadingAddDevice = true;
      return state;
    case DeviceActionTypes.ADD_DEVICE_SUCCESS:
      state.loadingAddDevice = false;
      return state;
    case DeviceActionTypes.ADD_DEVICE_FAILED:
      state.loadingAddDevice = false;
      return state;
    case DeviceActionTypes.ADD_WISHLIST_START:
      state.loadingWishlist = true;
      return state;
    case DeviceActionTypes.ADD_WISHLIST_SUCCESS:
      state.loadingWishlist = false;
      return state;
    case DeviceActionTypes.ADD_WISHLIST_FAILED:
      state.loadingWishlist = false;
      return state;
    case DeviceActionTypes.DELETE_WISHLIST_START:
      state.loadingWishlist = true;
      return state;
    case DeviceActionTypes.DELETE_WISHLIST_SUCCESS:
      state.loadingWishlist = false;
      return state;
    case DeviceActionTypes.DELETE_WISHLIST_FAILED:
      state.loadingWishlist = false;
      return state;
    case DeviceActionTypes.LIST_MY_DEVICES_START:
      state.loadingMyDevices = true;
      return state;
    case DeviceActionTypes.LIST_MY_DEVICES_SUCCESS:
      state.myDevices = action.payload.list;
      state.countMyDevices = action.payload.count;
      state.loadingMyDevices = false;
      return state;
    case DeviceActionTypes.LIST_MY_DEVICES_FAILED:
      state.myDevices = [];
      state.countMyDevices = 0;
      state.loadingMyDevices = false;
      return state;
    case DeviceActionTypes.GET_DEVICE_START:
      state.loadingSelectedDevice = true;
      return state;
    case DeviceActionTypes.GET_DEVICE_SUCCESS:
      state.loadingSelectedDevice = false;
      state.selectedDevice = action.payload;
      return state;
    case DeviceActionTypes.GET_DEVICE_FAILED:
      state.loadingSelectedDevice = false;
      state.selectedDevice = null;
      return state;
    case DeviceActionTypes.GET_DEVICE_AVAILABLE_START:
      state.loadingSelectedDevice = true;
      return state;
    case DeviceActionTypes.GET_DEVICE_AVAILABLE_SUCCESS:
      state.loadingSelectedDevice = false;
      state.selectedDeviceAvailable = action.payload;
      return state;
    case DeviceActionTypes.GET_DEVICE_AVAILABLE_FAILED:
      state.loadingSelectedDevice = false;
      state.selectedDeviceAvailable = null;
      return state;
    case DeviceActionTypes.DELETE_DEVICE_START:
      state.loadingDelete = true;
      return state;
    case DeviceActionTypes.DELETE_DEVICE_SUCCESS:
      state.loadingDelete = false;
      return state;
    case DeviceActionTypes.DELETE_DEVICE_FAILED:
      state.loadingDelete = false;
      return state;
    case DeviceActionTypes.EDIT_DEVICE_START:
      state.loadingAddDevice = true;
      return state;
    case DeviceActionTypes.EDIT_DEVICE_SUCCESS:
      state.loadingAddDevice = false;
      return state;
    case DeviceActionTypes.EDIT_DEVICE_FAILED:
      state.loadingAddDevice = false;
      return state;
    case DeviceActionTypes.MAKE_AVAILABLE_START:
      state.loadingMakeAvailable = true;
      return state;
    case DeviceActionTypes.MAKE_AVAILABLE_SUCCESS:
      state.loadingMakeAvailable = false;
      return state;
    case DeviceActionTypes.MAKE_AVAILABLE_FAILED:
      state.loadingMakeAvailable = false;
      return state;
    case DeviceActionTypes.UPDATE_AVAILABLE_START:
      state.loadingUpdateAvailable = true;
      return state;
    case DeviceActionTypes.UPDATE_AVAILABLE_SUCCESS:
      state.loadingUpdateAvailable = false;
      return state;
    case DeviceActionTypes.UPDATE_AVAILABLE_FAILED:
      state.loadingUpdateAvailable = false;
      return state;
    case DeviceActionTypes.REMOVE_AVAILABLE_START:
      state.loadingDelete = true;
      return state;
    case DeviceActionTypes.REMOVE_AVAILABLE_SUCCESS:
      state.loadingDelete = false;
      return state;
    case DeviceActionTypes.REMOVE_AVAILABLE_FAILED:
      state.loadingDelete = false;
      return state;
    case DeviceActionTypes.ADD_DEVICE_IMAGE_START:
      state.loadingImage = true;
      return state;
    case DeviceActionTypes.ADD_DEVICE_IMAGE_SUCCESS:
      state.loadingImage = false;
      return state;
    case DeviceActionTypes.ADD_DEVICE_IMAGE_FAILED:
      state.loadingImage = false;
      return state;
    case DeviceActionTypes.SET_MAIN_IMAGE_START:
      state.loadingImage = true;
      return state;
    case DeviceActionTypes.SET_MAIN_IMAGE_SUCCESS:
      state.loadingImage = false;
      return state;
    case DeviceActionTypes.SET_MAIN_IMAGE_FAILED:
      state.loadingImage = false;
      return state;
    case DeviceActionTypes.DELETE_DEVICE_IMAGE_START:
      state.loadingImage = true;
      return state;
    case DeviceActionTypes.DELETE_DEVICE_IMAGE_SUCCESS:
      state.loadingImage = false;
      return state;
    case DeviceActionTypes.DELETE_DEVICE_IMAGE_FAILED:
      state.loadingImage = false;
      return state;
    case DeviceActionTypes.LIST_CATEGORY_START:
      state.loadingCategory = true;
      return state;
    case DeviceActionTypes.LIST_CATEGORY_SUCCESS:
      state.categories = action.payload;
      state.loadingCategory = false;
      return state;
    case DeviceActionTypes.LIST_CATEGORY_FAILED:
      state.categories = [];
      state.loadingCategory = false;
      return state;
    case DeviceActionTypes.LIST_BRAND_BY_CAT_START:
      state.brandsByCat = [];
      state.loadingBrandByCat = true;
      return state;
    case DeviceActionTypes.LIST_BRAND_BY_CAT_SUCCESS:
      state.brandsByCat = action.payload;
      state.loadingBrandByCat = false;
      return state;
    case DeviceActionTypes.LIST_BRAND_BY_CAT_FAILED:
      state.brandsByCat = [];
      state.loadingBrandByCat = false;
      return state;
    case DeviceActionTypes.LIST_MODEL_START:
      state.models = [];
      state.loadingModel = true;
      return state;
    case DeviceActionTypes.LIST_MODEL_SUCCESS:
      state.models = action.payload;
      state.loadingModel = false;
      return state;
    case DeviceActionTypes.LIST_MODEL_FAILED:
      state.models = [];
      state.loadingModel = false;
      return state;
    case DeviceActionTypes.LIST_WISHLIST_START:
      state.loadingWishlist = true;
      return state;
    case DeviceActionTypes.LIST_WISHLIST_SUCCESS:
      state.wishlist = action.payload.list;
      state.countMyWishlist = action.payload.count;
      state.loadingWishlist = false;
      return state;
    case DeviceActionTypes.LIST_WISHLIST_FAILED:
      state.wishlist = [];
      state.countMyWishlist = 0;
      state.loadingWishlist = false;
      return state;
    case DeviceActionTypes.LIST_DEVICE_AVAILABLE_START:
      state.loadingListDeviceAvailable = true;
      return state;
    case DeviceActionTypes.LIST_DEVICE_AVAILABLE_SUCCESS:
      state.loadingListDeviceAvailable = false;
      state.filteredDevices = action.payload.list;
      state.countFilteredDevices = action.payload.count;
      return state;
    case DeviceActionTypes.LIST_DEVICE_AVAILABLE_FAILED:
      state.loadingListDeviceAvailable = false;
      state.filteredDevices = [];
      state.countFilteredDevices = 0;
      return state;
    case DeviceActionTypes.LIST_DEVICE_HOME_START:
      state.loadingListDeviceHome = true;
      return state;
    case DeviceActionTypes.LIST_DEVICE_HOME_SUCCESS:
      state.devicesHome = action.payload;
      state.loadingListDeviceHome = false;
      return state;
    case DeviceActionTypes.LIST_DEVICE_HOME_FAILED:
      state.devicesHome = [];
      state.loadingListDeviceHome = false;
      return state;
    case DeviceActionTypes.LIST_SEARCH_START:
      state.loadingSearch = true;
      return state;
    case DeviceActionTypes.LIST_SEARCH_SUCCESS:
      state.listSearch = action.payload.list;
      state.countSearch = action.payload.count;
      state.loadingSearch = false;
      return state;
    case DeviceActionTypes.LIST_SEARCH_FAILED:
      state.listSearch = [];
      state.countSearch = 0;
      state.loadingSearch = false;
      return state;
    case DeviceActionTypes.CLEAR_DEVICE_AVAILABLE:
      state.selectedDeviceAvailable = null;
      return state;
    case DeviceActionTypes.CLEAR_MY_DEVICES:
      state.myDevices = [];
      state.countMyDevices = 0;
      return state;
    default:
      return state;
  }
};

export default deviceReducer;
