import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import AppStore from "./appStore";
import "./styles.css";

const appStore = new AppStore();
const menuData = [
  { id: 1, quantity: 1, title: "Naan Kabab", price: 7.0 },
  { id: 2, quantity: 4, title: "Haleem", price: 8 },
  { id: 3, quantity: 7, title: "Karahi", price: 3 }
];

@observer
class MenuListItem extends React.Component {
  handleSelect = e => {
    this.props.menuItem.selected = e.target.checked;
  };
  incrementQuantity = e => {
    const { menuItem } = this.props;
    menuItem.quantity = menuItem.quantity + 1;
  };
  decrementQuantity = e => {
    const { menuItem } = this.props;
    menuItem.quantity = menuItem.quantity - 1;
  };
  render() {
    const { menuItem } = this.props;
    return (
      <div className="row">
        <span className="col">
          <input
            onChange={this.handleSelect}
            checked={menuItem.selected}
            type="checkbox"
          />
        </span>
        <span className="col meal-col">{menuItem.title}</span>
        <span className="col">{menuItem.price}</span>
        <span className="col">
          <button onClick={this.incrementQuantity}>+</button>
          {menuItem.quantity}
          <button onClick={this.decrementQuantity}>-</button>
        </span>
      </div>
    );
  }
}
@observer
class MenuList extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className="menu-list-container">
        <div className="header-row">
          <span className="col">Add</span>
          <span className="col meal-col">Title</span>
          <span className="col">Price</span>
          <span className="col">Quantity</span>
        </div>
        <div className="rows">
          {store.menuList.map(item => (
            <MenuListItem key={item.id} menuItem={item} />
          ))}
        </div>
        <h1>Order Total: {store.orderTotal} Rs</h1>
      </div>
    );
  }
}

ReactDOM.render(<MenuList store={appStore} />, document.getElementById("root"));
