import React, { useEffect, useState } from 'react';

type TimerPropType = {
    timerSeconds: number
    onTimerTick: (actualSeconds: number) => void,
    timerKey: number | undefined
}

const Timer = ({ timerSeconds, onTimerTick, timerKey }: TimerPropType) => {

    const [ localSeconds, setLocalSeconds ] = useState(timerSeconds);

    useEffect(() => {
        setLocalSeconds(timerSeconds);
    }, [ timerSeconds ]);

    useEffect(() => {
        onTimerTick(localSeconds);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ localSeconds ]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setLocalSeconds((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(intervalID);
        };
    }, [ timerKey ]);

    return (
        <div>
            Time to close details: {localSeconds}
        </div>
    );
};

export default Timer;
