import { createSelector } from "reselect";

const selectOrder = state => state.order;

export const selectLoadingAddToCart = createSelector(
  [selectOrder],
  (order) => order.loadingAddToCart
);

export const selectLoadingDeleteCart = createSelector(
  [selectOrder],
  (order) => order.loadingDeleteCart
);

export const selectCarts = createSelector(
  [selectOrder],
  (order) => order.carts
);

export const selectLoadingProposal = createSelector(
  [selectOrder],
  (order) => order.loadingProposalExchange
);

export const selectSelectedCart = createSelector(
  [selectOrder],
  (order) => order.selectedCart
);

export const selectSelectedProposal = createSelector(
  [selectOrder],
  (order) => order.selectedProposal
);

export const selectProposalsByUser = createSelector(
  [selectOrder],
  (order) => order.proposalsByUser
);

export const selectLoadingProposalByUser = createSelector(
  [selectOrder],
  (order) => order.loadingListProposalByUser
);

export const selectLoadingListCart = createSelector(
  [selectOrder],
  (order) => order.loadingListCart
);

export const selectLoadingDetailProposal = createSelector(
  [selectOrder],
  (order) => order.loadingDetailProposal
);

export const selectLoadingDetailCart = createSelector(
  [selectOrder],
  (order) => order.loadingDetailCart
);

export const selectLoadingProposalSale = createSelector(
  [selectOrder],
  (order) => order.loadingProposalSale
);

export const selectLoadingAddToCartTracing = createSelector(
  [selectOrder],
  (order) => order.loadingAddToCartTracing
);

export const selectLoadingCheckoutCart = createSelector(
  [selectOrder],
  (order) => order.loadingCheckoutCart
);

export const selectLoadingSelectedOrder = createSelector(
  [selectOrder],
  (order) => order.loadingSelectedOrder
);

export const selectSelectedOrder = createSelector(
  [selectOrder],
  (order) => order.selectedOrder
);

export const selectLoadingRemoveOrder = createSelector(
  [selectOrder],
  (order) => order.loadingRemoveOrder
);

export const selectLoadingListShipping = createSelector(
  [selectOrder],
  (order) => order.loadingListShipping
);

export const selectShippings = createSelector(
  [selectOrder],
  (order) => order.shippings
);

export const selectLoadingCreateShipping = createSelector(
  [selectOrder],
  (order) => order.loadingCreateShipping
);

export const selectSelectedShipping = createSelector(
  [selectOrder],
  (order) => order.selectedShipping
);

export const selectLoadingUpdateShipping = createSelector(
  [selectOrder],
  (order) => order.loadingUpdateShipping
);

export const selectLoadingRemoveShipping = createSelector(
  [selectOrder],
  (order) => order.loadingRemoveShipping
);

export const selectLoadingListBilling = createSelector(
  [selectOrder],
  (order) => order.loadingListBilling
);

export const selectBillings = createSelector(
  [selectOrder],
  (order) => order.billings
);

export const selectLoadingCreateBilling = createSelector(
  [selectOrder],
  (order) => order.loadingCreateBilling
);

export const selectSelectedBilling = createSelector(
  [selectOrder],
  (order) => order.selectedBilling
);

export const selectLoadingUpdateBilling = createSelector(
  [selectOrder],
  (order) => order.loadingUpdateBilling
);

export const selectLoadingRemoveBilling = createSelector(
  [selectOrder],
  (order) => order.loadingRemoveBilling
);

export const selectLoadingPayment = createSelector(
  [selectOrder],
  (order) => order.loadingPayment
);

export const selectOrderStep = createSelector(
  [selectOrder],
  (order) => order.orderStep
);

export const selectLoadingConfirmOrder = createSelector(
  [selectOrder],
  (order) => order.loadingConfirmOrder
);

export const selectSelectedReceiverProposal = createSelector(
  [selectOrder],
  (order) => order.selectedReceiverProposal
);

export const selectLoadingListOrder = createSelector(
  [selectOrder],
  (order) => order.loadingListOrder
);

export const selectOrders = createSelector(
  [selectOrder],
  (order) => order.orders
);

export const selectLoadingListTransaction = createSelector(
  [selectOrder],
  (order) => order.loadingListTransaction
);

export const selectTransactions = createSelector(
  [selectOrder],
  (order) => order.transactions
);

export const selectTransactionsGroupByOrder = createSelector(
  [selectOrder],
  (order) => {
    let transactionsGroupByOrder = [];
    const { transactions } = order;
    let prevOrderId = 0;
    let prevRow = -1;
    for (let transaction of transactions) {
      const { orderId, order } = transaction;
      if (orderId) {
        if (orderId !== prevOrderId) {
          prevOrderId = orderId;
          transactionsGroupByOrder.push({
            transactions: [transaction],
            ...order
          });
          prevRow++;
        } else {
          transactionsGroupByOrder[prevRow].transactions.push(transaction);
        }
      }
    }
    return (
      transactionsGroupByOrder
    )
  }
);
export const selectLoadingListTransactionSeller = createSelector(
  [selectOrder],
  (order) => order.loadingListTransactionSeller
);

export const selectTransactionsSeller = createSelector(
  [selectOrder],
  (order) => order.transactionsSeller
);
