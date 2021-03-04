import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon} from "antd";
import {query, reApproval, showCreate} from "./actions";


class Toolbar extends PureComponent {
    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };

    handleReApproval = () => {
        const {dispatch, selectedRowKeys} = this.props;
        dispatch(reApproval(selectedRowKeys)).then(() => {
            dispatch(query({}));
        });
    };

    render() {
        return (
            <div className="actions">
                <div>
                    {/*<Button onClick={this.handleShowCreate}><Icon type="plus"/>新增</Button>*/}
                    <Button
                        disabled={this.props.selectedRowKeys.length === 0}
                        onClick={this.handleReApproval}
                    >
                        <Icon type="check"/>重新提交审批
                    </Button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.feeDeclare.list
    };
};

export default connect(mapStateToProps)(Toolbar);
