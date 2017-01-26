class Items extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleDelete(id) {
      this.props.handleDelete(id);
  }

  onUpdate(item) {
     this.props.onUpdate(item);
  }


  render () {
    const items = this.props.items.map((item) => {
        return (
            <div key={item.id}>
                <Item item={item}
                       handleDelete={this.handleDelete.bind(this, item.id)}
                       handleUpdate={this.onUpdate}/>

            </div>
        )
    });
    return (
        <div>
            {items}
        </div>
    )
  }
}

