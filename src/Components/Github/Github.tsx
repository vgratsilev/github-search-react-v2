import React, { useEffect, useState } from 'react';
import './Github.scss';
import Search from 'src/Components/Search/Search';
import UsersList from 'src/Components/UsersList/UsersList';
import UserDetails from 'src/Components/UserDetails/UserDetails';

export type SearchUserType = {
    id: number,
    login: string
}

const INITIAL_SEARCH = 'vgratsilev';

const Github = () => {
    const [ selectedUser, setSelectedUser ] = useState<SearchUserType | null>(null);
    const [ searchName, setSearchName ] = useState<string>(INITIAL_SEARCH);
    const [ showAlert, setShowAlert ] = useState<boolean>(false);


    useEffect(() => {
        if(selectedUser) {
            document.title = selectedUser.login;
        }
    }, [ selectedUser ]);

    useEffect(() => {
        if(showAlert) {
            setTimeout(() => {
                setSelectedUser(null);
                setShowAlert(false);
            }, 3000);
        }
    }, [ showAlert ]);

    const showErrorAlert = () => setShowAlert(true);

    return (
        <>
            <div className={'container'}>
                <div>
                    <Search initialValue={INITIAL_SEARCH} onSubmitHandler={setSearchName}/>
                    <button
                        type={'button'}
                        className={'btn btn-secondary resetButton'}
                        onClick={() => setSearchName(INITIAL_SEARCH)}
                    >
                        Reset
                    </button>

                    <UsersList
                        searchName={searchName}
                        selectedUser={selectedUser}
                        onUserSelectHandler={setSelectedUser}
                        onErrorHandler={showErrorAlert}
                    />

                </div>
                <div>
                    <UserDetails selectedUser={selectedUser} onErrorHandler={showErrorAlert}/>
                </div>
            </div>
            {showAlert && (
                <div className={'alert alert-danger'} role={'alert'}>
                    Error fetching data
                </div>
            )}
        </>
    );
};

export default Github;
