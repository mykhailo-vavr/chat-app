import { Wrapper } from './styles';
import { ListProps } from './types';

const List = <T,>(props: ListProps<T>) => <Wrapper {...props} />;

export default List;
