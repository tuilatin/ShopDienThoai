const CART_KEY = "guestCart";

export function getGuestCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
}

export function saveGuestCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
