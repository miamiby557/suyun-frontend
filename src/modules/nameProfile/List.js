import React, {PureComponent} from "react";
import {Table} from "antd";
import {connect} from "react-redux";
import {paginationProps, tableProps} from "../../lib/ui";
import {query, select, showModify,getById} from "./actions";

class List extends PureComponent {

    onPageChange = (page, pageSize) => {
        const {dispatch, filter} = this.props;
        dispatch(query({filter, page, pageSize}));
    };

    handleSelectChange = (selectedRowKeys) => {
        const {dispatch} = this.props;
        dispatch(select(selectedRowKeys));
    };

    handleShowEdit = row => {
        const {dispatch} = this.props;
        dispatch(getById(row.id)).then(() => {
                dispatch(showModify());
            }
        );
    };

    componentWillMount() {
        const {dispatch, page, pageSize} = this.props;
        dispatch(query({page, pageSize}));
    };

    render() {
        const {profileColumns} = this.props;
        const newColumns = profileColumns.map(column => {
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
                    width: 400
                };
            } else {
                return {
                    title: column.label,
                    dataIndex: column.value,
                    render: text => <span>{text}</span>,
                    width: 400
                };
            }
        });
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
                columns={newColumns}
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
        ...state.nameProfile.list,
        profileColumns:state.common.profileColumns
    };
};

export default connect(mapStateToProps)(List);
