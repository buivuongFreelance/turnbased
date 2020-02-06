import { takeLatest, select, call, all, put } from "redux-saga/effects";

import { OrderActionTypes } from "./order.types";

import {
  addToCartSuccess, addToCartFailed, listCartSuccess, listCartFailed,
  deleteCartSuccess, deleteCartFailed, getCartSuccess, getCartFailed, addProposalExchangeSuccess, addProposalExchangeFailed,
  listProposalByUserSuccess, listProposalByUserFailed, getProposalSuccess, getProposalFailed, buyerReplyProposalExchangeSuccess,
  buyerReplyProposalExchangeFailed, sellerReplyProposalExchangeSuccess, sellerReplyProposalExchangeFailed, buyerAcceptProposalExchangeFailed,
  sellerRejectProposalExchangeSuccess, sellerRejectProposalExchangeFailed, sellerAcceptProposalExchangeSuccess, sellerAcceptProposalExchangeFailed,
  sellerCancelProposalExchangeSuccess, sellerCancelProposalExchangeFailed, sellerRemoveProposalExchangeSuccess, sellerRemoveProposalExchangeFailed,
  buyerRemoveProposalExchangeSuccess, buyerRemoveProposalExchangeFailed, addProposalSaleSuccess, addProposalSaleFailed, sellerReplyProposalSaleSuccess,
  sellerReplyProposalSaleFailed, buyerRemoveProposalSaleSuccess, buyerRemoveProposalSaleFailed, buyerAcceptProposalExchangeSuccess, buyerReplyProposalSaleSuccess,
  buyerReplyProposalSaleFailed, sellerRejectProposalSaleSuccess, sellerRejectProposalSaleFailed, buyerAcceptProposalSaleSuccess, buyerAcceptProposalSaleFailed,
  sellerAcceptProposalSaleSuccess, sellerAcceptProposalSaleFailed, sellerCancelProposalSaleSuccess, sellerCancelProposalSaleFailed, sellerRemoveProposalSaleSuccess,
  sellerRemoveProposalSaleFailed, addToCartTracingSuccess, addToCartTracingFailed, checkoutCartSuccess, checkoutCartFailed, getOrderActiveSuccess, getOrderActiveFailed,
  removeOrderActiveSuccess,
  removeOrderActiveFailed,
  listShippingSuccess,
  listShippingFailed,
  createShippingSuccess,
  createShippingFailed,
  updateShippingSuccess,
  updateShippingFailed,
  removeShippingSuccess,
  removeShippingFailed,
  listBillingSuccess,
  listBillingFailed,
  createBillingSuccess,
  createBillingFailed,
  updateBillingSuccess,
  updateBillingFailed,
  removeBillingSuccess,
  removeBillingFailed,
  paymentSuccess,
  paymentFailed,
  confirmOrderSuccess,
  confirmOrderFailed,
  listOrderSuccess,
  listOrderFailed,
  listTransactionSuccess,
  listTransactionFailed,
  listTransactionSellerSuccess,
  listTransactionSellerFailed
} from "./order.actions";
import { SERVER_VERSION } from "../../config";
import { setCartCount, plusCartCount, subtractCartCount } from "../storage/storage.actions";

export function* listTransaction({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'transactions?limit=' + limit + '&pageNum=' + parseInt(offset + 1)
    })
    const { data } = yield res;
    const { response: { list } } = yield data;
    yield put(listTransactionSuccess(list));
  } catch (response) {
    if (response) {
      yield put(listTransactionFailed());
    } else {
      yield put(listTransactionFailed());
    }
  }
}
export function* listTransactionSeller({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'transactionsBySeller?limit=' + limit + '&pageNum=' + parseInt(offset + 1)
    })
    const { data } = yield res;
    const { response: { list } } = yield data;
    yield put(listTransactionSellerSuccess(list));
  } catch (response) {
    if (response) {
      yield put(listTransactionSellerFailed());
    } else {
      yield put(listTransactionSellerFailed());
    }
  }
}

export function* listOrder({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'orders?limit=' + limit + '&pageNum=' + parseInt(offset + 1)
    })
    const { data } = yield res;
    const { response: { list } } = yield data;
    yield put(listOrderSuccess(list));
  } catch (response) {
    if (response) {
      yield put(listOrderFailed());
    } else {
      yield put(listOrderFailed());
    }
  }
}

export function* confirmOrder({ payload: { id, shippingId, billingId } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'order/confirm',
      data: {
        id,
        shippingAddressId: shippingId,
        billingAddressId: billingId
      }
    })
    yield put((confirmOrderSuccess()));
  } catch (response) {
    if (response) {
      yield put(confirmOrderFailed());
    } else {
      yield put(confirmOrderFailed());
    }
  }
}

export function* payment({ payload: { orderId, number, name, expiry, cvc, history } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'order/payViaCreditCard',
      data: {
        orderId,
        number,
        name,
        expiry,
        cvc
      }
    })
    yield put((paymentSuccess()));
    yield alertify.success('Payment Successfully');
    historyRedirect({ history, uri: 'account/transaction' });
  } catch (response) {
    yield alertify.error('Payment Failed');
    if (response) {
      yield put(paymentFailed());
    } else {
      yield put(paymentFailed());
    }
  }
}

export function* updateBilling({ payload: { id, receiverName, streetAddress, extendedAddress, zipCode, countryId, cityName, phoneNumber } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'billing',
      data: {
        id,
        receiverName,
        streetAddress,
        extendedAddress,
        zipCode,
        countryId,
        cityName,
        stateName: cityName,
        instruction: streetAddress,
        securityCode: 'test',
        weekendDeliverySaturday: 0,
        weekendDeliverySunday: 1,
        phoneNumber: phoneNumber
      }
    })
    yield put((updateBillingSuccess()));
  } catch (response) {
    if (response) {
      yield put(updateBillingFailed());
    } else {
      yield put(updateBillingFailed());
    }
  }
}

export function* removeBilling({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'billing/' + id
    })
    yield put((removeBillingSuccess()));
  } catch (response) {
    if (response) {
      yield put(removeBillingFailed());
    } else {
      yield put(removeBillingFailed());
    }
  }
}

export function* createBilling({ payload: { receiverName, streetAddress, extendedAddress, zipCode, countryId, cityName, phoneNumber,
  useAsBillingAddress } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'billing',
      data: {
        receiverName,
        streetAddress,
        extendedAddress,
        zipCode,
        countryId,
        cityName,
        stateName: cityName,
        instruction: streetAddress,
        securityCode: 'test',
        weekendDeliverySaturday: 0,
        weekendDeliverySunday: 1,
        phoneNumber: phoneNumber,
        useAsBillingAddress: useAsBillingAddress
      }
    })
    yield put((createBillingSuccess()));
  } catch (response) {
    if (response) {
      yield put(createBillingFailed());
    } else {
      yield put(createBillingFailed());
    }
  }
}

export function* listBilling() {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'billing/getList'
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(listBillingSuccess(response));
  } catch (response) {
    if (response) {
      yield put(listBillingFailed());
    } else {
      yield put(listBillingFailed());
    }
  }
}

export function* updateShipping({ payload: { id, receiverName, streetAddress, extendedAddress, zipCode, countryId, cityName, phoneNumber } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'shipping',
      data: {
        id,
        receiverName,
        streetAddress,
        extendedAddress,
        zipCode,
        countryId,
        cityName,
        stateName: cityName,
        instruction: streetAddress,
        securityCode: 'test',
        weekendDeliverySaturday: 0,
        weekendDeliverySunday: 1,
        phoneNumber: phoneNumber
      }
    })
    yield put((updateShippingSuccess()));
  } catch (response) {
    if (response) {
      yield put(updateShippingFailed());
    } else {
      yield put(updateShippingFailed());
    }
  }
}

export function* removeShipping({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'shipping/' + id
    })
    yield put((removeShippingSuccess()));
  } catch (response) {
    if (response) {
      yield put(removeShippingFailed());
    } else {
      yield put(removeShippingFailed());
    }
  }
}

export function* createShipping({ payload: { receiverName, streetAddress, extendedAddress, zipCode, countryId, cityName, phoneNumber,
  useAsBillingAddress } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'shipping',
      data: {
        receiverName,
        streetAddress,
        extendedAddress,
        zipCode,
        countryId,
        cityName,
        stateName: cityName,
        instruction: streetAddress,
        securityCode: 'test',
        weekendDeliverySaturday: 0,
        weekendDeliverySunday: 1,
        phoneNumber: phoneNumber,
        useAsBillingAddress: useAsBillingAddress
      }
    })
    yield put((createShippingSuccess()));
  } catch (response) {
    if (response) {
      yield put(createShippingFailed());
    } else {
      yield put(createShippingFailed());
    }
  }
}

export function* listShipping() {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'shipping/getList'
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(listShippingSuccess(response));
  } catch (response) {
    if (response) {
      yield put(listShippingFailed());
    } else {
      yield put(listShippingFailed());
    }
  }
}

export function* removeOrderActive({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'order/' + id
    })
    yield put(removeOrderActiveSuccess());
  } catch (response) {
    if (response) {
      yield put(removeOrderActiveFailed());
    } else {
      yield put(removeOrderActiveFailed());
    }
  }
}

export function* getOrderActive({ payload: { } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'order/active'
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(getOrderActiveSuccess(response));
  } catch (response) {
    if (response) {
      yield put(getOrderActiveFailed());
    } else {
      yield put(getOrderActiveFailed());
    }
  }
}

export function* checkoutCart({ payload: { proposalExchangeIds, proposalSaleIds, cartIds, history } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  let params = {
    proposalExchangeIds,
    proposalSaleIds,
    cartIds
  }

  if (proposalExchangeIds.length === 0)
    delete params.proposalExchangeIds;
  if (proposalSaleIds.length === 0)
    delete params.proposalSaleIds;
  if (cartIds.length === 0)
    delete params.cartIds;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'order/checkout',
      data: params
    })
    yield put(checkoutCartSuccess());
    yield historyRedirect({ history, uri: 'order/shipping' });
    yield alertify.success('Checkout Successfully');
  } catch (response) {
    yield history.push('/bags');
    if (response) {
      yield alertify.error('Checkout Failed');
      yield put(checkoutCartFailed());
    } else {
      yield put(checkoutCartFailed());
    }
  }
}

export function* addToCartTracing({ payload: { availableDeviceId, availableDeviceType, token } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'cart/createTracingCart',
      data: {
        availableDeviceId,
        type: availableDeviceType,
        token
      }
    })
    yield put(addToCartTracingSuccess());
    yield put(plusCartCount());
    yield alertify.success('Add To Cart Successfully');
  } catch (response) {
    if (response) {
      yield alertify.error('Add To Cart Failed');
      yield put(addToCartTracingFailed());
    } else {
      yield put(addToCartTracingFailed());
    }
  }
}

export function* sellerRemoveProposalSale({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'proposal/bySeller/' + id
    })
    yield put(sellerRemoveProposalSaleSuccess());
    yield alertify.success('Remove Offer Success');
  } catch (response) {
    if (response) {
      yield alertify.error('Remove Offer Failed');
      yield put(sellerRemoveProposalSaleFailed());
    } else {
      yield put(sellerRemoveProposalSaleFailed());
    }
  }
}

export function* sellerCancelProposalSale({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposal/sellerCancelAccept/' + id
    })
    yield put(sellerCancelProposalSaleSuccess());
    yield alertify.success('Seller Cancel Accept Proposal Sale Successfully');
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Cancel Accept Proposal Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Cancel Accept Proposal Sale Failed' }));
      yield put(sellerCancelProposalSaleFailed());
    } else {
      yield put(sellerCancelProposalSaleFailed());
    }
  }
}

export function* sellerAcceptProposalSale({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposal/accept/' + id
    })
    yield put(sellerAcceptProposalSaleSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Accept Proposal Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Accept Proposal Sale Failed' }));
      yield put(sellerAcceptProposalSaleFailed());
    } else {
      yield put(sellerAcceptProposalSaleFailed());
    }
  }
}

export function* buyerAcceptProposalSale({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposal/buyerAccept/' + id
    })
    yield put(buyerAcceptProposalSaleSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Buyer Accept Proposal Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Buyer Accept Proposal Sale Failed' }));
      yield put(buyerAcceptProposalSaleFailed());
    } else {
      yield put(buyerAcceptProposalSaleFailed());
    }
  }
}

export function* sellerRejectProposalSale({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposal/sellerReject/' + id
    })
    yield put(sellerRejectProposalSaleSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Reject Proposal Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Reject Proposal Sale Failed' }));
      yield put(sellerRejectProposalSaleFailed());
    } else {
      yield put(sellerRejectProposalSaleFailed());
    }
  }
}

export function* buyerReplyProposalSale({ payload: { proposal: { id, proposalSalePrice } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposal/buyerReply/' + id,
      data: {
        sale_proposal_price: proposalSalePrice
      }
    })
    yield put(buyerReplyProposalSaleSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Buyer Reply Proposal Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Buyer Reply Proposal Sale Failed' }));
      yield put(buyerReplyProposalSaleFailed());
    } else {
      yield put(buyerReplyProposalSaleFailed());
    }
  }
}

export function* buyerRemoveProposalSale({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'proposal/byBuyer/' + id
    })
    yield put(buyerRemoveProposalSaleSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Buyer Remove Proposal Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Buyer Remove Proposal Failed' }));
      yield put(buyerRemoveProposalSaleFailed());
    } else {
      yield put(buyerRemoveProposalSaleFailed());
    }
  }
}

export function* sellerReplyProposalSale({ payload: { proposal: { id, proposalSalePrice } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposal/sellerReply/' + id,
      data: {
        sale_proposal_price: proposalSalePrice
      }
    })
    yield put(sellerReplyProposalSaleSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Reply Proposal Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Reply Proposal Sale Failed' }));
      yield put(sellerReplyProposalSaleFailed());
    } else {
      yield put(sellerReplyProposalSaleFailed());
    }
  }
}

export function* addProposalSale({ payload: { device: { cartId, sellerId, salePrice } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    const res = yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'proposal',
      data: {
        cart_id: cartId,
        seller_id: sellerId,
        sale_proposal_price: salePrice
      }
    })
    const { data } = yield res;
    const { response: { proposalSale } } = yield data;
    yield put(addProposalSaleSuccess(proposalSale));
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Make Offer Sale Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Make Offer Sale Failed' }));
      yield put(addProposalSaleFailed());
    } else {
      yield put(addProposalSaleFailed());
    }
  }
}

export function* sellerRemoveProposalExchange({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'proposalExchange/bySeller/' + id
    })
    yield put(sellerRemoveProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Remove Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Remove Proposal Exchange Failed' }));
      yield put(sellerRemoveProposalExchangeFailed());
    } else {
      yield put(sellerRemoveProposalExchangeFailed());
    }
  }
}

export function* sellerCancelProposalExchange({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposalExchange/sellerCancelAccept',
      data: {
        id
      }
    })
    yield put(sellerCancelProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Cancel Accept Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Cancel Accept Proposal Exchange Failed' }));
      yield put(sellerCancelProposalExchangeFailed());
    } else {
      yield put(sellerCancelProposalExchangeFailed());
    }
  }
}

export function* sellerAcceptProposalExchange({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposalExchange/accept/' + id
    })
    yield put(sellerAcceptProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Accept Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Accept Proposal Exchange Failed' }));
      yield put(sellerAcceptProposalExchangeFailed());
    } else {
      yield put(sellerAcceptProposalExchangeFailed());
    }
  }
}

export function* sellerRejectProposalExchange({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposalExchange/sellerReject/' + id
    })
    yield put(sellerRejectProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Reject Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Reject Proposal Exchange Failed' }));
      yield put(sellerRejectProposalExchangeFailed());
    } else {
      yield put(sellerRejectProposalExchangeFailed());
    }
  }
}

export function* sellerReplyProposalExchange({ payload: { proposal: { id, proposalExchangePrice } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposalExchange/sellerReply/' + id,
      data: {
        proposal_exchange_price: proposalExchangePrice
      }
    })
    yield put(sellerReplyProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Seller Reply Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Seller Reply Proposal Exchange Failed' }));
      yield put(sellerReplyProposalExchangeFailed());
    } else {
      yield put(sellerReplyProposalExchangeFailed());
    }
  }
}

export function* buyerRemoveProposalExchange({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'proposalExchange/byBuyer/' + id
    })
    yield put(buyerRemoveProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Buyer Remove Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Buyer Remove Proposal Exchange Failed' }));
      yield put(buyerRemoveProposalExchangeFailed());
    } else {
      yield put(buyerRemoveProposalExchangeFailed());
    }
  }
}

export function* buyerAcceptProposalExchange({ payload: { proposal: { id } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposalExchange/buyerAccept/' + id
    })
    yield put(buyerAcceptProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Buyer Accept Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Buyer Accept Proposal Exchange Failed' }));
      yield put(buyerAcceptProposalExchangeFailed());
    } else {
      yield put(buyerAcceptProposalExchangeFailed());
    }
  }
}

export function* buyerReplyProposalExchange({ payload: { proposal: { id, proposalExchangePrice, exchangeDevice } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'put',
      url: SERVER_VERSION + 'proposalExchange/buyerReply/' + id,
      data: {
        proposal_exchange_price: proposalExchangePrice,
        proposal_exchange_devices: [exchangeDevice]
      }
    })
    yield put(buyerReplyProposalExchangeSuccess());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Buyer Reply Proposal Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Buyer Reply Proposal Exchange Failed' }));
      yield put(buyerReplyProposalExchangeFailed());
    } else {
      yield put(buyerReplyProposalExchangeFailed());
    }
  }
}

export function* listProposalByUser({ payload: { type } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'proposal/filter?type=' + type
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(listProposalByUserSuccess(response));
  } catch (response) {
    if (response) {
      yield put(listProposalByUserFailed());
    } else {
      yield put(listProposalByUserFailed());
    }
  }
}

export function* addProposalExchange({ payload: { device: { cartId, sellerId, exchangePrice, exchangeDevice } } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    const res = yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'proposalExchange',
      data: {
        cart_id: cartId,
        seller_id: sellerId,
        proposal_exchange_price: exchangePrice,
        proposal_exchange_devices: [exchangeDevice]
      }
    })
    const { data } = yield res;
    const { response: { proposalExchange } } = yield data;
    yield put(addProposalExchangeSuccess(proposalExchange));
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Make Offer Exchange Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Make Offer Exchange Failed' }));
      yield put(addProposalExchangeFailed());
    } else {
      yield put(addProposalExchangeFailed());
    }
  }
}

export function* getDetailProposal({ payload: { type, id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'proposal/' + type + '/' + id
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(getProposalSuccess(response));
  } catch (response) {
    if (response) {
      yield put(getProposalFailed());
    } else {
      yield put(getProposalFailed());
    }
  }
}

export function* addToCart({ payload: { availableDeviceId, availableDeviceType } }) {
  const state = yield select();
  const { screen: { apiInstance, translator } } = yield state;

  try {
    yield apiInstance({
      method: 'post',
      url: SERVER_VERSION + 'cart',
      data: {
        availableDeviceId,
        type: availableDeviceType
      }
    })
    yield put(addToCartSuccess());
    yield put(plusCartCount());
    yield alertify.success(translator.translate('lbl_success_add_common', {
      field: translator.translate('title_cart')
    }));
  } catch (response) {
    if (response) {
      yield alertify.error(translator.translate('lbl_error_common'));
      yield put(addToCartFailed());
    } else {
      yield put(addToCartFailed());
    }
  }
}

export function* getCartItem({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'cart/' + id,
      data: {
        id
      }
    })
    const { data } = yield res;
    const { response } = yield data;
    yield put(getCartSuccess(response));
  } catch (response) {
    if (response) {
      yield put(getCartFailed());
    } else {
      yield put(getCartFailed());
    }
  }
}


export function* deleteCart({ payload: { id } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    yield apiInstance({
      method: 'delete',
      url: SERVER_VERSION + 'cart/' + id
    })
    yield put(deleteCartSuccess());
    yield put(subtractCartCount());
    //yield store.addNotification(notificationMessage({ type: 'success', message: 'Delete Cart Successfully' }));
  } catch (response) {
    if (response) {
      //yield store.addNotification(notificationMessage({ type: 'danger', message: 'Delete Cart Failed' }));
      yield put(deleteCartFailed());
    } else {
      yield put(deleteCartFailed());
    }
  }
}

export function* listCart({ payload: { limit, offset } }) {
  const state = yield select();
  const { screen: { apiInstance } } = yield state;

  try {
    let res = yield apiInstance({
      method: 'get',
      url: SERVER_VERSION + 'carts?limit=' + limit + '&pageNum=' + parseInt(offset + 1)
    })
    const { data } = yield res;
    const { response: { list } } = yield data;
    yield put(listCartSuccess(list));
    yield put(setCartCount(list.length));
  } catch (response) {
    if (response) {
      yield put(listCartFailed());
    } else {
      yield put(listCartFailed());
    }
  }
}

export function* onAddToCartStart() {
  yield takeLatest(
    OrderActionTypes.ADD_TO_CART_START,
    addToCart
  )
}

export function* onListCartStart() {
  yield takeLatest(
    OrderActionTypes.LIST_CART_START,
    listCart
  )
}

export function* onGetCartItemStart() {
  yield takeLatest(
    OrderActionTypes.GET_CART_START,
    getCartItem
  )
}

export function* onDeleteCartStart() {
  yield takeLatest(
    OrderActionTypes.DELETE_CART_START,
    deleteCart
  )
}

export function* onAddProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.ADD_PROPOSAL_EXCHANGE_START,
    addProposalExchange
  )
}

export function* onListProposalByUserStart() {
  yield takeLatest(
    OrderActionTypes.LIST_PROPOSAL_BY_USER_START,
    listProposalByUser
  )
}

export function* onGetDetailProposalStart() {
  yield takeLatest(
    OrderActionTypes.GET_PROPOSAL_START,
    getDetailProposal
  )
}

export function* onBuyerReplyProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_START,
    buyerReplyProposalExchange
  )
}

export function* onBuyerAcceptProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_START,
    buyerAcceptProposalExchange
  )
}

export function* onBuyerRemoveProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_START,
    buyerRemoveProposalExchange
  )
}

export function* onSellerReplyProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_START,
    sellerReplyProposalExchange
  )
}

export function* onSellerRejectProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_START,
    sellerRejectProposalExchange
  )
}

export function* onSellerAcceptProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_START,
    sellerAcceptProposalExchange
  )
}

export function* onSellerCancelProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_START,
    sellerCancelProposalExchange
  )
}

export function* onSellerRemoveProposalExchangeStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_START,
    sellerRemoveProposalExchange
  )
}

export function* onAddProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.ADD_PROPOSAL_SALE_START,
    addProposalSale
  )
}

export function* onSellerReplyProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_START,
    sellerReplyProposalSale
  )
}

export function* onBuyerRemoveProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_START,
    buyerRemoveProposalSale
  )
}

export function* onBuyerReplyProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_START,
    buyerReplyProposalSale
  )
}

export function* onSellerRejectProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_START,
    sellerRejectProposalSale
  )
}

export function* onBuyerAcceptProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_START,
    buyerAcceptProposalSale
  )
}

export function* onSellerAcceptProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_START,
    sellerAcceptProposalSale
  )
}

export function* onSellerCancelProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_START,
    sellerCancelProposalSale
  )
}

export function* onSellerRemoveProposalSaleStart() {
  yield takeLatest(
    OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_START,
    sellerRemoveProposalSale
  )
}

export function* onAddToCartTracingStart() {
  yield takeLatest(
    OrderActionTypes.ADD_TO_CART_TRACING_START,
    addToCartTracing
  )
}

export function* onCheckoutCartStart() {
  yield takeLatest(
    OrderActionTypes.CHECKOUT_CART_START,
    checkoutCart
  )
}

export function* onGetOrderActiveStart() {
  yield takeLatest(
    OrderActionTypes.GET_ORDER_ACTIVE_START,
    getOrderActive
  )
}

export function* onRemoveOrderActiveStart() {
  yield takeLatest(
    OrderActionTypes.REMOVE_ORDER_ACTIVE_START,
    removeOrderActive
  )
}

export function* onListShippingStart() {
  yield takeLatest(
    OrderActionTypes.LIST_SHIPPING_START,
    listShipping
  )
}

export function* onCreateShippingStart() {
  yield takeLatest(
    OrderActionTypes.CREATE_SHIPPING_START,
    createShipping
  )
}

export function* onUpdateShippingStart() {
  yield takeLatest(
    OrderActionTypes.UPDATE_SHIPPING_START,
    updateShipping
  )
}

export function* onRemoveShippingStart() {
  yield takeLatest(
    OrderActionTypes.REMOVE_SHIPPING_START,
    removeShipping
  )
}

export function* onListBillingStart() {
  yield takeLatest(
    OrderActionTypes.LIST_BILLING_START,
    listBilling
  )
}

export function* onCreateBillingStart() {
  yield takeLatest(
    OrderActionTypes.CREATE_BILLING_START,
    createBilling
  )
}

export function* onUpdateBillingStart() {
  yield takeLatest(
    OrderActionTypes.UPDATE_BILLING_START,
    updateBilling
  )
}

export function* onRemoveBillingStart() {
  yield takeLatest(
    OrderActionTypes.REMOVE_BILLING_START,
    removeBilling
  )
}

export function* onPaymentStart() {
  yield takeLatest(
    OrderActionTypes.PAYMENT_START,
    payment
  )
}

export function* onConfirmOrderStart() {
  yield takeLatest(
    OrderActionTypes.CONFIRM_ORDER_START,
    confirmOrder
  )
}

export function* onListOrderStart() {
  yield takeLatest(
    OrderActionTypes.LIST_ORDER_START,
    listOrder
  )
}
export function* onListTransactionStart() {
  yield takeLatest(
    OrderActionTypes.LIST_TRANSACTION_START,
    listTransaction
  )
}
export function* onListTransactionSellerStart() {
  yield takeLatest(
    OrderActionTypes.LIST_TRANSACTION_SELLER_START,
    listTransactionSeller
  )
}
export function* orderSagas() {
  yield all([
    call(onAddToCartStart),
    call(onListCartStart),
    call(onDeleteCartStart),
    call(onAddProposalExchangeStart),
    call(onGetCartItemStart),
    call(onListProposalByUserStart),
    call(onGetDetailProposalStart),
    call(onBuyerReplyProposalExchangeStart),
    call(onBuyerAcceptProposalExchangeStart),
    call(onBuyerRemoveProposalExchangeStart),
    call(onSellerReplyProposalExchangeStart),
    call(onSellerRejectProposalExchangeStart),
    call(onSellerAcceptProposalExchangeStart),
    call(onSellerCancelProposalExchangeStart),
    call(onSellerRemoveProposalExchangeStart),
    call(onAddProposalSaleStart),
    call(onSellerReplyProposalSaleStart),
    call(onBuyerRemoveProposalSaleStart),
    call(onBuyerReplyProposalSaleStart),
    call(onSellerRejectProposalSaleStart),
    call(onBuyerAcceptProposalSaleStart),
    call(onSellerAcceptProposalSaleStart),
    call(onSellerCancelProposalSaleStart),
    call(onSellerRemoveProposalSaleStart),
    call(onAddToCartTracingStart),
    call(onCheckoutCartStart),
    call(onGetOrderActiveStart),
    call(onRemoveOrderActiveStart),
    call(onListShippingStart),
    call(onCreateShippingStart),
    call(onUpdateShippingStart),
    call(onRemoveShippingStart),
    call(onListBillingStart),
    call(onCreateBillingStart),
    call(onUpdateBillingStart),
    call(onRemoveBillingStart),
    call(onPaymentStart),
    call(onConfirmOrderStart),
    call(onListOrderStart),
    call(onListTransactionStart),
    call(onListTransactionSellerStart)
  ]);
}
