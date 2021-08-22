import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

type UsersListPropsType = {
    searchName: string,
    selectedUser: SearchUserType | null,
    onUserSelectHandler: (user: SearchUserType) => void
}

type SearchUserType = {
    id: number,
    login: string
}

type SearchResult = {
    items: SearchUserType[]
}

const UsersList = ({ searchName, selectedUser, onUserSelectHandler }: UsersListPropsType) => {
    const [ users, setUsers ] = useState<SearchUserType[]>([]);

    useEffect(() => {
            if(searchName) {
                axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchName}`)
                    .then((response) => {
                        setUsers(response.data.items);
                    });
            }

        }, [ searchName ]
    );

    if(users.length === 0) {
        return null;
    }

    return (
        <div className={'card my-3 usersListContainer'}>
            <label className={'form-label fs-5'}>Find users:</label>
            <ul className={'list-group'}>
                {users.map((user) =>
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
