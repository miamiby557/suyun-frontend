import React, {PureComponent} from "react";
import {Modal} from "antd";
import {hideInsert} from "./actions";
import FormEditor from '../../components/FormEditor';
import {connect} from "react-redux";
import {formatMoney, parserMoney} from "../../lib/func";

class ExportReceivableModal extends PureComponent {

    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideInsert());
    };

    render() {
        const {loading, visible, model} = this.props;
        const schema = [
            {
                field: 'upstairsFee',
                title: '上楼费',
                type: 'formatNumber',
                controlProps: {
                    formatter: formatMoney,
                    parser: parserMoney,
                    min: 0
                }
            }, {
                field: 'daofuProcedureFee',
                title: '倒付手续费',
                type: 'formatNumber',
                controlProps: {
                    formatter: formatMoney,
                    parser: parserMoney,
                    min: 0
                }
            }
        ];
        return (
            <Modal
                title="新增"
                visible={visible}
                onOk={this.handleCreate}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                okText="保存"
                cancelText="取消"
                width="80%"
            >
                <FormEditor
                    schema={schema}
                    column={3}
                    defaultReadonly={false}
                    showActionBar={false}
                    defaultValues={model}
                    wrappedComponentRef={inst => (this.formEditor = inst)}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.financialReport.exportReceivable
    };
};

export default connect(mapStateToProps)(ExportReceivableModal);
