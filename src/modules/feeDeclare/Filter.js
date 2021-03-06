import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {query, updateFilter} from "./actions";
import {DATE_FORMAT} from "../../lib/func";
import FilterForm from "../../components/FilterForm";

class Filter extends PureComponent {
    state = {};
    handleSearch = (values) => {
        let fields = values;
        this.setState({...fields});
        const {dispatch, pageSize} = this.props;
        if (fields.createTimeRange && fields.createTimeRange.length > 1) {
            fields.createTimeStart = fields.createTimeRange[0].format(DATE_FORMAT);
            fields.createTimeEnd = fields.createTimeRange[1].format(DATE_FORMAT);
        }
        delete fields.createTimeRange;
        dispatch(updateFilter({...fields}));
        dispatch(query({...fields, page: 1, pageSize}));
    };

    render() {
        const {loading, feeDeclareStatus} = this.props;
        const filterSchema = [
            {
                key: '1',
                field: 'createTimeDateRange',
                type: 'dateRangePicker',
                expandable: true,
                title: '创建日期',
                fieldOptions: {
                    initialValue: this.state.createTimeRange
                }
            }, {
                key: '2',
                field: 'cindaNo',
                type: 'text',
                expandable: true,
                title: '先达单号',
                fieldOptions: {
                    initialValue: this.state.cindaNo
                }
            }, {
                key: '3',
                field: 'status',
                type: 'listSelector',
                expandable: true,
                title: '状态',
                fieldOptions: {
                    initialValue: this.state.status
                },
                controlProps: {
                    dataSource: feeDeclareStatus
                }
            }
        ];
        return (
            <FilterForm schema={filterSchema} callback={this.handleSearch} loading={loading}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.feeDeclare.list,
        feeDeclareStatus: state.common.feeDeclareStatus
    };
};

export default connect(mapStateToProps)(Filter);
