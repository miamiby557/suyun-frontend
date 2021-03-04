import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {deleteFile, deletePath, fileList, pathShow, setPath, uploadFile} from "./actions";
import {Breadcrumb, Button, Icon, notification, Popconfirm, Table, Upload} from 'antd';
import CreatePathModal from "./CreatePathModal";

class File extends PureComponent {
    componentDidMount() {
        const {dispatch, path} = this.props;
        dispatch(fileList({path}));
    }

    state = {
        path: "", name: ""
    };

    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(pathShow());
    };

    handleDelete = record => {
        const {dispatch, path} = this.props;
        const type = record.type;
        if ("DIRECTORY" === type) {
            dispatch(deletePath(record)).then(action => {
                if (action.error !== true) {
                    dispatch(fileList({path}));
                    notification.success({
                        message: '删除目录成功'
                    });
                }
            });
        } else {
            dispatch(deleteFile(record)).then(action => {
                if (action.error !== true) {
                    dispatch(fileList({path}));
                    notification.success({
                        message: '删除文件成功'
                    });
                }
            });
        }

    };

    onHomeClick = text => {
        const {dispatch} = this.props;
        dispatch(setPath(text));
        dispatch(fileList({path: text}));
    };

    onDirectoryClick = record => {
        const {dispatch} = this.props;
        dispatch(setPath('根目录\\' + record.path));
        dispatch(fileList({path: '根目录\\' + record.path}));
    };

    handleEnter = record => {
        const p = record.path;
        const type = record.type;
        if (type === "DIRECTORY") {
            const {dispatch} = this.props;
            let newPath = "根目录\\" + p;
            dispatch(setPath(newPath));
            dispatch(fileList({path: newPath}));
        } else {
            this.setState({path:record.path,name:record.name});
            document.getElementById("downloadFile").submit();
        }
    };

    customRequest = (options) => {
        const {dispatch, path} = this.props;
        dispatch(uploadFile({file: options.file, path})).then(() => {
            dispatch(fileList({path}));
            notification.success({
                message: '上传成功'
            });
        });
    };
    uploadProps = {
        showUploadList: false,
        name: 'file',
        accept: '.xls, .xlsx, .csv, .doc, .zip, .rar, .docx, .pdf',
        customRequest: this.customRequest
    };

    render() {
        const {path, fileList} = this.props;
        const newPath = path.replace("根目录", "");
        const array = newPath.split("\\");
        const len = array.length;
        const directoryList = [];
        for (let i = 1; i <= len; i++) {
            const list = array.slice(0, i);
            const name = list.pop();
            if (name.toString().length > 0) {
                const directory = {name: name.toString(), path: list.join("\\").toString() + "\\" + name.toString()};
                directoryList.push(directory);
            }
        }
        const columns = [
            {
                title: '文件名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a onClick={() => this.handleEnter(record)}>{text}</a>,
            },{
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                render: (text) => (
                    <span>
                        {text === "DIRECTORY" ? "文件夹" : "文件"}
                    </span>
                )

            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    const message = record.type === "DIRECTORY" ? "确定删除文件夹?" : "确定删除文件?";
                    return <Popconfirm title={message} onConfirm={() => this.handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                },
            }
        ];

        return (
            <div>
                <div className="fileList">
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="#" onClick={() => this.onHomeClick("根目录")}>根目录</a></Breadcrumb.Item>
                        {directoryList && directoryList.map(item => {
                            return <Breadcrumb.Item>
                                <a href="#" onClick={() => this.onDirectoryClick(item)}>{item.name.toString()}</a>
                            </Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                </div>
                <div className="actions">
                    <Button onClick={this.handleShowCreate}><Icon type="folder-add"/>创建目录</Button>
                    <Upload {...this.uploadProps}>
                        <Button>
                            <Icon type="file"/> 上传文件
                        </Button>
                    </Upload>

                </div>
                <div>
                    <Table columns={columns} dataSource={fileList} pagination={false}/>
                </div>
                <CreatePathModal/>
                <form
                    id="downloadFile"
                    method="post"
                    target="_blank"
                    action="/api/file/download"
                >
                    <input
                        name="path"
                        type="hidden"
                        value={this.state.path}
                    />
                    <input
                        name="name"
                        type="hidden"
                        value={this.state.name}
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.file
    };
};

export default connect(mapStateToProps)(File);
