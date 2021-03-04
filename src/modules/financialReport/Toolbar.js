import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon} from "antd";
import {getById, showInsert, showRPAInsert} from "./actions";


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

    render() {
        const {createTimeStart, createTimeEnd, clientName = '', carrierName = ''} = this.props;
        return (
            <div className="actions">
                <Button
                    disabled={this.props.selectedRowKeys.length !== 1}
                    onClick={this.handleShowRPAInsert}
                >
                    <Icon type="edit"/>费用更新
                </Button>
                <Button onClick={this.handleExportReceivable} disabled={this.props.createTimeStart.length === 0 ||
                this.props.createTimeEnd.length === 0 || clientName.length === 0}>
                    <Icon type="download"/>导出应收账单
                </Button>
                {/*<Button*/}
                {/*    disabled={this.props.selectedRowKeys.length !== 1}*/}
                {/*    onClick={this.handleShowInsert}*/}
                {/*>*/}
                {/*    <Icon type="edit"/>录入审批费用*/}
                {/*</Button>*/}
                <Button onClick={this.handleExportPayable} disabled={this.props.createTimeStart.length === 0 ||
                this.props.createTimeEnd.length === 0 || carrierName.length === 0}>
                    <Icon type="download"/>导出应付账单
                </Button>
                <form
                    id="exportReceivable"
                    method="post"
                    target="_blank"
                    action="/api/order/exportReceivable"
                >
                    <input
                        name="createTimeStartString"
                        type="hidden"
                        value={createTimeStart}
                    />
                    <input
                        name="createTimeEndString"
                        type="hidden"
                        value={createTimeEnd}
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
                        name="createTimeStartString"
                        type="hidden"
                        value={createTimeStart}
                    />
                    <input
                        name="createTimeEndString"
                        type="hidden"
                        value={createTimeEnd}
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
