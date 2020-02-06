import { ScreenActionTypes } from "./screen.types";

export const changeScreen = width => ({
  type: ScreenActionTypes.SCREEN_CHANGE,
  payload: width
});

export const toggleAccountModal = (status) => ({
  type: ScreenActionTypes.TOGGLE_ACCOUNT_MODAL,
  payload: status
});

export const toggleCartModal = (status) => ({
  type: ScreenActionTypes.TOOGLE_CART_MODAL,
  payload: status
})

export const toggleSidebar = (status) => ({
  type: ScreenActionTypes.TOGGLE_SIDEBAR,
  payload: status
});

export const toggleFilterModal = (status) => ({
  type: ScreenActionTypes.TOGGLE_FILTER,
  payload: status
});

export const toggleSortCategory = (status) => ({
  type: ScreenActionTypes.TOGGLE_SORT_CATEGORY,
  payload: status
});

export const addBearerHeader = (bearer) => ({
  type: ScreenActionTypes.ADD_BEARER_HEADER,
  payload: bearer
});

export const addClientHeader = () => ({
  type: ScreenActionTypes.ADD_CLIENT_HEADER,
  payload: null
});

export const initHeader = () => ({
  type: ScreenActionTypes.INIT_HEADER,
  payload: null
});

export const changeCategoryTitle = (title) => {
  return {
    type: ScreenActionTypes.CHANGE_CATEGORY_TITLE,
    payload: title
  }
}

export const addCategoryId = (field, value) => {
  return {
    type: ScreenActionTypes.ADD_CATEGORY_ID,
    payload: { field, value }
  }
}

export const deleteCategoryId = (field, value) => {
  return {
    type: ScreenActionTypes.DELETE_CATEGORY_ID,
    payload: { field, value }
  }
}

export const deleteCategoryIdAll = (field) => {
  return {
    type: ScreenActionTypes.DELETE_CATEGORY_ID_ALL,
    payload: field
  }
}

export const changeFilterCondition = (condition) => {
  return {
    type: ScreenActionTypes.CHANGE_FILTER_CONDITION,
    payload: condition
  }
}

export const setCategoryId = (field, value) => {
  return {
    type: ScreenActionTypes.SET_CATEGORY_ID,
    payload: { field, value }
  }
}

export const setBrandByCategory = (value, valueBrand) => {
  return {
    type: ScreenActionTypes.SET_BRAND_BY_CATEGORY,
    payload: { value, valueBrand }
  }
}

export const clearAllCategory = () => {
  return {
    type: ScreenActionTypes.CLEAR_ALL_CATEGORY,
    payload: null
  }
}

export const changeCategoryId = (field, value) => {
  return {
    type: ScreenActionTypes.CHANGE_CATEGORY_ID,
    payload: { field, value }
  }
}

export const triggerSearchMenu = (status) => {
  return {
    type: ScreenActionTypes.TRIGGER_SEARCH_MENU,
    payload: status
  }
}

export const changeCategoryTitleValue = (value) => {
  return {
    type: ScreenActionTypes.CHANGE_CATEGORY_TITLE_VALUE,
    payload: value
  }
}

export const toggleCheckoutList = (status) => {
  return {
    type: ScreenActionTypes.TOGGLE_CHECKOUT_LIST,
    payload: status
  }
}

export const resetProposal = () => {
  return {
    type: ScreenActionTypes.RESET_PROPOSAL,
    payload: null
  }
}

export const setNotifyProposal = (proposals) => {
  return {
    type: ScreenActionTypes.SET_NOTIFY_PROPOSAL,
    payload: proposals
  }
}

export const clearNotifyProposal = () => {
  return {
    type: ScreenActionTypes.CLEAR_NOTIFY_PROPOSAL,
    payload: null
  }
}

export const setLanguage = (lang) => {
  return {
    type: ScreenActionTypes.SET_LANGUAGE,
    payload: lang
  }
}
