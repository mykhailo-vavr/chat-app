import { useMemo } from 'react';
import { object } from 'yup';

export default (validationSchema: Record<string, any>) =>
  useMemo(() => object().shape(validationSchema), [validationSchema]);
