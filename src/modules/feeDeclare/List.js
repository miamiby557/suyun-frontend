import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {getById, query, select, showEdit} from "./actions";
import {getStatusText} from "../../lib/func";
import {query as carrierQuery} from "../carrier/actions";
import AddressInfo from "../../components/AddressInfo";

class List extends PureComponent {

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({...filter, page, pageSize}));
    };

    handleShowEdit = row => {
        const {dispatch} = this.props;
        dispatch(getById(row.id)).then(() => {
                dispatch(showEdit());
            }
        );
    };

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(query({filter: {}}));
        dispatch(carrierQuery());
    }

    handleSelectChange = (selectedRowKeys) => {
        const {dispatch} = this.props;
        dispatch(select(selectedRowKeys));
    };

    render() {
        const {feeDeclareColumns, feeDeclareStatus} = this.props;
        const newColumns = feeDeclareColumns.map(column => {
            if ("dateTime" === column.type) {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: text => <span>{text && text.substr(0, 10)}</span>,
                    width: 150
                };
            } else if ("number" === column.type) {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: text => <span>{text && Number(text).toFixed(3)}</span>,
                    width: 100
                };
            } else if ("money" === column.type) {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: text => <span>{text && Number(text).toFixed(2)}</span>,
                    width: 100
                };
            } else if ("feeDeclareEnum" === column.type) {
                return {
                    title: '状态',
                    dataIndex: 'status',
                    render: text => getStatusText(text, feeDeclareStatus),
                    width: 180
                };
            } else if ("address" === column.type) {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: (text) => <AddressInfo {...text}/>,
                    width: 180
                };
            } else {
                if (column.clickable === true) {
                    return {
                        title: column.label,
                        dataIndex: column.value,
                        render: (text, record) => (
                            <a
                                onClick={() => {
                                    this.handleShowEdit(record);
                                }}
                            >
                                {text}
                            </a>
                        ),
                        width: 200
                    };
                } else {
                    return {
                        title: column.label,
                        dataIndex: column.value,
                        render: text => <span>{text}</span>,
                        width: 100
                    };
                }
            }
        });
        const {
            page,
            pageSize,
            totalElements,
            selectedRowKeys,
            dataSource,
            loading
        } = this.props;
        const tablePagination = {
            ...paginationProps,
            total: totalElements,
            current: page,
            pageSize: pageSize,
            onShowSizeChange: (current, newSize) =>
                this.onPageChange && this.onPageChange(1, newSize),
            onChange: this.onPageChange
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelectChange
        };
        return (
            <Table
                {...tableProps}
                scroll={{x: 1300, y: 500}}
                columns={newColumns}
                rowSelection={rowSelection}
                pagination={tablePagination}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.feeDeclare.list,
        feeDeclareColumns: state.common.feeDeclareColumns,
        feeDeclareStatus: state.common.feeDeclareStatus
    };
};

export default connect(mapStateToProps)(List);
