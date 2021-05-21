import React, {useState} from 'react';
import AddUser from './add';
import EditUser from './edit';
import UserList from './list';

export default function User() {
    const [addUserModal, setAddUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [reload, setReload] = useState(true);
    const [details, setDetails] = useState({});

    const onSuccess =   (data)  =>  {
        setReload(data);
    }

    const editUser  =   (show, data)  =>  {
        setEditUserModal(show)
        setDetails(data);
    }
    
    return (
        <main className="main-container">
            {
                (!!addUserModal)?
                <AddUser onSuccess={onSuccess} addUserModal={addUserModal} setAddUserModal={setAddUserModal}/>
                : null
            }

            {
                (!!editUserModal)?
                <EditUser details={details} onSuccess={onSuccess} editUserModal={editUserModal} setEditUserModal={setEditUserModal}/>
                : null
            }
            

            <div className="heading-bar">
                <div className="row">
                    <div className="col-12">
                        <h2>User</h2>
                    </div>
                </div>
            </div>

            <div className="main-body">
                <div className="box p-0">
                    {/* <div className="tab-wrap">
                        <div className="tab-bar-row">
                            <ul className="d-block">
                                <li className="active">
                                    <div className="tab-name">
                                        Manage User
                                    </div>
                                </li>
                                <span onClick={() => setAddUserModal(!addUserModal)} className="default-btn slow">
                                    Add User
                                </span>
                            </ul>
                        </div>
                    </div> */}
                    <UserList
                        reload={reload}
                        onSuccess={onSuccess}
                        editUserModal={editUserModal}
                        editUser={editUser}
                    />
                </div>
            </div>
        </main>
    );
}
