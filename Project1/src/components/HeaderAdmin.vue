<template>
  <header class="tm-site-footer text-center">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            style="width: 100%; justify-content: center"
            class="navbar-nav mr-auto"
          >
            <li class="nav-item active">
              <router-link to="/manageproducts">
                <a class="nav-link">Quản lý sản phẩm</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/confirmbills">
                <a class="nav-link">Quản lý đơn hàng</a>
              </router-link>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click="logout">Đăng xuất</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    if (
      localStorage.getItem("token") == null ||
      JSON.parse(localStorage.getItem("user")).role != 1
    ) {
      router.push("/login");
    }
    function logout() {
      localStorage.clear();
      router.push("/login");
    }
    return {
      logout,
    };
  },
};
</script>
<style scoped>
li a {
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  color: green;
}
li a:hover {
  border-bottom: 1px solid black;
  color: lightgreen;
  background: black;
  transition-duration: 0.7s;
}
</style>
