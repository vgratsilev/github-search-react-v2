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
        onSubmitHandler(data.userName);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
                />
                <button type={'submit'}>Find</button>
            </div>
            {errors.userName && <p>This field is required</p>}
        </form>
    );
};

export default Search;
