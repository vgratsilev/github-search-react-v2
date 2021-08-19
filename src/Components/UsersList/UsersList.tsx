import { useState, useEffect } from 'react';
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

    return (
        <div>
            <ul>
                {users.map((user) =>
                    <li key={user.id}
                        className={classNames('userItem', { 'selected': selectedUser === user })}
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
