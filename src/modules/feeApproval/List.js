import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {getById, query, showEdit} from "./actions";
import {getStatusText} from "../../lib/func";
import {select} from "./actions";
import AddressInfo from "../../components/AddressInfo";

class List extends PureComponent {

    onPageChange = (page, pageSize) => {
        const {dispatch} = this.props;
        dispatch(query({page, pageSize}));
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
                    width: 80,
                    render: text => getStatusText(text, feeDeclareStatus)
                };
            }else if ("address" === column.type) {
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
            pageSize: pageSize + 1,
            onShowSizeChange: (current, newSize) =>
                this.onPageChange && this.onPageChange(1, newSize),
            onChange: this.onPageChange
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelectChange
        };
        //定义合计行数据
        let inCome = 0.00;
        let money = 0.00;
        if (dataSource.length > 0) {
            dataSource.forEach(item => {
                inCome += item.inCome;
                money += item.money;
            });
        }
        const totalRow = {
            id: String(Math.random()),
            clientName: '合计',
            inCome: inCome,
            money: money
        };
        const dataSourceNew = dataSource && dataSource.length > 0 ? [...dataSource, totalRow] : [];
        return (
            <Table
                {...tableProps}
                columns={newColumns}
                scroll={{x: 1300, y: 500}}
                rowSelection={rowSelection}
                pagination={tablePagination}
                dataSource={dataSourceNew}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.feeApproval.list,
        feeDeclareColumns: state.common.feeDeclareColumns,
        feeDeclareStatus: state.common.feeDeclareStatus
    };
};

export default connect(mapStateToProps)(List);
