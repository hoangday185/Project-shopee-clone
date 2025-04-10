import { yupResolver } from '@hookform/resolvers/yup';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate } from 'react-router-dom';
import path from 'src/constants/path';
import { schema, Schema } from 'src/utils/rules';
import useQueryConfig from './useQueryConfig';

type FormData = Pick<Schema, 'name'>;
const searchSchema = schema.pick(['name']);

const useSearchProducts = () => {
  const queryConfig = useQueryConfig();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  });

  const nav = useNavigate();

  const onSubmitSearch = handleSubmit((data) => {
    const query = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        };

    nav({
      pathname: path.home,
      search: createSearchParams(query).toString()
    });
  });

  return { register, onSubmitSearch };
};

export default useSearchProducts;
