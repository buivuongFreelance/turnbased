import { DeviceActionTypes } from "./device.types";

export const listBrandStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_BRAND_START,
    payload: values
  }
}

export const listBrandSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_BRAND_SUCCESS,
    payload: list
  }
}

export const listBrandFailed = () => {
  return {
    type: DeviceActionTypes.LIST_BRAND_FAILED,
    payload: null
  }
}

export const featuredDeviceStart = (values) => {
  return {
    type: DeviceActionTypes.FEATURED_DEVICE_START,
    payload: values
  }
}

export const featuredDeviceSuccess = (list) => {
  return {
    type: DeviceActionTypes.FEATURED_DEVICE_SUCCESS,
    payload: list
  }
}

export const featuredDeviceFailed = () => {
  return {
    type: DeviceActionTypes.FEATURED_DEVICE_FAILED,
    payload: null
  }
}

export const featuredDeviceAnonymousStart = (values) => {
  return {
    type: DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_START,
    payload: values
  }
}

export const featuredDeviceAnonymousSuccess = (list) => {
  return {
    type: DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_SUCCESS,
    payload: list
  }
}

export const featuredDeviceAnonymousFailed = () => {
  return {
    type: DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_FAILED,
    payload: null
  }
}

export const checkImeiStart = (values) => {
  return {
    type: DeviceActionTypes.CHECK_IMEI_START,
    payload: values
  }
}

export const checkImeiSuccess = (imei) => {
  return {
    type: DeviceActionTypes.CHECK_IMEI_SUCCESS,
    payload: imei
  }
}

export const checkImeiFailed = () => {
  return {
    type: DeviceActionTypes.CHECK_IMEI_FAILED,
    payload: null
  }
}

export const addDeviceStart = (values) => {
  return {
    type: DeviceActionTypes.ADD_DEVICE_START,
    payload: values
  }
}

export const addDeviceSuccess = () => {
  return {
    type: DeviceActionTypes.ADD_DEVICE_SUCCESS,
    payload: null
  }
}

export const addDeviceFailed = () => {
  return {
    type: DeviceActionTypes.ADD_DEVICE_FAILED,
    payload: null
  }
}

export const listMyDevicesStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_MY_DEVICES_START,
    payload: values
  }
}

export const listMyDevicesSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_MY_DEVICES_SUCCESS,
    payload: list
  }
}

export const listMyDevicesFailed = () => {
  return {
    type: DeviceActionTypes.LIST_MY_DEVICES_FAILED,
    payload: null
  }
}

export const getDeviceStart = (values) => {
  return {
    type: DeviceActionTypes.GET_DEVICE_START,
    payload: values
  }
}

export const getDeviceSuccess = (device) => {
  return {
    type: DeviceActionTypes.GET_DEVICE_SUCCESS,
    payload: device
  }
}

export const getDeviceFailed = () => {
  return {
    type: DeviceActionTypes.GET_DEVICE_FAILED,
    payload: null
  }
}

export const getDeviceAvailableStart = (values) => {
  return {
    type: DeviceActionTypes.GET_DEVICE_AVAILABLE_START,
    payload: values
  }
}

export const getDeviceAvailableSuccess = (device) => {
  return {
    type: DeviceActionTypes.GET_DEVICE_AVAILABLE_SUCCESS,
    payload: device
  }
}

export const getDeviceAvailableFailed = () => {
  return {
    type: DeviceActionTypes.GET_DEVICE_AVAILABLE_FAILED,
    payload: null
  }
}

export const listDeviceAvailableStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_DEVICE_AVAILABLE_START,
    payload: values
  }
}

export const listDeviceAvailableSuccess = (device) => {
  return {
    type: DeviceActionTypes.LIST_DEVICE_AVAILABLE_SUCCESS,
    payload: device
  }
}

export const listDeviceAvailableFailed = () => {
  return {
    type: DeviceActionTypes.LIST_DEVICE_AVAILABLE_FAILED,
    payload: null
  }
}

export const deleteDeviceStart = (values) => {
  return {
    type: DeviceActionTypes.DELETE_DEVICE_START,
    payload: values
  }
}

export const deleteDeviceSuccess = () => {
  return {
    type: DeviceActionTypes.DELETE_DEVICE_SUCCESS,
    payload: null
  }
}

export const deleteDeviceFailed = () => {
  return {
    type: DeviceActionTypes.DELETE_DEVICE_FAILED,
    payload: null
  }
}

export const editDeviceStart = (values) => {
  return {
    type: DeviceActionTypes.EDIT_DEVICE_START,
    payload: values
  }
}

export const editDeviceSuccess = () => {
  return {
    type: DeviceActionTypes.EDIT_DEVICE_SUCCESS,
    payload: null
  }
}

export const editDeviceFailed = () => {
  return {
    type: DeviceActionTypes.EDIT_DEVICE_FAILED,
    payload: null
  }
}

export const makeAvailableStart = (values) => {
  return {
    type: DeviceActionTypes.MAKE_AVAILABLE_START,
    payload: values
  }
}

export const makeAvailableSuccess = () => {
  return {
    type: DeviceActionTypes.MAKE_AVAILABLE_SUCCESS,
    payload: null
  }
}

export const makeAvailableFailed = () => {
  return {
    type: DeviceActionTypes.MAKE_AVAILABLE_FAILED,
    payload: null
  }
}

export const updateAvailableStart = (values) => {
  return {
    type: DeviceActionTypes.UPDATE_AVAILABLE_START,
    payload: values
  }
}

export const updateAvailableSuccess = () => {
  return {
    type: DeviceActionTypes.UPDATE_AVAILABLE_SUCCESS,
    payload: null
  }
}

export const updateAvailableFailed = () => {
  return {
    type: DeviceActionTypes.UPDATE_AVAILABLE_FAILED,
    payload: null
  }
}

export const removeAvailableStart = (values) => {
  return {
    type: DeviceActionTypes.REMOVE_AVAILABLE_START,
    payload: values
  }
}

export const removeAvailableSuccess = () => {
  return {
    type: DeviceActionTypes.REMOVE_AVAILABLE_SUCCESS,
    payload: null
  }
}

export const removeAvailableFailed = () => {
  return {
    type: DeviceActionTypes.REMOVE_AVAILABLE_FAILED,
    payload: null
  }
}

export const addDeviceImageStart = (values) => {
  return {
    type: DeviceActionTypes.ADD_DEVICE_IMAGE_START,
    payload: values
  }
}

export const addDeviceImageSuccess = () => {
  return {
    type: DeviceActionTypes.ADD_DEVICE_IMAGE_SUCCESS,
    payload: null
  }
}

export const addDeviceImageFailed = () => {
  return {
    type: DeviceActionTypes.ADD_DEVICE_IMAGE_FAILED,
    payload: null
  }
}

export const setMainImageStart = (values) => {
  return {
    type: DeviceActionTypes.SET_MAIN_IMAGE_START,
    payload: values
  }
}

export const setMainImageSuccess = () => {
  return {
    type: DeviceActionTypes.SET_MAIN_IMAGE_SUCCESS,
    payload: null
  }
}

export const setMainImageFailed = () => {
  return {
    type: DeviceActionTypes.SET_MAIN_IMAGE_FAILED,
    payload: null
  }
}

export const addWishlistStart = (values) => {
  return {
    type: DeviceActionTypes.ADD_WISHLIST_START,
    payload: values
  }
}

export const addWishlistSuccess = () => {
  return {
    type: DeviceActionTypes.ADD_WISHLIST_SUCCESS,
    payload: null
  }
}

export const addWishlistFailed = () => {
  return {
    type: DeviceActionTypes.ADD_WISHLIST_FAILED,
    payload: null
  }
}

export const deleteWishlistStart = (values) => {
  return {
    type: DeviceActionTypes.DELETE_WISHLIST_START,
    payload: values
  }
}

export const deleteWishlistSuccess = () => {
  return {
    type: DeviceActionTypes.DELETE_WISHLIST_SUCCESS,
    payload: null
  }
}

export const listWishlistStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_WISHLIST_START,
    payload: values
  }
}

export const listWishlistSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_WISHLIST_SUCCESS,
    payload: list
  }
}

export const listWishlistFailed = () => {
  return {
    type: DeviceActionTypes.LIST_WISHLIST_FAILED,
    payload: null
  }
}

export const deleteWishlistFailed = () => {
  return {
    type: DeviceActionTypes.DELETE_WISHLIST_FAILED,
    payload: null
  }
}

export const deleteDeviceImageStart = (values) => {
  return {
    type: DeviceActionTypes.DELETE_DEVICE_IMAGE_START,
    payload: values
  }
}

export const deleteDeviceImageSuccess = () => {
  return {
    type: DeviceActionTypes.DELETE_DEVICE_IMAGE_SUCCESS,
    payload: null
  }
}

export const deleteDeviceImageFailed = () => {
  return {
    type: DeviceActionTypes.DELETE_DEVICE_IMAGE_FAILED,
    payload: null
  }
}

export const listCategoryStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_CATEGORY_START,
    payload: values
  }
}

export const listCategorySuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_CATEGORY_SUCCESS,
    payload: list
  }
}

export const listCategoryFailed = () => {
  return {
    type: DeviceActionTypes.LIST_CATEGORY_FAILED,
    payload: null
  }
}

export const listBrandByCatStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_BRAND_BY_CAT_START,
    payload: values
  }
}

export const listBrandByCatSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_BRAND_BY_CAT_SUCCESS,
    payload: list
  }
}

export const listBrandByCatFailed = () => {
  return {
    type: DeviceActionTypes.LIST_BRAND_BY_CAT_FAILED,
    payload: null
  }
}

export const listModelStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_MODEL_START,
    payload: values
  }
}

export const listModelSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_MODEL_SUCCESS,
    payload: list
  }
}

export const listModelFailed = () => {
  return {
    type: DeviceActionTypes.LIST_MODEL_FAILED,
    payload: null
  }
}

export const listDeviceHomeStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_DEVICE_HOME_START,
    payload: values
  }
}

export const listDeviceHomeSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_DEVICE_HOME_SUCCESS,
    payload: list
  }
}

export const listDeviceHomeFailed = () => {
  return {
    type: DeviceActionTypes.LIST_DEVICE_HOME_FAILED,
    payload: null
  }
}

export const listSearchStart = (values) => {
  return {
    type: DeviceActionTypes.LIST_SEARCH_START,
    payload: values
  }
}

export const listSearchSuccess = (list) => {
  return {
    type: DeviceActionTypes.LIST_SEARCH_SUCCESS,
    payload: list
  }
}

export const listSearchFailed = () => {
  return {
    type: DeviceActionTypes.LIST_SEARCH_FAILED,
    payload: null
  }
}

export const clearSelectedDeviceAvailable = () => {
  return {
    type: DeviceActionTypes.CLEAR_DEVICE_AVAILABLE,
    payload: null
  }
}

export const clearMyDevices = () => {
  return {
    type: DeviceActionTypes.CLEAR_MY_DEVICES,
    payload: null
  }
}
