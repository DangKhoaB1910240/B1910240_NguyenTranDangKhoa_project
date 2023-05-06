import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/SignUp.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Home.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Products.vue"),
  },
  {
    path: "/product/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Detail.vue"),
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Cart.vue"),
  },
  {
    path: "/payment",
    name: "Payment",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Payment.vue"),
  },
  {
    path: "/confirmbills",
    name: "Confirm",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/ConfirmBills.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/OrderHistory.vue"),
  },
  {
    path: "/manageproducts",
    name: "ManageProducts",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/ManageProduct.vue"),
  },
  {
    path: "/addproduct",
    name: "AddProduct",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/AddProduct.vue"),
  },
  {
    path: "/editproduct/:id",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/EditProduct.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
