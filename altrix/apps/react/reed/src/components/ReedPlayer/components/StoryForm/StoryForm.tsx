import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';
import { StoryFormSchema } from './StoryFormSchema';

type FormData = yup.InferType<typeof StoryFormSchema>;

const StoryForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(StoryFormSchema),
    });

    const onSubmit = (data: FormData) => console.log(data);

    return (
        <form
            className={styles['ReedPlayer__StoryForm']}
            onSubmit={handleSubmit(onSubmit)}
        >
            <input {...register('name')} />
            <p>{errors.name?.message}</p>

            <input {...register('source')} />
            <p>{errors.source?.message}</p>

            <textarea {...register('content')} />
            <p>{errors.content?.message}</p>

            <input type="submit" />
        </form>
    );
};

export default StoryForm;
