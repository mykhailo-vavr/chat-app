import { Button } from '@/components/UI/atoms';
import { useFetch } from '@/hooks';
import { FC } from '@/types';

const Landing: FC = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error... </div>;
  }

  return (
    <div>
      <h2>Welcome to NextJS starter</h2>
      <Button>Antd here!!</Button>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Landing;
