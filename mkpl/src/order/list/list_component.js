import { buildContext, Context} from './list_model';
import ListSearch from './list_search_component';
import ListList from './list_list_component';

const ListComponent = () => {
  return (
    <Context.Provider value={buildContext()}>
      <div style={{width: '100%'}}>
        <div style={{width: '20%', display: 'inline-block'}}>
          <ListSearch />
        </div>
        <div style={{width: '80%', display: 'inline-block'}}>
          <ListList />
        </div>
      </div>
    </Context.Provider>
  );
};

export default ListComponent;
