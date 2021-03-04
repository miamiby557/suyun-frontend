import React from 'react';
import {Card} from "antd";
import Toolbar from "./Toolbar";
import CreateModal from "./CreateModal";
import ModifyModal from "./ModifyModal";
import List from "./List";

const User = () => {
    return (
        <Card>
            <Toolbar/>
            <List/>
            <CreateModal/>
            <ModifyModal/>
        </Card>
    );
};

export default User;