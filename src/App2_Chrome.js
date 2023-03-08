import React from 'react';
import './styles.css';

console.clear();

const SortButtons = (props) => {
  return (
    <div className="sort-wrapper">
      <label>Sort Priority By:</label>
      <select className="my-select" onChange={(e) => props.handleSort(e)}>
        <option value="original">Original &#8886;</option>
        <option value="ascending">Ascending &#9650;</option>
        <option value="descending">Descending &#9660;</option>
      </select>
    </div>
  );
};

const List = (props) => (
  <>
    <ul>
      {props.list.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleToggle={props.handleToggle}
          handleRemove={props.handleRemove}
          hendleDecrementPriority={props.hendleDecrementPriority}
          hendleIncrementPriority={props.hendleIncrementPriority}
        />
      ))}
    </ul>
  </>
);

const Item = (props) => (
  <li className={`task ${props.item.completed ? 'item-completed' : ''}`}>
    <p className="task-text">{props.item.value}</p>
    <div className="priority">
      <span>Pr: {props.item.priority}</span>
      <div className="priority-buttons">
        <button
          onClick={() => props.hendleDecrementPriority(props.item)}
          className="priority-btn">
          -
        </button>
        <button
          onClick={() => props.hendleIncrementPriority(props.item)}
          className="priority-btn">
          +
        </button>
      </div>
    </div>
    <div className="buttons">
      <button
        onClick={() => props.handleToggle(props.item)}
        className="btn toggle-btn">
        {!props.item.completed ? 'Toggle' : 'Untoggle'}
      </button>
      <button
        onClick={() => props.handleRemove(props.item)}
        className="btn remove-btn">
        Remove
      </button>
    </div>
  </li>
);

const SearchInput = (props) => (
  <>
    <input
      onChange={props.handleSearch}
      placeholder="Search item..."
      className="input"
    />
  </>
);

class Form extends React.Component {
  state = {
    inputValue: ''
  };
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.inputValue;

    this.setState({ inputValue: '' });
    this.props.handleSubmit(value);
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.inputValue}
            placeholder="+ Add task"
            className="input"
          />
        </form>
      </>
    );
  }
}

class App extends React.Component {
  state = {
    list: [
      {
        value: 'hardcoded',
        completed: false,
        id: new Date().valueOf(),
        priority: 0
      }
    ],
    value: '',
    searchInput: '',
    sort: null
  };

  handleSubmit = (value) => {
    const item = {
      value,
      completed: false,
      id: new Date().valueOf(),
      priority: 0
    };
    const newList = [...this.state.list, item];
    this.setState({ list: newList });
  };

  handleToggle = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleRemove = (item) => {
    const newList = this.state.list.filter((element) => {
      return element.id === item.id ? false : true;
    });
    this.setState({ list: newList });
  };

  handleSearch = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  handleDecrementPriority = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        item.priority > 0 ? item.priority-- : (item.priority = 0);
      }
      return element;
    });
    this.setState({ list: newList });
  };
  handleIncrementPriority = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        item.priority < 5 ? item.priority++ : (item.priority = 5);
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleSort = (e) => {
    const option = e.target.value;
    if (option.toLowerCase().includes('original')) {
      this.setState({ sort: null });
    }
    if (option.toLowerCase().includes('ascending')) {
      this.setState({ sort: true });
    }
    if (option.toLowerCase().includes('descending')) {
      this.setState({ sort: false });
    }
  };

  render() {
    const searchedItems = this.state.list.filter((item) =>
      item.value.toLowerCase().includes(this.state.searchInput)
    );
    const ascendingPriority = [...this.state.list].sort((a, b) => {
      return a.priority - b.priority;
    });
    const descendingPriority = [...this.state.list].sort((a, b) => {
      return b.priority - a.priority;
    });
    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} />
        <SearchInput handleSearch={this.handleSearch} />
        <SortButtons handleSort={this.handleSort} />

        {this.state.sort === null && (
          <List
            list={
              this.state.searchInput !== '' ? searchedItems : this.state.list
            }
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
            hendleDecrementPriority={this.handleDecrementPriority}
            hendleIncrementPriority={this.handleIncrementPriority}
          />
        )}
        {this.state.sort === true && (
          <List
            list={
              this.state.searchInput !== ''
                ? searchedItems.sort((a, b) => a.priority - b.priority)
                : ascendingPriority
            }
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
            hendleDecrementPriority={this.handleDecrementPriority}
            hendleIncrementPriority={this.handleIncrementPriority}
          />
        )}
        {this.state.sort === false && (
          <List
            list={
              this.state.searchInput !== ''
                ? searchedItems.sort((a, b) => b.priority - a.priority)
                : descendingPriority
            }
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
            hendleDecrementPriority={this.handleDecrementPriority}
            hendleIncrementPriority={this.handleIncrementPriority}
          />
        )}
      </div>
    );
  }
}

export default App;
