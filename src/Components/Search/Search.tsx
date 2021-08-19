import React, { useEffect, useState } from 'react';

type SearchPropsType = {
    value: string,
    onSubmitHandler: (fixedValue: string) => void
}

const Search = ({ value, onSubmitHandler }: SearchPropsType) => {
    const [ tempSearch, setTempSearch ] = useState<string>('');

    useEffect(() => {
        setTempSearch(value);
    }, [ value ]);

    // TODO change to using react-hook-form
    return (
        <div>
            <input
                value={tempSearch}
                placeholder={'search'}
                onChange={(e) => setTempSearch(e.currentTarget.value)}/>
            <button
                type={'button'}
                onClick={() => {
                    onSubmitHandler(tempSearch);
                }}>
                Find
            </button>
        </div>
    );
};

export default Search;
