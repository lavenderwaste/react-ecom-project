import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  GET_PRODUCTS_ERROR,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if(action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload; //this is what we pass in from add to cart
    const tempItem = state.cart.find((i) => i.id === id + color) //we can have the same product but in different color, if the user selects another color or product(id) we need to create a newItem and add it (in the else statement)
    
    if(tempItem) { //if the item is already in the cart...
      const tempCart = state.cart.map((cartItem)=>{
        if(cartItem.id === id + color) { //if the item with same color is already in the cart, only increase amount
          let newAmount = cartItem.amount + amount; // the cart item + the amount we are passing in
          if(newAmount > cartItem.max) { //this controls the stock limit, if you add and add and add you might top the stock limit, so we add this constraint
            newAmount = cartItem.max 
          }
          return {...cartItem, amount: newAmount} // we overwrite the values of amount
        } else { //if the cartItem.id doesnt match we just do nothing with that item and just return the cartItem
          return cartItem
        }
      })
      return {
        ...state,
        cart: tempCart,
      }
    } else {
      const newItem = { //if user selects same item but different color or a different item we apply the else statement
        id: id + color,
        name: product.name, //we use product.attribute since we only destructure product, id, color and amount, and not everything else
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return {...state, cart:[...state.cart, newItem]}
    }
  }

  if(action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return {...state, cart: tempCart}
  }

  if(action.type === CLEAR_CART) {
    return {...state, cart:[]}
  }

  if(action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item)=> {
      if(item.id === id) { //this id is already id + color since we already transformed it when adding to cart (ADD_TO_CART)
        if(value === 'inc') {
          let newAmount = item.amount + 1;
          if(newAmount > item.max) { //stock control
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if(value === 'dec') {
          let newAmount = item.amount - 1;
          if(newAmount < 1) { //stock control
            newAmount = 1;
          }
          return { ...item, amount: newAmount }
        }
      } 
      return item
    })
    return {...state, cart: tempCart}
  }

  if(action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {

      const { amount, price } = cartItem

      total.total_items += amount;
      total.total_amount += price*amount;

      return total
    }, {
      total_items: 0,
      total_amount: 0
    })
    return {...state, total_items, total_amount}
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
