class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: [] }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.removeItemClient = this.removeItemClient.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  }

  handleSubmit(item) {
    var newState = this.state.items.concat(item);
    this.setState({ items: newState })
  }

  removeItemClient(id) {
    var newItems = this.state.items.filter((item) => { return item.id != id; });
    this.setState({ items: newItems });
  }

  handleDelete(id) {
      var body = this;
      $.ajax({
        url: `/api/v1/items/${id}`,
        type: 'DELETE',
        success() {
          body.removeItemClient(id);
        }
      });
  }

  handleUpdate(item) {
    var body = this;
    $.ajax({ url: `/api/v1/items/${item.id}`,
      type: 'PUT',
      data: { item: item },
      success: () => {
        body.updateItems(item);
      }
    }
  )}

  updateItems(item) {
    debugger
    var items = this.state.items.filter((i) => { return i.id != item.id });
    items.push(item);
    this.setState({items: items });
  }

  render () {
    return (
            <div>
              <NewItem handleSubmit={this.handleSubmit} />
              <Items items={this.state.items} handleDelete={this.handleDelete} onUpdate={this.handleUpdate} />
            </div>
        )
  }
}

