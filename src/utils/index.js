import check from "check-types";

export const animationFade = (delay) => {
  return {
    enter: { opacity: 1, delay: delay ? delay : 0 },
    exit: { opacity: 0, delay: delay ? delay : 0 }
  }
}

export const notificationMessage = ({ type, message, time }) => {
  let title = 'Success';
  let timeout = 1000;

  if (typeof time !== undefined)
    timeout = time;

  if (type === 'danger')
    title = 'Error';

  return {
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 800,
      onScreen: timeout > 0 ? true : false,
      click: true,
      touch: true,
      pauseOnHover: false,
      waitForAnimation: true
    }
  }
}

export const getQueryString = (data = {}) => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export const historyRedirect = ({ history, uri }) => {
  history.push('/' + uri);
}

export const getCategoryParams = ({ title, ids, brandIds, types, condition, colorIds }) => {
  let obj = {};
  obj.title = title;
  if (ids.length > 0)
    obj.categoryIds = ids;
  if (brandIds.length > 0)
    obj.brandIds = brandIds;
  if (types.length > 0)
    obj.types = types;
  if (condition) {
    if (condition.length === 2) {
      obj.conditionStart = condition[0];
      obj.conditionEnd = condition[1];
    }
  }
  if (colorIds.length > 0)
    obj.colorIds = colorIds;
  return obj;
}

export const removeItemArray = (value, arr) => {
  let array = Object.assign([], arr);
  let index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

export const displayStringExchangeBuyerShort = (price, index, translator) => {
  let str = '';
  if (!check.negative(price)) {
    if (index)
      str = ' ' + translator.translate('title_for') + ' ';
    else
      str = translator.translate('title_pay') + ' ';
  } else {
    if (index)
      str = ' ' + translator.translate('title_from') + ' ';
    else
      str = translator.translate('title_get') + ' ';
  }
  return str;
}

export const displayStringExchangeSellerShort = (price, index, translator) => {
  let str = '';
  if (check.negative(price)) {
    if (index)
      str = ' ' + translator.translate('title_for') + ' ';
    else
      str = translator.translate('title_pay') + ' ';
  } else {
    if (index)
      str = ' ' + translator.translate('title_from') + ' ';
    else
      str = translator.translate('title_get') + ' ';
  }
  return str;
}

export const displayStringExchangeBuyer = (price, modelName, translator = null) => {
  let str = '';
  if (!check.negative(price)) {
    if (price === 0) {
      if (translator)
        str = translator.translate('title_exchange_with') + ' ' + modelName;
      else
        str = 'Exchange with ' + modelName;
    } else {
      if (translator)
        str = translator.translate('title_pay_for') + ' ' + modelName;
      else
        str = 'Pay for ' + modelName;
    }
  } else {
    if (translator)
      str = translator.translate('title_get_from') + ' ' + modelName;
    else
      str = 'Get from ' + modelName;
  }
  return str;
}

export const displayStringExchangeSeller = (price, modelName, translator = null) => {
  let str = '';
  if (!check.negative(price)) {
    if (price === 0) {
      if (translator)
        str = translator.translate('title_exchange_with') + ' ' + modelName;
      else
        str = 'Exchange with ' + modelName;
    } else {
      if (translator)
        str = translator.translate('title_get_from') + ' ' + modelName;
      else
        str = 'Get from ' + modelName;
    }
  } else {
    if (translator)
      str = translator.translate('title_pay_for') + ' ' + modelName;
    else
      str = 'Pay for ' + modelName;
  }
  return str;
}

export const calculateCommissionSale = (price, commission) => {
  if (!check.negative(price)) {
    return parseFloat(price + parseFloat(price * commission / 100));
  } else
    return parseFloat(Math.abs(price) - parseFloat(price * commission / 100));
}

export const calculateCommissionExchange = (price, commission) => {
  if (!check.negative(price)) {
    return parseFloat(price - parseFloat(price * commission / 100));
  } else
    return parseFloat(Math.abs(price) - parseFloat(price * commission / 100));
}
