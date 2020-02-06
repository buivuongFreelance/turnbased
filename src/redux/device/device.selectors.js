import { createSelector } from "reselect";

const selectDevice = state => state.device;

export const selectBrands = createSelector(
  [selectDevice],
  (device) => device.brands
);

export const selectLoadingBrand = createSelector(
  [selectDevice],
  (device) => device.loadingBrand
);

export const selectLoadingModel = createSelector(
  [selectDevice],
  (device) => device.loadingModel
);

export const selectFeaturedDevices = createSelector(
  [selectDevice],
  (device) => device.featuredDevices
);

export const selectLoadingFeaturedDevices = createSelector(
  [selectDevice],
  (device) => device.loadingFeaturedDevices
);

export const selectLoadingCheckImei = createSelector(
  [selectDevice],
  (device) => device.loadingCheckImei
);

export const selectImei = createSelector(
  [selectDevice],
  (device) => device.imei
);

export const selectLoadingAddDevice = createSelector(
  [selectDevice],
  (device) => device.loadingAddDevice
);

export const selectLoadingMyDevices = createSelector(
  [selectDevice],
  (device) => device.loadingMyDevices
);

export const selectMyDevices = createSelector(
  [selectDevice],
  (device) => device.myDevices
);

export const selectLoadingSelectedDevice = createSelector(
  [selectDevice],
  (device) => device.loadingSelectedDevice
);

export const selectSelectedDevice = createSelector(
  [selectDevice],
  (device) => device.selectedDevice
);

export const selectSelectedDeviceAvailable = createSelector(
  [selectDevice],
  (device) => device.selectedDeviceAvailable
);

export const selectLoadingDelete = createSelector(
  [selectDevice],
  (device) => device.loadingDelete
);

export const selectLoadingImage = createSelector(
  [selectDevice],
  (device) => device.loadingImage
);

export const selectLoadingCategory = createSelector(
  [selectDevice],
  (device) => device.loadingCategory
);

export const selectCategories = createSelector(
  [selectDevice],
  (device) => device.categories
);

export const selectBrandsByCat = createSelector(
  [selectDevice],
  (device) => device.brandsByCat
);

export const selectLoadingBrandByCat = createSelector(
  [selectDevice],
  (device) => device.loadingBrandByCat
);

export const selectModels = createSelector(
  [selectDevice],
  (device) => device.models
);

export const selectWishlist = createSelector(
  [selectDevice],
  (device) => device.wishlist
);

export const selectLoadingWishlist = createSelector(
  [selectDevice],
  (device) => device.loadingWishlist
);

export const selectCountWishlist = createSelector(
  [selectDevice],
  (device) => device.countMyWishlist
);

export const selectLoadingListDeviceAvailable = createSelector(
  [selectDevice],
  (device) => device.loadingListDeviceAvailable
);

export const selectFilteredDevices = createSelector(
  [selectDevice],
  (device) => device.filteredDevices
);

export const selectLoadingListDeviceHome = createSelector(
  [selectDevice],
  (device) => device.loadingListDeviceHome
);

export const selectDevicesHome = createSelector(
  [selectDevice],
  (device) => device.devicesHome
);

export const selectCountMyDevices = createSelector(
  [selectDevice],
  (device) => device.countMyDevices
);

export const selectCountFilteredDevices = createSelector(
  [selectDevice],
  (device) => device.countFilteredDevices
);

export const selectListSearch = createSelector(
  [selectDevice],
  (device) => device.listSearch
);

export const selectLoadingSearch = createSelector(
  [selectDevice],
  (device) => device.loadingSearch
);

export const selectCountSearch = createSelector(
  [selectDevice],
  (device) => device.countSearch
);

export const selectLoadingMakeAvailable = createSelector(
  [selectDevice],
  (device) => device.loadingMakeAvailable
);

export const selectLoadingUpdateAvailable = createSelector(
  [selectDevice],
  (device) => device.loadingUpdateAvailable
);
