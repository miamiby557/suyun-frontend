import React, {PureComponent} from "react";
import {connect} from "react-redux";
import LogTimeline from "../../components/LogTimeline";
import {Modal} from "antd";
import {hideTracking} from "./actions";

class TrackingModal extends PureComponent {

    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideTracking());
    };
    render() {
        const {
            trackingList,
            trackingVisible
        } = this.props;
        return (
            <Modal
                title="物流信息"
                onCancel={this.handleCancel}
                visible={trackingVisible}
                footer={""}
                width="80%"
            >
                <LogTimeline dataSource={trackingList}/>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        trackingList: state.transportOrder.modify.trackingList,
        trackingVisible:state.transportOrder.modify.trackingVisible

    };
};

export default connect(mapStateToProps)(TrackingModal);
