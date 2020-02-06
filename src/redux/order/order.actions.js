import { OrderActionTypes } from "./order.types";

export const addToCartStart = (values) => {
  return {
    type: OrderActionTypes.ADD_TO_CART_START,
    payload: values
  }
}

export const addToCartSuccess = () => {
  return {
    type: OrderActionTypes.ADD_TO_CART_SUCCESS,
    payload: null
  }
}

export const addToCartFailed = () => {
  return {
    type: OrderActionTypes.ADD_TO_CART_FAILED,
    payload: null
  }
}

export const listCartStart = (values) => {
  return {
    type: OrderActionTypes.LIST_CART_START,
    payload: values
  }
}

export const listCartSuccess = (carts) => {
  return {
    type: OrderActionTypes.LIST_CART_SUCCESS,
    payload: carts
  }
}

export const listCartFailed = () => {
  return {
    type: OrderActionTypes.LIST_CART_FAILED,
    payload: null
  }
}

export const getCartStart = (values) => {
  return {
    type: OrderActionTypes.GET_CART_START,
    payload: values
  }
}

export const getCartSuccess = (cart) => {
  return {
    type: OrderActionTypes.GET_CART_SUCCESS,
    payload: cart
  }
}

export const getCartFailed = () => {
  return {
    type: OrderActionTypes.GET_CART_FAILED,
    payload: null
  }
}

export const getProposalStart = (values) => {
  return {
    type: OrderActionTypes.GET_PROPOSAL_START,
    payload: values
  }
}

export const getProposalSuccess = (cart) => {
  return {
    type: OrderActionTypes.GET_PROPOSAL_SUCCESS,
    payload: cart
  }
}

export const getProposalFailed = () => {
  return {
    type: OrderActionTypes.GET_PROPOSAL_FAILED,
    payload: null
  }
}

export const deleteCartStart = (values) => {
  return {
    type: OrderActionTypes.DELETE_CART_START,
    payload: values
  }
}

export const deleteCartSuccess = (carts) => {
  return {
    type: OrderActionTypes.DELETE_CART_SUCCESS,
    payload: carts
  }
}

export const deleteCartFailed = () => {
  return {
    type: OrderActionTypes.DELETE_CART_FAILED,
    payload: null
  }
}

export const addProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.ADD_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const addProposalExchangeSuccess = (detail) => {
  return {
    type: OrderActionTypes.ADD_PROPOSAL_EXCHANGE_SUCCESS,
    payload: detail
  }
}

export const addProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.ADD_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const listProposalByUserStart = (values) => {
  return {
    type: OrderActionTypes.LIST_PROPOSAL_BY_USER_START,
    payload: values
  }
}

export const listProposalByUserSuccess = (list) => {
  return {
    type: OrderActionTypes.LIST_PROPOSAL_BY_USER_SUCCESS,
    payload: list
  }
}

export const listProposalByUserFailed = () => {
  return {
    type: OrderActionTypes.LIST_PROPOSAL_BY_USER_FAILED,
    payload: null
  }
}

export const buyerReplyProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const buyerReplyProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const buyerReplyProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const buyerAcceptProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const buyerAcceptProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const buyerAcceptProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const buyerRemoveProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const buyerRemoveProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const buyerRemoveProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const sellerReplyProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const sellerReplyProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const sellerReplyProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const sellerRejectProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const sellerRejectProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const sellerRejectProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const sellerAcceptProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const sellerAcceptProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const sellerAcceptProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const sellerCancelProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const sellerCancelProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const sellerCancelProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const sellerRemoveProposalExchangeStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_START,
    payload: values
  }
}

export const sellerRemoveProposalExchangeSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_SUCCESS,
    payload: null
  }
}

export const sellerRemoveProposalExchangeFailed = () => {
  return {
    type: OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_FAILED,
    payload: null
  }
}

export const clearSelectedCart = () => {
  return {
    type: OrderActionTypes.CLEAR_SELECTED_CART,
    payload: null
  }
}

export const addProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.ADD_PROPOSAL_SALE_START,
    payload: values
  }
}

export const addProposalSaleSuccess = (detail) => {
  return {
    type: OrderActionTypes.ADD_PROPOSAL_SALE_SUCCESS,
    payload: detail
  }
}

export const addProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.ADD_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const sellerReplyProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_START,
    payload: values
  }
}

export const sellerReplyProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const sellerReplyProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const buyerRemoveProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_START,
    payload: values
  }
}

export const buyerRemoveProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const buyerRemoveProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const buyerReplyProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_START,
    payload: values
  }
}

export const buyerReplyProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const buyerReplyProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const sellerRejectProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_START,
    payload: values
  }
}

export const sellerRejectProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const sellerRejectProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const buyerAcceptProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_START,
    payload: values
  }
}

export const buyerAcceptProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const buyerAcceptProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const sellerAcceptProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_START,
    payload: values
  }
}

export const sellerAcceptProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const sellerAcceptProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const sellerCancelProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_START,
    payload: values
  }
}

export const sellerCancelProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const sellerCancelProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const sellerRemoveProposalSaleStart = (values) => {
  return {
    type: OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_START,
    payload: values
  }
}

export const sellerRemoveProposalSaleSuccess = () => {
  return {
    type: OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_SUCCESS,
    payload: null
  }
}

export const sellerRemoveProposalSaleFailed = () => {
  return {
    type: OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_FAILED,
    payload: null
  }
}

export const addToCartTracingStart = (values) => {
  return {
    type: OrderActionTypes.ADD_TO_CART_TRACING_START,
    payload: values
  }
}

export const addToCartTracingSuccess = () => {
  return {
    type: OrderActionTypes.ADD_TO_CART_TRACING_SUCCESS,
    payload: null
  }
}

export const addToCartTracingFailed = () => {
  return {
    type: OrderActionTypes.ADD_TO_CART_TRACING_FAILED,
    payload: null
  }
}

export const checkoutCartStart = (values) => {
  return {
    type: OrderActionTypes.CHECKOUT_CART_START,
    payload: values
  }
}

export const checkoutCartSuccess = (list) => {
  return {
    type: OrderActionTypes.CHECKOUT_CART_SUCCESS,
    payload: list
  }
}

export const checkoutCartFailed = () => {
  return {
    type: OrderActionTypes.CHECKOUT_CART_FAILED,
    payload: null
  }
}

export const getOrderActiveStart = () => {
  return {
    type: OrderActionTypes.GET_ORDER_ACTIVE_START,
    payload: {}
  }
}

export const getOrderActiveSuccess = (detail) => {
  return {
    type: OrderActionTypes.GET_ORDER_ACTIVE_SUCCESS,
    payload: detail
  }
}

export const getOrderActiveFailed = () => {
  return {
    type: OrderActionTypes.GET_ORDER_ACTIVE_FAILED,
    payload: null
  }
}

export const removeOrderActiveStart = (values) => {
  return {
    type: OrderActionTypes.REMOVE_ORDER_ACTIVE_START,
    payload: values
  }
}

export const removeOrderActiveSuccess = () => {
  return {
    type: OrderActionTypes.REMOVE_ORDER_ACTIVE_SUCCESS,
    payload: null
  }
}

export const removeOrderActiveFailed = () => {
  return {
    type: OrderActionTypes.REMOVE_ORDER_ACTIVE_FAILED,
    payload: null
  }
}

export const createShippingStart = (values) => {
  return {
    type: OrderActionTypes.CREATE_SHIPPING_START,
    payload: values
  }
}

export const createShippingSuccess = () => {
  return {
    type: OrderActionTypes.CREATE_SHIPPING_SUCCESS,
    payload: null
  }
}

export const createShippingFailed = () => {
  return {
    type: OrderActionTypes.CREATE_SHIPPING_FAILED,
    payload: null
  }
}

export const listShippingStart = () => {
  return {
    type: OrderActionTypes.LIST_SHIPPING_START,
    payload: null
  }
}

export const listShippingSuccess = (list) => {
  return {
    type: OrderActionTypes.LIST_SHIPPING_SUCCESS,
    payload: list
  }
}

export const listShippingFailed = () => {
  return {
    type: OrderActionTypes.LIST_SHIPPING_FAILED,
    payload: null
  }
}

export const selectShipping = (shipping) => {
  return {
    type: OrderActionTypes.SELECT_SHIPPING,
    payload: shipping
  }
}

export const clearShipping = () => {
  return {
    type: OrderActionTypes.CLEAR_SHIPPING,
    payload: null
  }
}

export const updateShippingStart = (values) => {
  return {
    type: OrderActionTypes.UPDATE_SHIPPING_START,
    payload: values
  }
}

export const updateShippingSuccess = () => {
  return {
    type: OrderActionTypes.UPDATE_SHIPPING_SUCCESS,
    payload: null
  }
}

export const updateShippingFailed = () => {
  return {
    type: OrderActionTypes.UPDATE_SHIPPING_FAILED,
    payload: null
  }
}

export const removeShippingStart = (values) => {
  return {
    type: OrderActionTypes.REMOVE_SHIPPING_START,
    payload: values
  }
}

export const removeShippingSuccess = () => {
  return {
    type: OrderActionTypes.REMOVE_SHIPPING_SUCCESS,
    payload: null
  }
}

export const removeShippingFailed = () => {
  return {
    type: OrderActionTypes.REMOVE_SHIPPING_FAILED,
    payload: null
  }
}

export const createBillingStart = (values) => {
  return {
    type: OrderActionTypes.CREATE_BILLING_START,
    payload: values
  }
}

export const createBillingSuccess = () => {
  return {
    type: OrderActionTypes.CREATE_BILLING_SUCCESS,
    payload: null
  }
}

export const createBillingFailed = () => {
  return {
    type: OrderActionTypes.CREATE_BILLING_FAILED,
    payload: null
  }
}

export const listBillingStart = () => {
  return {
    type: OrderActionTypes.LIST_BILLING_START,
    payload: null
  }
}

export const listBillingSuccess = (list) => {
  return {
    type: OrderActionTypes.LIST_BILLING_SUCCESS,
    payload: list
  }
}

export const listBillingFailed = () => {
  return {
    type: OrderActionTypes.LIST_BILLING_FAILED,
    payload: null
  }
}

export const selectBilling = (billing) => {
  return {
    type: OrderActionTypes.SELECT_BILLING,
    payload: billing
  }
}

export const clearBilling = () => {
  return {
    type: OrderActionTypes.CLEAR_BILLING,
    payload: null
  }
}

export const updateBillingStart = (values) => {
  return {
    type: OrderActionTypes.UPDATE_BILLING_START,
    payload: values
  }
}

export const updateBillingSuccess = () => {
  return {
    type: OrderActionTypes.UPDATE_BILLING_SUCCESS,
    payload: null
  }
}

export const updateBillingFailed = () => {
  return {
    type: OrderActionTypes.UPDATE_BILLING_FAILED,
    payload: null
  }
}

export const removeBillingStart = (values) => {
  return {
    type: OrderActionTypes.REMOVE_BILLING_START,
    payload: values
  }
}

export const removeBillingSuccess = () => {
  return {
    type: OrderActionTypes.REMOVE_BILLING_SUCCESS,
    payload: null
  }
}

export const removeBillingFailed = () => {
  return {
    type: OrderActionTypes.REMOVE_BILLING_FAILED,
    payload: null
  }
}

export const paymentStart = (values) => {
  return {
    type: OrderActionTypes.PAYMENT_START,
    payload: values
  }
}

export const paymentSuccess = () => {
  return {
    type: OrderActionTypes.PAYMENT_SUCCESS,
    payload: null
  }
}

export const paymentFailed = () => {
  return {
    type: OrderActionTypes.PAYMENT_FAILED,
    payload: null
  }
}

export const setOrderStep = (step) => {
  return {
    type: OrderActionTypes.SET_ORDER_STEP,
    payload: step
  }
}

export const confirmOrderStart = (values) => {
  return {
    type: OrderActionTypes.CONFIRM_ORDER_START,
    payload: values
  }
}

export const confirmOrderSuccess = () => {
  return {
    type: OrderActionTypes.CONFIRM_ORDER_SUCCESS,
    payload: null
  }
}

export const confirmOrderFailed = () => {
  return {
    type: OrderActionTypes.CONFIRM_ORDER_FAILED,
    payload: null
  }
}

export const listOrderStart = (values) => {
  return {
    type: OrderActionTypes.LIST_ORDER_START,
    payload: values
  }
}

export const listOrderSuccess = (list) => {
  return {
    type: OrderActionTypes.LIST_ORDER_SUCCESS,
    payload: list
  }
}

export const listOrderFailed = () => {
  return {
    type: OrderActionTypes.LIST_ORDER_FAILED,
    payload: null
  }
}
export const listTransactionStart = (values) => {
  return {
    type: OrderActionTypes.LIST_TRANSACTION_START,
    payload: values
  }
}

export const listTransactionSuccess = (list) => {
  return {
    type: OrderActionTypes.LIST_TRANSACTION_SUCCESS,
    payload: list
  }
}

export const listTransactionFailed = () => {
  return {
    type: OrderActionTypes.LIST_TRANSACTION_FAILED,
    payload: null
  }
}
export const listTransactionSellerStart = (values) => {
  return {
    type: OrderActionTypes.LIST_TRANSACTION_SELLER_START,
    payload: values
  }
}

export const listTransactionSellerSuccess = (list) => {
  return {
    type: OrderActionTypes.LIST_TRANSACTION_SELLER_SUCCESS,
    payload: list
  }
}

export const listTransactionSellerFailed = () => {
  return {
    type: OrderActionTypes.LIST_TRANSACTION_SELLER_FAILED,
    payload: null
  }
}
