import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { StoryFormSchema } from './StoryFormSchema';
import { Story } from '@altrix/reed-core';

import React from 'react';

type Props = {
    onAddStory: (story: Story) => void;
};

type FormData = yup.InferType<typeof StoryFormSchema>;

const StoryForm: React.FC<Props> = ({ onAddStory }: Props) => {
    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(StoryFormSchema),
    });

    const onSubmit = (data: FormData) => {
        const newStory: Story = {
            id: Date.now().toString(),
            name: data.name,
            source: data.source,
            content: data.content,
        };
        onAddStory(newStory);
    };

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    {...register('name')}
                    id="name"
                    name="name"
                    type="text"
                />
                <input
                    {...register('source')}
                    id="source"
                    name="source"
                    type="text"
                />
                <textarea
                    {...register('content')}
                    id="content"
                    name="content"
                />

                <div>
                    <button type="button">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default StoryForm;
