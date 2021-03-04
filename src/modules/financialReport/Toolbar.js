import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification} from "antd";
import {exportExcel, getById, showInsert, showRPAInsert} from "./actions";
import {getPrincipal} from "../../lib/identity";


class Toolbar extends PureComponent {
    handleShowInsert = () => {
        const {dispatch} = this.props;
        dispatch(showInsert());
    };
    handleShowRPAInsert = () => {
        const {dispatch, selectedRowKeys} = this.props;
        dispatch(showRPAInsert());
        dispatch(getById(selectedRowKeys[0]));
    };

    handleExportReceivable = () => {
        document.getElementById("exportReceivable").submit();
    };
    handleExportPayable = () => {
        document.getElementById("exportPayable").submit();
    };
    handleExportExcel = () => {
        const {dispatch, deliveryDateStart, deliveryDateEnd} = this.props;
        const principal = getPrincipal();
        dispatch(exportExcel({
            deliveryDateStart,
            deliveryDateEnd,
            userAccount: principal.account
        })).then(action => {
            if (action.error !== true) {
                notification.success({
                    message: '提交成功,请几分钟后查看您的邮箱'
                });
            } else {
                notification.error({
                    message: '提交失败:' + action.message
                });
            }
        });
    };

    render() {
        const {deliveryDateStart, deliveryDateEnd, clientName = '', carrierName = ''} = this.props;
        return (
            <div className="actions">
                <Button
                    disabled={this.props.selectedRowKeys.length !== 1}
                    onClick={this.handleShowRPAInsert}
                >
                    <Icon type="edit"/>费用更新
                </Button>
                {/*<Button onClick={this.handleExportReceivable} disabled={this.props.createTimeStart.length === 0 ||
                this.props.createTimeEnd.length === 0 || clientName.length === 0}>
                    <Icon type="download"/>导出应收账单
                </Button>*/}
                {/*<Button*/}
                {/*    disabled={this.props.selectedRowKeys.length !== 1}*/}
                {/*    onClick={this.handleShowInsert}*/}
                {/*>*/}
                {/*    <Icon type="edit"/>录入审批费用*/}
                {/*</Button>*/}
                {/*<Button onClick={this.handleExportPayable} disabled={this.props.createTimeStart.length === 0 ||
                this.props.createTimeEnd.length === 0 || carrierName.length === 0}>
                    <Icon type="download"/>导出应付账单
                </Button>*/}
                <Button onClick={this.handleExportExcel} disabled={this.props.deliveryDateStart.length === 0 ||
                this.props.deliveryDateEnd.length === 0}>
                    <Icon type="download"/>导出账单
                </Button>
                <form
                    id="exportReceivable"
                    method="post"
                    target="_blank"
                    action="/api/order/exportReceivable"
                >
                    <input
                        name="deliveryDateStartString"
                        type="hidden"
                        value={deliveryDateStart}
                    />
                    <input
                        name="deliveryDateEndString"
                        type="hidden"
                        value={deliveryDateEnd}
                    />
                    <input
                        name="clientName"
                        type="hidden"
                        value={clientName}
                    />
                </form>
                <form
                    id="exportPayable"
                    method="post"
                    target="_blank"
                    action="/api/order/exportPayable"
                >
                    <input
                        name="deliveryDateStartString"
                        type="hidden"
                        value={deliveryDateStart}
                    />
                    <input
                        name="deliveryDateEndString"
                        type="hidden"
                        value={deliveryDateEnd}
                    />
                    <input
                        name="transportChannel"
                        type="hidden"
                        value={carrierName}
                    />
                </form>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.financialReport.list
    };
};

export default connect(mapStateToProps)(Toolbar);
