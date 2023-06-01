import { User, useGetUsers } from '@/api';
import { Button, Input, Link, ListItem } from '@/components/UI/atoms';
import { FormItem, List } from '@/components/UI/molecules';
import { webRoutes } from '@/settings';
import { Form } from '@/components/UI/organisms';
import { useForm, useUser } from '@/hooks';
import { useCallback } from 'react';
import { UserFilterForm, UsersFC } from './types';
import { Wrapper, FiltersWrapper } from './styles';

// TODO: debounce filter

const Users: UsersFC = () => {
  const [form] = useForm<UserFilterForm>();
  const { id } = useUser() as User;
  const { data, loading, refetch } = useGetUsers({ id });

  const onChange = useCallback(() => {
    if (loading) {
      return;
    }

    const { firstName, lastName } = form.getFieldsValue();

    refetch({ params: { firstName, lastName, id } }).catch(console.error);
  }, [form, id, loading, refetch]);

  return (
    <Wrapper>
      <FiltersWrapper>
        <h3>Filters</h3>
        <Form form={form} layout="vertical" className="form" onChange={onChange}>
          <FormItem name="firstName" label="First name">
            <Input />
          </FormItem>
          <FormItem name="lastName" label="Last name">
            <Input />
          </FormItem>
        </Form>
      </FiltersWrapper>
      <h3>Users list</h3>
      <List
        itemLayout="vertical"
        loading={loading}
        dataSource={data || []}
        renderItem={({ firstName, lastName, id: userId }) => (
          <ListItem
            actions={[
              <Button key={1}>
                <Link href={`${webRoutes.private.USERS}/${userId}`}>Send a message</Link>
              </Button>,
            ]}
          >
            {firstName} {lastName}
          </ListItem>
        )}
      />
    </Wrapper>
  );
};

export default Users;
