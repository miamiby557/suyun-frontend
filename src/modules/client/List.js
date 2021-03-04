import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {getById, query, select, showModify} from "./actions";

class List extends PureComponent {

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({filter, page, pageSize}));
    };

    handleSelectChange = (selectedRowKeys) => {
        const {dispatch} = this.props;
        dispatch(select(selectedRowKeys));
    };
    handleModify = id => {
        const {dispatch} = this.props;
        dispatch(getById(id));
        dispatch(showModify());
    };

    componentWillMount() {
        const {dispatch, page, pageSize} = this.props;
        dispatch(query({page, pageSize}));
    };

    render() {
        const columns = [
            {
                title: "客户名称",
                dataIndex: "name",
                width: "90px",
                render: (text, record) => (
                    <a
                        onClick={() => {
                            this.handleModify(record.id);
                        }}
                    >
                        {text}
                    </a>
                )
            },{
                title: "客户简称",
                dataIndex: "nickName",
                width: "90px",
            }, {
                title: "邮箱",
                dataIndex: "email",
                width: "180px"
            }
        ];
        const {
            selectedRowKeys,
            page,
            pageSize,
            totalElements,
            dataSource,
            loading
        } = this.props;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelectChange
        };

        const tablePagination = {
            ...paginationProps,
            total: totalElements,
            current: page,
            pageSize: pageSize,
            onShowSizeChange: (current, newSize) =>
                this.onPageChange && this.onPageChange(1, newSize),
            onChange: this.onPageChange
        };

        return (
            <Table
                {...tableProps}
                columns={columns}
                pagination={tablePagination}
                rowSelection={rowSelection}
                dataSource={dataSource}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.client.list
    };
};

export default connect(mapStateToProps)(List);
