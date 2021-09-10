import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Loader from 'src/Components/UI/Loader/Loader';

type UsersListPropsType = {
    searchName: string,
    selectedUser: SearchUserType | null,
    onUserSelectHandler: (user: SearchUserType) => void,
    onErrorHandler: () => void
}

type SearchUserType = {
    id: number,
    login: string
}

type SearchResult = {
    items: SearchUserType[]
}

const UsersList = ({ searchName, selectedUser, onUserSelectHandler, onErrorHandler }: UsersListPropsType) => {
    const [ users, setUsers ] = useState<SearchUserType[]>([]);
    const [ showLoader, setShowLoader ] = useState<boolean>(false);

    useEffect(() => {
            async function toggleLoader(value: boolean) {
                setShowLoader(value);
            }

            if(searchName) {
                toggleLoader(true)
                    .then(() => axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchName}`))
                    .then((response) => {
                        setUsers(response.data.items);
                    })
                    .catch(() => onErrorHandler())
                    .finally(() => toggleLoader(false));
            }

        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ searchName ]
    );

    if(users.length === 0) {
        return null;
    }

    return (
        <div className={'card my-3 usersListContainer'}>
            <label className={'form-label fs-5'}>Find users:</label>
            <ul className={'list-group'}>
                {showLoader && (<Loader/>)}
                {!showLoader && users.map((user) =>
                    <li key={user.id}
                        className={classNames('list-group-item', 'list-group-item-action', 'userItem', { 'selected': selectedUser === user })}
                        onClick={() => {
                            onUserSelectHandler(user);
                        }}>
                        {user.login}
                    </li>)}
            </ul>
        </div>
    );
};

export default UsersList;
