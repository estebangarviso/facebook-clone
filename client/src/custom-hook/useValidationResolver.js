// ref: https://react-hook-form.com/advanced-usage#CustomHookwithResolver
// You can build a custom hook as a resolver. A custom hook can easily integrate with yup/Joi/Superstruct as a validation method,
// and to be used inside validation resolver.
//     * Define a memoized validation schema (or define it outside your component if you don't have any dependencies)
//     * Use the custom hook, by passing the validation schema
//     * Pass the validation resolver to the useForm hook
import { useCallback } from 'react';
export const useValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );
