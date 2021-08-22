import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type SearchPropsType = {
    initialValue: string,
    onSubmitHandler: (fixedValue: string) => void
}

type Inputs = {
    userName: string;
};

const Search = ({ initialValue, onSubmitHandler }: SearchPropsType) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onSubmitHandler(data.userName.trim());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'searchContainer'}>
            <div className={'form-group row searchRow'}>
                <label className={'form-label fs-5'}>Search user by username</label>
                <input
                    {
                        ...register(
                            'userName',
                            {
                                required: true,
                                minLength: 1
                            })
                    }
                    defaultValue={initialValue}
                    className={'form-control me-3 searchBox'}
                />
                <button type={'submit'} className={'btn btn-primary searchButton'}>Find</button>
            </div>
            {errors.userName && <p className={'errorMessage'}>This field is required</p>}
        </form>
    );
};

export default Search;
