import { observable, computed } from "mobx";

const menuData = [
  { id: 1, quantity: 1, title: "Naan Kabab", price: 7.0, selected: true },
  { id: 2, quantity: 4, title: "Haleem", price: 8 },
  { id: 3, quantity: 7, title: "Karahi", price: 3 }
];
class MenuListStore {
  @observable menuList = menuData;
  @computed
  get orderItems() {
    return this.menuList.filter(item => item.selected);
  }
  @computed
  get orderTotal() {
    return this.orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
}

export default MenuListStore;
