import * as yup from 'yup';

export const StoryFormSchema = yup
    .object({
        name: yup.string().required(),
        source: yup.string(),
        content: yup.string().required(),
    })
    .required();
