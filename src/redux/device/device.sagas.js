import { takeLatest, select, call, all, put } from "redux-saga/effects";

import { DeviceActionTypes } from "./device.types";

import {
  listBrandFailed,
  listBrandSuccess,
  featuredDeviceFailed,
  featuredDeviceSuccess,
  checkImeiFailed,
  checkImeiSuccess,
  addDeviceFailed,
  addDeviceSuccess,
  listMyDevicesSuccess,
  listMyDevicesFailed,
  getDeviceSuccess,
  getDeviceFailed,
  deleteDeviceSuccess,
  deleteDeviceFailed,
  editDeviceSuccess,
  editDeviceFailed,
  makeAvailableSuccess,
  makeAvailableFailed,
  removeAvailableSuccess,
  removeAvailableFailed,
  addDeviceImageSuccess,
  addDeviceImageFailed,
  listCategorySuccess,
  listCategoryFailed,
  listBrandByCatSuccess,
  listBrandByCatFailed,
  listModelStart,
  listModelFailed,
  listModelSuccess,
  getDeviceAvailableSuccess,
  getDeviceAvailableFailed,
  deleteDeviceImageSuccess,
  deleteDeviceImageFailed,
  addWishlistSuccess,
  addWishlistFailed,
  deleteWishlistFailed,
  deleteWishlistSuccess,
  listWishlistSuccess,
  listWishlistFailed,
  listDeviceAvailableSuccess,
  listDeviceAvailableFailed,
  setMainImageSuccess,
  setMainImageFailed,
  listDeviceHomeSuccess,
  listSearchSuccess,
  listSearchFailed,
  updateAvailableSuccess,
  updateAvailableFailed,
  featuredDeviceAnonymousSuccess,
  featuredDeviceAnonymousFailed
} from "./device.action";
import { SERVER_VERSION, NODE_ENV } from "../../config";

export function* listSearch({ payload: { limit, offset, textSearch } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'device/availableDevice/search?textSearch=' + textSearch + '&limit=' + limit + '&pageNum=' + parseInt(offset + 1)
    })
    const { data } = yield res;
    const { response: { list, pager: { totalCount } } } = yield data;
    yield put(listSearchSuccess({ list, count: totalCount }));
  } catch (response) {
    if (response) {
      yield put(listSearchFailed());
    } else {
      yield put(listSearchFailed());
    }
  }
}

export function* listDeviceHome({ payload: { limit, offset, type } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'deviceList?limit=' + limit + '&pageNum=' + parseInt(offset + 1) + '&type=' + type
    })
    const { data } = yield res;
    const { response: { list } } = yield data;
    yield put(listDeviceHomeSuccess(list));
  } catch (response) {
    if (response) {
      yield put(listDeviceHomeSuccess());
    } else {
      yield put(listDeviceHomeSuccess());
    }
  }
}

export function* listFilteredAvailableDevice({ payload: { limit, offset, params } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'device/availableDevice/filter?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
      data: {
        ...params
      },
    })
    const { data } = yield res;
    const { response: { list, pager: { totalCount } } } = yield data;
    yield put(listDeviceAvailableSuccess({ list, count: totalCount }));
  } catch (response) {
    if (response) {
      yield put(listDeviceAvailableFailed());
    } else {
      yield put(listDeviceAvailableFailed());
    }
  }
}

export function* listWishlist({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'device/wishlist?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
    })
    const { data } = yield res;
    const { response: { list, pager: { totalCount } } } = yield data;
    yield put(listWishlistSuccess({ list, count: totalCount }));
  } catch (response) {
    if (response) {
      yield put(listWishlistFailed());
    } else {
      yield put(listWishlistFailed());
    }
  }
}

export function* deleteWishlist({ payload: { availableDeviceId } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'device/wishlist',
      data: {
        availableDeviceId
      }
    })
    yield put((deleteWishlistSuccess()));
    yield alertify.success(translator.translate('lbl_success_remove_common', {
      field: translator.translate('title_wishlist')
    }));
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(deleteWishlistFailed());
    } else {
      yield put(deleteWishlistFailed());
    }
  }
}

export function* addWishlist({ payload: { availableDeviceId } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'device/wishlist',
      data: {
        availableDeviceId
      }
    })
    yield put((addWishlistSuccess()));
    yield alertify.success(translator.translate('lbl_success_add_common', {
      field: translator.translate('title_wishlist')
    }));
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(addWishlistFailed());
    } else {
      yield put(addWishlistFailed());
    }
  }
}

export function* setMainImage({ payload: { imageId, deviceId } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'device/setMainImage',
      data: {
        imageId, deviceId
      }
    })
    yield put((setMainImageSuccess()));
    yield alertify.success(translator.translate('lbl_success_set_main_image'));
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(setMainImageFailed());
    } else {
      yield put(setMainImageFailed());
    }
  }
}

export function* addImage({ payload: { device: { deviceId, file, thumbFile } } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;

  const formData = new FormData();
  formData.set('deviceId', deviceId);
  formData.append('file', file);
  formData.append('thumbnail_file', thumbFile);

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'device/addImage',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    yield put((addDeviceImageSuccess()));
    yield alertify.success(translator.translate('lbl_success_add_common', {
      field: translator.translate('title_device_image')
    }));
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(addDeviceImageFailed());
    } else {
      yield put(addDeviceImageFailed());
    }
  }
}

export function* deleteImage({ payload: { deviceId, imageId } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'device/deleteImage',
      data: {
        imageId,
        deviceId
      },
    })
    yield put((deleteDeviceImageSuccess()));
    yield alertify.success(translator.translate('lbl_success_delete_common', {
      field: translator.translate('title_device_image')
    }));
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(deleteDeviceImageFailed());
    } else {
      yield put(deleteDeviceImageFailed());
    }
  }
}

export function* makeAvailable({ payload: { device: { deviceId, sale, exchange }, history } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;
  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'device/makeAvailable',
      data: {
        deviceId,
        sale,
        exchange
      }
    })
    yield put(makeAvailableSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Post Device Successfully' }));
    history.push('/account/device');
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Post Device Failed' }));
      yield put(makeAvailableFailed());
    } else {
      yield put(makeAvailableFailed());
    }
  }
}

export function* updateAvailable({ payload: { id, device: { sale, exchange }, history } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;
  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'device/updateAvailableDevice',
      data: {
        id,
        sale,
        exchange
      }
    })
    yield put(updateAvailableSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Update Available Successfully' }));
    history.push('/account/device');
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Update Available Failed' }));
      yield put(updateAvailableFailed());
    } else {
      yield put(updateAvailableFailed());
    }
  }
}

export function* deleteDevice({ payload: { id, history } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;
  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'device/delete/' + id
    })
    yield put(deleteDeviceSuccess());
    yield alertify.success(translator.translate('lbl_success_delete_common', {
      field: translator.translate('title_device')
    }));
    history.push('/account/device');
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(deleteDeviceFailed());
    } else {
      yield put(deleteDeviceFailed());
    }
  }
}

export function* removeAvailable({ payload: { id, deviceId, history } }) {
  if (NODE_ENV === 'development')
    console.log('deviceid', deviceId);
  const state = yield select();
  const { screen: { apiInstance } } = yield state;
  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'device/deleteAvailableDevice/' + id
    })
    yield put(removeAvailableSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Remove Available Successfully' }));
    yield history.push('/account/device');
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Remove Available Failed' }));
      yield put(removeAvailableFailed());
    } else {
      yield put(removeAvailableFailed());
    }
  }
}

export function* getSelectedDevice({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;
  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'device/' + id
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put((getDeviceSuccess(response)));
  } catch (response) {
    if (response) {
      yield put(getDeviceFailed());
    } else {
      yield put(getDeviceFailed());
    }
  }
}

export function* getSelectedDeviceAvailable({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;
  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'device/availableDevice/' + id
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put((getDeviceAvailableSuccess(response)));
  } catch (response) {
    if (response) {
      yield put(getDeviceAvailableFailed());
    } else {
      yield put(getDeviceAvailableFailed());
    }
  }
}

export function* editDevice({ payload: { device: { id, originalPrice, grade }, history } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;
  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'device/' + id,
      data: {
        originalPrice, grade
      }
    })
    yield put(editDeviceSuccess());
    yield alertify.success(translator.translate('lbl_success_edit_common', {
      field: translator.translate('title_device')
    }));
    history.push('/account/device');
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(editDeviceFailed());
    } else {
      yield put(editDeviceFailed());
    }
  }
}

export function* addDevice({ payload: { device: { imei, originalPrice, grade }, history } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;
  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'device',
      data: {
        imei, originalPrice, grade
      }
    })
    yield put(addDeviceSuccess());
    yield alertify.success(translator.translate('lbl_success_add_device'));
    history.push('/account/device');
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(addDeviceFailed());
    } else {
      yield put(addDeviceFailed());
    }
  }
}

export function* checkIMEI({ payload: { imei, history } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;
  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'imei/checkAvailableImei/' + imei,
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(checkImeiSuccess(response.imei));
    yield alertify.success(translator.translate('lbl_success_check_imei'));
    history.push('/account/add-device');
  } catch (response) {
    if (response) {
      const { data: { error: { message } } } = response;
      if (message) {
        yield alertify.error(translator.translate('lbl_error_imei_exist'));
      } else
        yield alertify.error(translator.translate('lbl_error_common'));
      yield put(checkImeiFailed());
    } else {
      yield put(checkImeiFailed());
    }
  }
}

export function* featuredDevices({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'newDevices?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
    })
    const { data } = yield res;
    const { response: { list } } = yield data;
    yield put(featuredDeviceSuccess(list));
  } catch (response) {
    if (response) {
      yield put(featuredDeviceFailed());
    } else {
      yield put(featuredDeviceFailed());
    }
  }
}

export function* featuredDevicesAnonymous({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance }, storage: { anonymousId } } = yield state;

  if (anonymousId) {
    try {
      let res = yield apiInstance({
        method: 'get',
        url: SERVER_VERSION + 'device/newDevicesAnonymous?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
        headers: {
          'token': anonymousId
        }
      })
      const { data } = yield res;
      const { response: { list } } = yield data;
      yield put(featuredDeviceAnonymousSuccess(list));
    } catch (response) {
      if (response) {
        yield put(featuredDeviceAnonymousFailed());
      } else {
        yield put(featuredDeviceAnonymousFailed());
      }
    }
  }
}

export function* listBrand({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance }, device: { brands } } = state;

  if (brands.length > 0)
    yield put(listBrandSuccess(brands));
  else
    try {
      let res = yield apiInstance({
        method: 'get',
        url: SERVER_VERSION + 'brands?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
      })
      const { data } = yield res;
      const { response: { list } } = yield data;
      yield put(listBrandSuccess(list));
    } catch (response) {
      if (response) {
        yield put(listBrandFailed());
      } else {
        yield put(listBrandFailed());
      }
    }
}

export function* listBrandByCat({ payload: { limit, offset, categoryId } }) {
  const state = yield select();
  const { screen: { apiInstance }, device: { brandsByCat } } = state;

  if (brandsByCat.length > 0)
    yield put(listBrandByCatSuccess(brandsByCat));
  else
    try {
      let res = yield apiInstance({
        method: 'get',
        url: SERVER_VERSION + 'brands/byCategory/' + categoryId + '?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
      })
      const { data } = yield res;
      const { response: { list } } = yield data;
      yield put(listBrandByCatSuccess(list));
    } catch (response) {
      if (response) {
        yield put(listBrandByCatFailed());
      } else {
        yield put(listBrandByCatFailed());
      }
    }
}

export function* listCategory({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance }, device: { categories } } = state;

  if (categories.length > 0)
    yield put(listCategorySuccess(categories));
  else
    try {
      let res = yield apiInstance({
        method: 'get',
        url: SERVER_VERSION + 'categories?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
      })
      const { data } = yield res;
      const { response: { list } } = yield data;
      yield put(listCategorySuccess(list));
    } catch (response) {
      if (response) {
        yield put(listCategoryFailed());
      } else {
        yield put(listCategoryFailed());
      }
    }
}

export function* listModel({ payload: { limit, offset, categoryId, brandId } }) {
  const state = yield select();
  const { screen: { apiInstance }, device: { models } } = state;

  if (models.length > 0)
    yield put(listModelStart(models));
  else
    try {
      let res = yield apiInstance({
        method: 'get',
        url: SERVER_VERSION + 'model/getByCategoryAndBrand/' + categoryId + '/' + brandId + '?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
      })
      const { data } = yield res;
      const { response: { list } } = yield data;
      yield put(listModelSuccess(list));
    } catch (response) {
      if (response) {
        yield put(listModelFailed());
      } else {
        yield put(listModelFailed());
      }
    }
}

export function* listMyDevices({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'devices?limit=' + limit + '&pageNum=' + parseInt(offset + 1),
    })
    const { data } = yield res;
    const { response: { list, pager: { totalCount } } } = yield data;
    yield put(listMyDevicesSuccess({ list, count: totalCount }));
  } catch (response) {
    if (response) {
      yield put(listMyDevicesFailed());
    } else {
      yield put(listMyDevicesFailed());
    }
  }
}

export function* onFeaturedDevicesStart() {
  yield takeLatest(
    DeviceActionTypes.FEATURED_DEVICE_START,
    featuredDevices
  );
}

export function* onFeaturedDevicesAnonymousStart() {
  yield takeLatest(
    DeviceActionTypes.FEATURED_DEVICE_ANONYMOUS_START,
    featuredDevicesAnonymous
  );
}

export function* onListBrandStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_BRAND_START,
    listBrand
  );
}

export function* onListBrandByCartStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_BRAND_BY_CAT_START,
    listBrandByCat
  );
}

export function* onListCategoryStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_CATEGORY_START,
    listCategory
  );
}

export function* onListModelStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_MODEL_START,
    listModel
  );
}

export function* onCheckImeiStart() {
  yield takeLatest(
    DeviceActionTypes.CHECK_IMEI_START,
    checkIMEI
  );
}

export function* onAddDeviceStart() {
  yield takeLatest(
    DeviceActionTypes.ADD_DEVICE_START,
    addDevice
  );
}

export function* onEditDeviceStart() {
  yield takeLatest(
    DeviceActionTypes.EDIT_DEVICE_START,
    editDevice
  );
}

export function* onListMyDevicesStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_MY_DEVICES_START,
    listMyDevices
  )
}

export function* onGetDeviceStart() {
  yield takeLatest(
    DeviceActionTypes.GET_DEVICE_START,
    getSelectedDevice
  )
}

export function* onGetDeviceAvailableStart() {
  yield takeLatest(
    DeviceActionTypes.GET_DEVICE_AVAILABLE_START,
    getSelectedDeviceAvailable
  )
}

export function* onDeleteDeviceStart() {
  yield takeLatest(
    DeviceActionTypes.DELETE_DEVICE_START,
    deleteDevice
  )
}

export function* onMakeAvailableStart() {
  yield takeLatest(
    DeviceActionTypes.MAKE_AVAILABLE_START,
    makeAvailable
  )
}

export function* onUpdateAvailableStart() {
  yield takeLatest(
    DeviceActionTypes.UPDATE_AVAILABLE_START,
    updateAvailable
  )
}

export function* onRemoveAvailableStart() {
  yield takeLatest(
    DeviceActionTypes.REMOVE_AVAILABLE_START,
    removeAvailable
  )
}

export function* onAddDeviceImageStart() {
  yield takeLatest(
    DeviceActionTypes.ADD_DEVICE_IMAGE_START,
    addImage
  )
}

export function* onSetMainImageStart() {
  yield takeLatest(
    DeviceActionTypes.SET_MAIN_IMAGE_START,
    setMainImage
  )
}

export function* onDeleteDeviceImageStart() {
  yield takeLatest(
    DeviceActionTypes.DELETE_DEVICE_IMAGE_START,
    deleteImage
  )
}

export function* onAddWishlistStart() {
  yield takeLatest(
    DeviceActionTypes.ADD_WISHLIST_START,
    addWishlist
  )
}

export function* onDeleteWishlistStart() {
  yield takeLatest(
    DeviceActionTypes.DELETE_WISHLIST_START,
    deleteWishlist
  )
}

export function* onListWishlistStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_WISHLIST_START,
    listWishlist
  )
}

export function* onListFilteredAvailableDeviceStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_DEVICE_AVAILABLE_START,
    listFilteredAvailableDevice
  )
}

export function* onListDeviceHomeStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_DEVICE_HOME_START,
    listDeviceHome
  )
}

export function* onListSearchStart() {
  yield takeLatest(
    DeviceActionTypes.LIST_SEARCH_START,
    listSearch
  )
}

export function* deviceSagas() {
  yield all([
    call(onListBrandStart),
    call(onListCategoryStart),
    call(onFeaturedDevicesStart),
    call(onFeaturedDevicesAnonymousStart),
    call(onCheckImeiStart),
    call(onAddDeviceStart),
    call(onEditDeviceStart),
    call(onListMyDevicesStart),
    call(onGetDeviceStart),
    call(onDeleteDeviceStart),
    call(onMakeAvailableStart),
    call(onUpdateAvailableStart),
    call(onRemoveAvailableStart),
    call(onAddDeviceImageStart),
    call(onSetMainImageStart),
    call(onDeleteDeviceImageStart),
    call(onListBrandByCartStart),
    call(onListModelStart),
    call(onGetDeviceAvailableStart),
    call(onAddWishlistStart),
    call(onDeleteWishlistStart),
    call(onListWishlistStart),
    call(onListFilteredAvailableDeviceStart),
    call(onListDeviceHomeStart),
    call(onListSearchStart)
  ]);
}
