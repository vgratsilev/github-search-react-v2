import React, { useEffect, useState } from 'react';
import './Github.scss';
import Search from 'src/Components/Search/Search';
import UsersList from 'src/Components/UsersList/UsersList';
import UserDetails from 'src/Components/UserDetails/UserDetails';

type SearchUserType = {
    id: number,
    login: string
}

const INITIAL_SEARCH = 'vgratsilev';

const Github = () => {
    const [ selectedUser, setSelectedUser ] = useState<SearchUserType | null>(null);
    const [ searchName, setSearchName ] = useState<string>('vgratsilev');

    useEffect(() => {
        if(selectedUser) {
            document.title = selectedUser.login;
        }
    }, [ selectedUser ]);

    return (
        <div className={'container'}>
            <div>
                <Search value={INITIAL_SEARCH} onSubmitHandler={setSearchName}/>
                <button
                    type={'button'}
                    onClick={() => setSearchName(INITIAL_SEARCH)}
                >
                    Reset
                </button>

                <UsersList
                    searchName={searchName}
                    selectedUser={selectedUser}
                    onUserSelectHandler={setSelectedUser}/>

            </div>
            <div>
                <UserDetails selectedUser={selectedUser}/>
            </div>
        </div>
    );
};

export default Github;
