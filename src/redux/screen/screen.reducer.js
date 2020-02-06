import { ScreenActionTypes } from "./screen.types";

import axios from "axios";
import { SERVER_TIMEOUT, DOMAIN_SERVER, CLIENT_ID } from "../../config";
import { removeItemArray } from "../../utils";

import { Translator } from '@eo-locale/core';
import locales from "../../utils/locales";

const INITIAL_STATE = {
  width: 0,
  apiInstance: null,
  isOpenAccountModal: false,
  isOpenCartModal: false,
  isOpenSidebarModal: false,
  isOpenFilterModal: false,
  isOpenSortCategory: false,
  isOpenCheckoutList: false,
  categoryTitle: {
    type: 'bestMatch',
    value: ''
  },
  categoryIds: [],
  brandIds: [],
  types: [],
  condition: [0, 100],
  colorIds: [],
  triggerSearch: false,
  resetProposal: 0,
  countProposal: 0,
  notifyProposals: [],
  translator: null
};

const screenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ScreenActionTypes.SCREEN_CHANGE:
      state.width = action.payload;
      return state;
    case ScreenActionTypes.TOGGLE_ACCOUNT_MODAL:
      state.isOpenAccountModal = action.payload;
      return state;
    case ScreenActionTypes.TOOGLE_CART_MODAL:
      state.isOpenCartModal = action.payload;
      return state;
    case ScreenActionTypes.TOGGLE_SIDEBAR:
      state.isOpenSidebarModal = action.payload;
      return state;
    case ScreenActionTypes.TOGGLE_FILTER:
      state.isOpenFilterModal = action.payload;
      return state;
    case ScreenActionTypes.TOGGLE_SORT_CATEGORY:
      state.isOpenSortCategory = action.payload;
      return state;
    case ScreenActionTypes.TOGGLE_CHECKOUT_LIST:
      state.isOpenCheckoutList = action.payload;
      return state;
    case ScreenActionTypes.ADD_BEARER_HEADER:
      state.apiInstance.defaults.headers['Authorization'] = 'Bearer ' + action.payload;
      return state;
    case ScreenActionTypes.ADD_CLIENT_HEADER:
      state.apiInstance.defaults.headers['Authorization'] = 'Basic ' + CLIENT_ID;
      return state;
    case ScreenActionTypes.INIT_HEADER:
      state.apiInstance = axios.create({
        baseURL: DOMAIN_SERVER,
        timeout: SERVER_TIMEOUT | 5000,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Basic ' + CLIENT_ID
        }
      })
      state.apiInstance.interceptors.response.use((response) => {
        return response
      }, (error) => {
        if (typeof error.response !== 'undefined') {
          if (error.response.status === 401) {
            const data = error.response.data;
            if (data) {
              const message = { data };
              if (message) {
                if (
                  !message.includes('User not found')
                  &&
                  !message.includes('Incorrect Password')
                ) {
                  alertify.error('Token Expired, Please Login Again');
                  localStorage.clear();
                  location.reload(true);
                }
              }
            }
          }
          return Promise.reject(error.response);
        } else {
          error.response = null;
          return Promise.reject(error.response);
        }
      });
      return state;
    case ScreenActionTypes.CHANGE_CATEGORY_TITLE:
      state.categoryTitle = {
        type: action.payload,
        value: state.categoryTitle.value
      }
      return state;
    case ScreenActionTypes.CHANGE_CATEGORY_TITLE_VALUE:
      state.categoryTitle = {
        type: state.categoryTitle.type,
        value: action.payload
      }
      return state;
    case ScreenActionTypes.ADD_CATEGORY_ID:
      state[action.payload.field].push(action.payload.value);
      return state;
    case ScreenActionTypes.DELETE_CATEGORY_ID:
      state[action.payload.field] = removeItemArray(action.payload.value, state[action.payload.field]);
      return state;
    case ScreenActionTypes.DELETE_CATEGORY_ID_ALL:
      state[action.payload] = [];
      return state;
    case ScreenActionTypes.CHANGE_FILTER_CONDITION:
      state.condition = action.payload;
      return state;
    case ScreenActionTypes.SET_CATEGORY_ID:
      let fields = ['categoryTitle', 'categoryIds', 'brandIds', 'types', 'condition', 'colorIds'];
      let values = [
        { type: 'bestMatch', value: '' },
        [],
        [],
        [],
        [0, 100],
        []
      ];

      for (let index in fields) {
        if (fields[index] === action.payload.field)
          state[fields[index]] = action.payload.value;
        else {
          state[fields[index]] = values[index];
        }
      }
      return state;
    case ScreenActionTypes.SET_BRAND_BY_CATEGORY:
      let fieldsB = ['categoryTitle', 'categoryIds', 'brandIds', 'types', 'condition', 'colorIds'];
      let valuesB = [
        { type: 'bestMatch', value: '' },
        [action.payload.value],
        [action.payload.valueBrand],
        [],
        [0, 100],
        []
      ];

      for (let index in fieldsB) {
        state[fieldsB[index]] = valuesB[index];
      }
      return state;
    case ScreenActionTypes.CLEAR_ALL_CATEGORY:
      let fieldsC = ['categoryTitle', 'categoryIds', 'brandIds', 'types', 'condition', 'colorIds'];
      let valuesC = [
        { type: 'bestMatch', value: '' },
        [],
        [],
        [],
        [0, 100],
        []
      ];

      for (let index in fieldsC) {
        state[fieldsC[index]] = valuesC[index];
      }
      return state;
    case ScreenActionTypes.CHANGE_CATEGORY_ID:
      state[action.payload.field] = action.payload.value;
      return state;
    case ScreenActionTypes.TRIGGER_SEARCH_MENU:
      state.triggerSearch = action.payload;
      return state;
    case ScreenActionTypes.RESET_PROPOSAL:
      state.resetProposal = (state.resetProposal + 1);
      return state;
    case ScreenActionTypes.SET_NOTIFY_PROPOSAL:
      state.notifyProposals = action.payload;
      state.countProposal = action.payload.length;
      return state;
    case ScreenActionTypes.CLEAR_NOTIFY_PROPOSAL:
      state.notifyProposals = [];
      state.countProposal = 0;
      return state;
    case ScreenActionTypes.SET_LANGUAGE:
      state.translator = new Translator(action.payload, locales);
      return state;
    default:
      return state;
  }
};

export default screenReducer;
