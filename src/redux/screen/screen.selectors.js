import { createSelector } from "reselect";

const selectScreen = state => state.screen;

const MAX_PHONE_WIDTH = process.env.MAX_PHONE_WIDTH || 575;
const MAX_TABLET_WIDTH = process.env.MAX_TABLET_WIDTH || 991;


export const selectScreenWidth = createSelector(
  [selectScreen],
  (screen) => {
    const { width } = screen;
    let str = 'isPhone';
    if (width === 0)
      str = 'isLoading';
    if (width > MAX_PHONE_WIDTH && width <= MAX_TABLET_WIDTH)
      str = 'isTablet';
    else if (width > MAX_TABLET_WIDTH)
      str = 'isPC';
    return str;
  }
);

export const selectScreenAPIInstance = createSelector(
  [selectScreen],
  (screen) => {
    return screen.apiInstance
  }
);

export const selectIsOpenAccountModal = createSelector(
  [selectScreen],
  (screen) => {
    return screen.isOpenAccountModal
  }
);
export const selectIsOpenCartModal = createSelector(
  [selectScreen],
  (screen) => {
    return screen.isOpenCartModal
  }
);

export const selectIsOpenSidebar = createSelector(
  [selectScreen],
  (screen) => {
    return screen.isOpenSidebarModal
  }
);

export const selectIsOpenFilterModal = createSelector(
  [selectScreen],
  (screen) => {
    return screen.isOpenFilterModal
  }
);

export const selectIsOpenSortCategory = createSelector(
  [selectScreen],
  (screen) => {
    return screen.isOpenSortCategory
  }
);

export const selectCategoryTitle = createSelector(
  [selectScreen],
  (screen) => screen.categoryTitle
);

export const selectCategoryIds = createSelector(
  [selectScreen],
  (screen) => screen.categoryIds
);

export const selectBrandIds = createSelector(
  [selectScreen],
  (screen) => screen.brandIds
);

export const selectTypes = createSelector(
  [selectScreen],
  (screen) => screen.types
);

export const selectCondition = createSelector(
  [selectScreen],
  (screen) => screen.condition
);

export const selectColorIds = createSelector(
  [selectScreen],
  (screen) => screen.colorIds
);

export const selectTriggerSearch = createSelector(
  [selectScreen],
  (screen) => screen.triggerSearch
);

export const selectIsOpenCheckoutList = createSelector(
  [selectScreen],
  (screen) => screen.isOpenCheckoutList
);

export const selectResetProposal = createSelector(
  [selectScreen],
  (screen) => screen.resetProposal
);

export const selectNotifyProposals = createSelector(
  [selectScreen],
  (screen) => screen.notifyProposals
);

export const selectCountProposal = createSelector(
  [selectScreen],
  (screen) => screen.countProposal
);

export const selectTranslator = createSelector(
  [selectScreen],
  (screen) => screen.translator
);
