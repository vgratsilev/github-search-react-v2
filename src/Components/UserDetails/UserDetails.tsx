import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from 'src/Components/Timer/Timer';


type SearchUserType = {
    id: number,
    login: string
}

type UserType = {
    id: number,
    login: string,
    avatar_url: string,
    followers: number
}

type UserDetailsPropType = {
    selectedUser: SearchUserType | null
}

const INITIAL_TIMER_SECONDS = 10;

const UserDetails = ({ selectedUser }: UserDetailsPropType) => {
    const [ userDetails, setUserDetails ] = useState<UserType | null>(null);
    const [ timerSeconds, setTimerSeconds ] = useState<number>(INITIAL_TIMER_SECONDS);

    useEffect(() => {
            if(!!selectedUser) {
                axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                    .then((response) => {
                        setTimerSeconds(INITIAL_TIMER_SECONDS);
                        setUserDetails(response.data);

                    });
            }

        }, [ selectedUser ]
    );

    useEffect(() => {
        if(timerSeconds < 1) {
            setUserDetails(null);
        }
    }, [ timerSeconds ]);

    return (
        <>
            {userDetails && (<div>
                <Timer timerSeconds={timerSeconds} onTimerTick={setTimerSeconds} timerKey={selectedUser?.id}/>
                <h2>Details: {userDetails.login}</h2>
                <img src={userDetails.avatar_url} height={'200px'} width={'200px'} alt={'avatar'}/>
                <br/>
                <span>Followers: {userDetails.followers}</span>

            </div>)}
        </>
    );
};

export default UserDetails;
