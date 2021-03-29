import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {getById, query, select, showRPAInsert} from "./actions";
import {query as clientQuery} from "../client/actions";
import {query as carrierQuery} from "../carrier/actions";
import AddressInfo from "../../components/AddressInfo";

class List extends PureComponent {
    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({...filter, page, pageSize}));
    };

    componentWillMount() {
        const {dispatch, page, pageSize} = this.props;
        dispatch(carrierQuery());
        dispatch(clientQuery());
        dispatch(query({page, pageSize}));
    }

    handleShowRPAInsert = (id) => {
        const {dispatch} = this.props;
        dispatch(showRPAInsert());
        dispatch(getById(id));
    };

    handleSelectChange = (selectedRowKeys) => {
        const {dispatch} = this.props;
        dispatch(select(selectedRowKeys));
    };

    render() {
        const {
            page,
            pageSize,
            totalElements,
            selectedRowKeys,
            dataSource,
            loading, financialReportColumns
        } = this.props;
        const newColumns = financialReportColumns.map(column => {
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
                    render: text => {
                        const color = parseFloat(text) >= 0 ? "" : "red";
                        return <span
                            style={{color: color}}>￥{text && Number(text).toFixed(2)}</span>
                    },
                    width: 100
                };
            } else if ("percent" === column.type) {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: text => {
                        const color = parseFloat(text) >= 0 ? "" : "red";
                        return <span
                            style={{color: color}}>{text && Number(text).toFixed(2)}%</span>
                    },
                    width: 200
                };
            } else if ("address" === column.type) {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: (text) => <AddressInfo {...text}/>,
                    width: 200
                };
            } else {
                if (column.clickable === true) {
                    return {
                        title: column.label,
                        dataIndex: column.value,
                        render: (text, record) => (
                            <a
                                onClick={() => {
                                    this.handleShowRPAInsert(record.id);
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
                scroll={{x: 1500, y: 500}}
                columns={newColumns}
                rowSelection={rowSelection}
                pagination={tablePagination}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const
    mapStateToProps = state => {
        return {
            ...state.financialReport.list,
            financialReportColumns: state.common.financialReportColumns
        };
    };

export default connect(mapStateToProps)(List);
