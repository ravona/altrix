import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { StoryFormSchema } from './StoryFormSchema';
import { Story } from '@altrix/reed-core';
import { Box, Button, Stack, TextField } from '@mui/material';
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
            <Stack direction="column" gap={2}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            variant="standard"
                            fullWidth
                            {...field}
                            label="Name"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    name="source"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            variant="standard"
                            fullWidth
                            {...field}
                            label="Source"
                            error={!!errors.source}
                            helperText={errors.source?.message}
                        />
                    )}
                />
                <Controller
                    name="content"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            variant="standard"
                            {...field}
                            label="Content"
                            multiline
                            rows={4}
                            error={!!errors.content}
                            helperText={errors.content?.message}
                        />
                    )}
                />
                <Box>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

export default StoryForm;
