import React from 'react';
import ToDoList from './components/ToDoList';
import Header from './components/Header';
import AddInput from './components/AddInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchDataLoaded: false,
      fetchData: [],
      content: "",
    };
    this.submitForm = this.submitForm.bind(this);
    this.deleteForm = this.deleteForm.bind(this);
    this.editForm = this.editForm.bind(this);
    this.editChecked = this.editChecked.bind(this);
  }


  componentDidMount() {
    this.fetchAllData();
  }


  deleteForm(id) {
    fetch(`${process.env.REACT_APP_TO_DO_ITEMS_API}/items/${id}`, {
      method: "DELETE",
    }).then(response => {
      if (response.status === 200) {
        this.fetchAllData();
      }
    });
  }

  editForm(e, id) {

    console.log('edit form', id, e)
    fetch(`${process.env.REACT_APP_TO_DO_ITEMS_API}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_name: e.target.content.value,
        complete: false
        // content: e.target.content.value,
        // checked: e.target.checked.value,
      }),
    }).then(response => {
      this.fetchAllData();
    });
  }

  editChecked(id, content, checked) {
    fetch(`${process.env.REACT_APP_TO_DO_ITEMS_API}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: content,
        checked: checked,
      }),
    }).then(response => {
      this.fetchAllData();
    });
  }


  fetchAllData() {
    fetch(`${process.env.REACT_APP_TO_DO_ITEMS_API}/items`)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState(prevState => {
          return {
            fetchDataLoaded: true,
            fetchData: responseJson,
          };
        });
      });
  }



  submitForm(e) {
    fetch(`${process.env.REACT_APP_TO_DO_ITEMS_API}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name: e.target.content.value,
      }),
    }).then(response => {
      if (response.status === 201) {
        this.fetchAllData();
      }
    }).catch(e => {
      console.log('error', e)
    })
    e.target.content.value = "";
  }

  fetchComplete() {
    if (this.state.fetchDataLoaded) {
      return (
        <ToDoList
          fetchData={this.state.fetchData}
          deleteForm={this.deleteForm}
          editForm={this.editForm}
          editChecked={this.editChecked}
        // reOrderList={this.reOrderList}
        />
      );
    } else return <p className="loading">Loading....</p>;
  }


  render() {
    return (
      <div className="main">
        <Header />
        <AddInput submitForm={this.submitForm} />
        {this.fetchComplete()}
      </div>
    );
  }

}

export default App;
