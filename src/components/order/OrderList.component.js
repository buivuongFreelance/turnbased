import React, { Component } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectScreenWidth } from "../../redux/screen/screen.selectors";
import { selectOrders, selectLoadingListOrder } from "../../redux/order/order.selectors";
import { listOrderStart } from "../../redux/order/order.actions";

import { withRouter } from "react-router";
import { IS_MOBILE } from "../../config";

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import CommonLoading from "../common/CommonLoading.component";
import NumberFormat from "react-number-format";

class OrderList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.resetListOrder();
  }
  resetListOrder() {
    this.props.listOrderStart(100, 0);
  }
  renderSort() {
    return (
      <span className="uk-text-meta uk-margin-small-left">
        <i className="fa fa-long-arrow-up"></i>
        <i className="fa fa-long-arrow-down"></i>
      </span>
    )
  }
  render() {
    const { loadingListOrder, orders, screenWidth } = this.props;

    const columns = [
      {
        Header: () => {
          return (
            <div className="uk-flex uk-flex-middle uk-flex-center">
              <span>OrderId</span>
              {this.renderSort()}
            </div>
          )
        },
        accessor: 'id',
        headerClassName: 'uk-text-bolder uk-text-secondary',
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: () => {
          return (
            <div className="uk-flex uk-flex-middle uk-flex-center">
              <span>Status</span>
              {this.renderSort()}
            </div>
          )
        },
        accessor: 'status',
        headerClassName: 'uk-text-bolder uk-text-secondary',
        Cell: props => {
          return (
            <span className="uk-flex uk-flex-center">{props.value}</span>
          )
        }
      },
      {
        Header: () => {
          return (
            <div className="uk-flex uk-flex-middle uk-flex-center">
              <span>Total Money</span>
              {this.renderSort()}
            </div>
          )
        },
        accessor: 'totalMoney',
        headerClassName: 'uk-text-bolder uk-text-secondary',
        Cell: props => {
          if (props.value > 0)
            return <span className="uk-flex uk-flex-center"><NumberFormat value={Math.abs(props.value)} displayType="text" thousandSeparator={true} prefix={'$'} /></span>
          else {
            return (
              <div className="uk-flex uk-flex-center">
                <b>You get: </b>
                <NumberFormat value={Math.abs(props.value)} displayType="text" thousandSeparator={true} prefix={'$'} />
              </div>
            )
          }
        }
      }
    ];

    return (
      <div className={"uk-position-relative " + (screenWidth === IS_MOBILE ? 'uk-padding-small' : '')}>
        {loadingListOrder && <CommonLoading />}
        <ReactTable
          data={orders}
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  screenWidth: selectScreenWidth,
  orders: selectOrders,
  loadingListOrder: selectLoadingListOrder
});

const mapDispatchToProps = dispatch => ({
  listOrderStart: (limit, offset) => dispatch(listOrderStart({ limit, offset })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderList));
