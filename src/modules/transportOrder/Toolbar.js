import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, Upload} from "antd";
import {
    getTrackingListById,
    orderImport,
    query,
    showCreate,
    showCreateTrack,
    showInsertFee,
    showTracking
} from "./actions";
import {showCreate as showCreateFee} from "../feeDeclare/actions";

class Toolbar extends PureComponent {
    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };
    handleShowCreateFee = () => {
        const {dispatch, dataSource, selectedRowKeys} = this.props;
        const foundOrder = dataSource.find(order => order.id === selectedRowKeys[0]);
        dispatch(showCreateFee({
            ...foundOrder,
            inCome: foundOrder.inShippingFee | 0
        }));
    };
    handleShowInsertFee = () => {
        const {dispatch, dataSource, selectedRowKeys} = this.props;
        const foundOrder = dataSource.find(order => order.id === selectedRowKeys[0]);
        dispatch(showInsertFee(foundOrder));
    };
    handleShowCreateTrack = () => {
        const {dispatch} = this.props;
        dispatch(showCreateTrack());
    };
    handleShowTrack = () => {
        const {dispatch, selectedRowKeys} = this.props;
        dispatch(showTracking());
        dispatch(getTrackingListById(selectedRowKeys[0]));
    };
    customRequest = (options) => {
        const {dispatch} = this.props;
        dispatch(orderImport({file: options.file})).then(() => {
            dispatch(query({}));
        });
    };
    uploadProps = {
        showUploadList: false,
        name: 'file',
        accept: '.xls, .xlsx, .csv',
        customRequest: this.customRequest
    };

    render() {
        return (
            <div className="actions">
                <div>
                    <Button onClick={this.handleShowCreate}><Icon type="plus"/>新增</Button>
                    {/*<Button disabled={this.props.selectedRowKeys.length !== 1} onClick={this.handleShowInsertFee}><Icon*/}
                    {/*    type="plus"/>应付录入</Button>*/}
                    <Button href="/static/订单导入模板.xlsx" target="_blank">下载导入模板</Button>
                    <Upload {...this.uploadProps}>
                        <Button disabled={this.props.importLoading}>
                            <Icon type="upload"/> 导入
                        </Button>
                    </Upload>
                    {/*<Button onClick={this.handleShowCreateTrack}*/}
                    {/*        disabled={this.props.selectedRowKeys.length !== 1}>添加物流信息</Button>*/}
                    {/*<Button onClick={this.handleShowTrack}*/}
                    {/*        disabled={this.props.selectedRowKeys.length !== 1}>查看物流信息</Button>*/}
                    <Button onClick={this.handleShowCreateFee} disabled={this.props.selectedRowKeys.length !== 1}><Icon
                        type="money-collect"/>申报费用</Button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.transportOrder.list
    };
};

export default connect(mapStateToProps)(Toolbar);
