import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon} from "antd";
import {passed, query} from "./actions";


class Toolbar extends PureComponent {

    handlePass = () => {
        const {dispatch, selectedRowKeys} = this.props;
        dispatch(passed(selectedRowKeys)).then(() => {
            dispatch(query({}));
        });
    };

    render() {
        return (
            <div className="actions">
                <Button
                    disabled={this.props.selectedRowKeys.length === 0}
                    onClick={this.handlePass}
                >
                    <Icon type="check"/>通过
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.feeApproval.list
    };
};

export default connect(mapStateToProps)(Toolbar);
