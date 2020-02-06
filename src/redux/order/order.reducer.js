import { OrderActionTypes } from "./order.types";

const INITIAL_STATE = {
  loadingAddToCart: false,
  loadingAddToCartTracing: false,
  loadingDeleteCart: false,
  loadingProposalExchange: false,
  loadingDetailProposal: false,
  loadingListProposalByUser: false,
  loadingListCart: false,
  loadingDetailCart: false,
  carts: [],
  selectedCart: null,
  selectedProposal: null,
  selectedReceiverProposal: null,
  proposalsByUser: [],
  loadingProposalSale: false,
  loadingCheckoutCart: false,
  cartsCheckout: [],
  selectedOrder: null,
  loadingSelectedOrder: false,
  loadingRemoveOrder: false,
  shippings: [],
  loadingListShipping: false,
  loadingCreateShipping: false,
  loadingUpdateShipping: false,
  loadingRemoveShipping: false,
  selectedShipping: null,
  loadingCreateBilling: false,
  billings: [],
  loadingListBilling: false,
  loadingUpdateBilling: false,
  loadingRemoveBilling: false,
  selectedBilling: null,
  loadingPayment: false,
  orderStep: 1,
  loadingConfirmOrder: false,
  loadingListOrder: false,
  orders: [],
  loadingListTransaction: false,
  transactions: [],
  loadingListTransactionSeller: false,
  transactionsSeller: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ADD_TO_CART_START:
      state.loadingAddToCart = true;
      return state;
    case OrderActionTypes.ADD_TO_CART_SUCCESS:
      state.loadingAddToCart = false;
      return state;
    case OrderActionTypes.ADD_TO_CART_FAILED:
      state.loadingAddToCart = false;
      return state;
    case OrderActionTypes.LIST_CART_START:
      state.loadingListCart = true;
      return state;
    case OrderActionTypes.LIST_CART_SUCCESS:
      state.loadingListCart = false;
      state.carts = action.payload;
      return state;
    case OrderActionTypes.LIST_CART_FAILED:
      state.loadingListCart = false;
      state.carts = [];
      return state;
    case OrderActionTypes.GET_CART_START:
      state.loadingDetailCart = true;
      return state;
    case OrderActionTypes.GET_CART_SUCCESS:
      state.loadingDetailCart = false;
      state.selectedCart = action.payload;
      return state;
    case OrderActionTypes.GET_CART_FAILED:
      state.loadingDetailCart = false;
      state.selectedCart = null;
      return state;
    case OrderActionTypes.GET_PROPOSAL_START:
      state.loadingDetailProposal = true;
      return state;
    case OrderActionTypes.GET_PROPOSAL_SUCCESS:
      state.loadingDetailProposal = false;
      state.selectedProposal = action.payload;
      return state;
    case OrderActionTypes.GET_PROPOSAL_FAILED:
      state.loadingDetailProposal = false;
      state.selectedProposal = null;
      return state;
    case OrderActionTypes.DELETE_CART_START:
      state.loadingDeleteCart = true;
      return state;
    case OrderActionTypes.DELETE_CART_SUCCESS:
      state.loadingDeleteCart = false;
      return state;
    case OrderActionTypes.DELETE_CART_FAILED:
      state.loadingDeleteCart = false;
      return state;
    case OrderActionTypes.ADD_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.ADD_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      state.selectedReceiverProposal = action.payload;
      return state;
    case OrderActionTypes.ADD_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      state.selectedReceiverProposal = null;
      return state;
    case OrderActionTypes.LIST_PROPOSAL_BY_USER_START:
      state.loadingListProposalByUser = true;
      return state;
    case OrderActionTypes.LIST_PROPOSAL_BY_USER_SUCCESS:
      state.proposalsByUser = action.payload;
      state.loadingListProposalByUser = false;
      return state;
    case OrderActionTypes.LIST_PROPOSAL_BY_USER_FAILED:
      state.proposalsByUser = [];
      state.loadingListProposalByUser = false;
      return state;
    case OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.BUYER_REPLY_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.BUYER_ACCEPT_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      state.selectedCart = null;
      return state;
    case OrderActionTypes.BUYER_REMOVE_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_REPLY_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_REJECT_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_ACCEPT_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_CANCEL_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_START:
      state.loadingProposalExchange = true;
      return state;
    case OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_SUCCESS:
      state.loadingProposalExchange = false;
      state.selectedProposal = null;
      return state;
    case OrderActionTypes.SELLER_REMOVE_PROPOSAL_EXCHANGE_FAILED:
      state.loadingProposalExchange = false;
      return state;
    case OrderActionTypes.CLEAR_SELECTED_CART:
      state.selectedCart = null;
      return state;
    case OrderActionTypes.ADD_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.ADD_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      state.selectedReceiverProposal = action.payload;
      return state;
    case OrderActionTypes.ADD_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      state.selectedReceiverProposal = null;
      return state;
    case OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_REPLY_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      state.selectedCart = null;
      return state;
    case OrderActionTypes.BUYER_REMOVE_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.BUYER_REPLY_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_REJECT_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.BUYER_ACCEPT_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_ACCEPT_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_CANCEL_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_START:
      state.loadingProposalSale = true;
      return state;
    case OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_SUCCESS:
      state.loadingProposalSale = false;
      state.selectedProposal = null;
      return state;
    case OrderActionTypes.SELLER_REMOVE_PROPOSAL_SALE_FAILED:
      state.loadingProposalSale = false;
      return state;
    case OrderActionTypes.ADD_TO_CART_TRACING_START:
      state.loadingAddToCartTracing = true;
      return state;
    case OrderActionTypes.ADD_TO_CART_TRACING_SUCCESS:
      state.loadingAddToCartTracing = false;
      return state;
    case OrderActionTypes.ADD_TO_CART_TRACING_FAILED:
      state.loadingAddToCartTracing = false;
      return state;
    case OrderActionTypes.CHECKOUT_CART_START:
      state.loadingCheckoutCart = true;
      return state;
    case OrderActionTypes.CHECKOUT_CART_SUCCESS:
      state.loadingCheckoutCart = false;
      return state;
    case OrderActionTypes.CHECKOUT_CART_FAILED:
      state.loadingCheckoutCart = false;
      return state;
    case OrderActionTypes.GET_ORDER_ACTIVE_START:
      state.loadingSelectedOrder = true;
      return state;
    case OrderActionTypes.GET_ORDER_ACTIVE_SUCCESS:
      state.loadingSelectedOrder = false;
      state.selectedOrder = action.payload;
      return state;
    case OrderActionTypes.GET_ORDER_ACTIVE_FAILED:
      state.loadingSelectedOrder = false;
      state.selectedOrder = null;
      return state;
    case OrderActionTypes.REMOVE_ORDER_ACTIVE_START:
      state.loadingRemoveOrder = true;
      return state;
    case OrderActionTypes.REMOVE_ORDER_ACTIVE_SUCCESS:
      state.loadingRemoveOrder = false;
      state.selectedOrder = action.payload;
      return state;
    case OrderActionTypes.REMOVE_ORDER_ACTIVE_FAILED:
      state.loadingRemoveOrder = false;
      state.selectedOrder = null;
      return state;
    case OrderActionTypes.LIST_SHIPPING_START:
      state.loadingListShipping = true;
      return state;
    case OrderActionTypes.LIST_SHIPPING_SUCCESS:
      state.loadingListShipping = false;
      state.shippings = action.payload;
      return state;
    case OrderActionTypes.LIST_SHIPPING_FAILED:
      state.loadingListShipping = false;
      state.shippings = [];
      return state;
    case OrderActionTypes.CREATE_SHIPPING_START:
      state.loadingCreateShipping = true;
      return state;
    case OrderActionTypes.CREATE_SHIPPING_SUCCESS:
      state.loadingCreateShipping = false;
      return state;
    case OrderActionTypes.CREATE_SHIPPING_FAILED:
      state.loadingCreateShipping = false;
      return state;
    case OrderActionTypes.SELECT_SHIPPING:
      state.selectedShipping = action.payload;
      return state;
    case OrderActionTypes.CLEAR_SHIPPING:
      state.selectedShipping = null;
      return state;
    case OrderActionTypes.UPDATE_SHIPPING_START:
      state.loadingUpdateShipping = true;
      return state;
    case OrderActionTypes.UPDATE_SHIPPING_SUCCESS:
      state.loadingUpdateShipping = false;
      return state;
    case OrderActionTypes.UPDATE_SHIPPING_FAILED:
      state.loadingUpdateShipping = false;
      return state;
    case OrderActionTypes.REMOVE_SHIPPING_START:
      state.loadingRemoveShipping = true;
      return state;
    case OrderActionTypes.REMOVE_SHIPPING_SUCCESS:
      state.loadingRemoveShipping = false;
      return state;
    case OrderActionTypes.REMOVE_SHIPPING_FAILED:
      state.loadingRemoveShipping = false;
      return state;
    case OrderActionTypes.CREATE_BILLING_START:
      state.loadingCreateBilling = true;
      return state;
    case OrderActionTypes.CREATE_BILLING_SUCCESS:
      state.loadingCreateBilling = false;
      return state;
    case OrderActionTypes.CREATE_BILLING_FAILED:
      state.loadingCreateBilling = false;
      return state;
    case OrderActionTypes.LIST_BILLING_START:
      state.loadingListBilling = true;
      return state;
    case OrderActionTypes.LIST_BILLING_SUCCESS:
      state.loadingListBilling = false;
      state.billings = action.payload;
      return state;
    case OrderActionTypes.LIST_BILLING_FAILED:
      state.loadingListBilling = false;
      state.billings = [];
      return state;
    case OrderActionTypes.SELECT_BILLING:
      state.selectedBilling = action.payload;
      return state;
    case OrderActionTypes.CLEAR_BILLING:
      state.selectedBilling = null;
      return state;
    case OrderActionTypes.UPDATE_BILLING_START:
      state.loadingUpdateBilling = true;
      return state;
    case OrderActionTypes.UPDATE_BILLING_SUCCESS:
      state.loadingUpdateBilling = false;
      return state;
    case OrderActionTypes.UPDATE_BILLING_FAILED:
      state.loadingUpdateBilling = false;
      return state;
    case OrderActionTypes.REMOVE_BILLING_START:
      state.loadingRemoveBilling = true;
      return state;
    case OrderActionTypes.REMOVE_BILLING_SUCCESS:
      state.loadingRemoveBilling = false;
      return state;
    case OrderActionTypes.REMOVE_BILLING_FAILED:
      state.loadingRemoveBilling = false;
      return state;
    case OrderActionTypes.PAYMENT_START:
      state.loadingPayment = true;
      return state;
    case OrderActionTypes.PAYMENT_SUCCESS:
      state.loadingPayment = false;
      return state;
    case OrderActionTypes.PAYMENT_FAILED:
      state.loadingPayment = false;
      return state;
    case OrderActionTypes.SET_ORDER_STEP:
      state.orderStep = action.payload;
      return state;
    case OrderActionTypes.CONFIRM_ORDER_START:
      state.loadingConfirmOrder = true;
      return state;
    case OrderActionTypes.CONFIRM_ORDER_SUCCESS:
      state.loadingConfirmOrder = false;
      return state;
    case OrderActionTypes.CONFIRM_ORDER_FAILED:
      state.loadingConfirmOrder = false;
      return state;
    case OrderActionTypes.LIST_ORDER_START:
      state.loadingListOrder = true;
      return state;
    case OrderActionTypes.LIST_ORDER_SUCCESS:
      state.loadingListOrder = false;
      state.orders = action.payload;
      return state;
    case OrderActionTypes.LIST_ORDER_FAILED:
      state.loadingListOrder = false;
      state.orders = [];
      return state;
    case OrderActionTypes.LIST_TRANSACTION_START:
      state.loadingListTransaction = true;
      return state;
    case OrderActionTypes.LIST_TRANSACTION_SUCCESS:
      state.loadingListTransaction = false;
      state.transactions = action.payload;
      return state;
    case OrderActionTypes.LIST_TRANSACTION_FAILED:
      state.loadingListTransaction = false;
      state.transactions = [];
      return state;
    case OrderActionTypes.LIST_TRANSACTION_SELLER_START:
      state.loadingListTransactionSeller = true;
      return state;
    case OrderActionTypes.LIST_TRANSACTION_SELLER_SUCCESS:
      state.loadingListTransactionSeller = false;
      state.transactionsSeller = action.payload;
      return state;
    case OrderActionTypes.LIST_TRANSACTION_SELLER_FAILED:
      state.loadingListTransactionSeller = false;
      state.transactionsSeller = [];
      return state;
    default:
      return state;
  }
};

export default orderReducer;
