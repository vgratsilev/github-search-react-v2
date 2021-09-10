import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from 'src/Components/Timer/Timer';
import { SearchUserType } from 'src/Components/Github/Github';
import Loader from 'src/Components/UI/Loader/Loader';

type UserType = {
    id: number,
    login: string,
    name?: string,
    avatar_url: string,
    followers: number,
    following: number,
    public_repos: number,
    public_gists: number,
    html_url: string,
    blog?: string
}

type UserDetailsPropType = {
    selectedUser: SearchUserType | null,
    onErrorHandler: () => void
}

const INITIAL_TIMER_SECONDS = 60;

const UserDetails = ({ selectedUser, onErrorHandler }: UserDetailsPropType) => {
    const [ userDetails, setUserDetails ] = useState<UserType | null>(null);
    const [ timerSeconds, setTimerSeconds ] = useState<number>(INITIAL_TIMER_SECONDS);
    const [ showLoader, setShowLoader ] = useState<boolean>(false);

    useEffect(() => {
            async function toggleLoader(value: boolean) {
                setShowLoader(value);
            }

            if(!!selectedUser) {
                toggleLoader(true)
                    .then(() => axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`))
                    .then((response) => {
                        setTimerSeconds(INITIAL_TIMER_SECONDS);
                        setUserDetails(response.data);

                    })
                    .catch(() => onErrorHandler())
                    .finally(() => toggleLoader(false));
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ selectedUser ]
    );

    useEffect(() => {
        if(timerSeconds < 1) {
            setUserDetails(null);
        }
    }, [ timerSeconds ]);

    return (
        <>
            {showLoader && (
                <div className={'loaderContainer'}>
                    <Loader/>
                </div>
            )}
            {!showLoader && userDetails && (
                <div className={'card userDetailsContainer'}>
                    <Timer timerSeconds={timerSeconds} onTimerTick={setTimerSeconds} timerKey={selectedUser?.id}/>
                    <h2>{userDetails.login}</h2>
                    <h3>{userDetails.name}</h3>
                    <hr/>
                    <img src={userDetails.avatar_url} height={'250px'} width={'250px'} alt={'avatar'}/>
                    {userDetails.html_url && (
                        <>
                            <hr/>
                            <a
                                href={userDetails.html_url}
                                target={'_blank'}
                                rel={'noreferrer'}
                                className={'btn btn-dark'}
                            >
                                Open Profile
                            </a>
                        </>
                    )}
                    <hr/>
                    <div className={'infoContainer'}>
                        {userDetails.blog && (
                            <span>
                                    <strong>Website: </strong>
                                    <a
                                        href={userDetails.blog}
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                        className={'card-link'}
                                    >
                                        {userDetails.blog}
                                    </a>
                                </span>
                        )}
                        <div className={'badge bg-success mt-1'}>Followers: {userDetails.followers}</div>
                        <div className={'badge bg-success mt-1'}>Following: {userDetails.following}</div>
                        <div className={'badge bg-success mt-1'}>Public repos: {userDetails.public_repos}</div>
                        <div className={'badge bg-success mt-1'}>Public gists: {userDetails.public_gists}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDetails;
