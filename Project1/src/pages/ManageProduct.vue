<template>
  <Header />

  <div class="container mt-3">
    <h2 class="text-center">DANH SÁCH SẢN PHẨM</h2>
    <router-link to="addproduct"
      ><button class="btn btn-dark mt-2 mb-2">
        Thêm sản phẩm
      </button></router-link
    >

    <div class="text-center mb-3">
      <input
        style="width: 50%"
        type="text"
        v-model="searchText"
        placeholder="Nhập tên sản phẩm"
      />
    </div>
    <table class="table text-center">
      <thead style="height: 30px; background-color: #d28484; color: aliceblue">
        <th>STT</th>
        <th>Sản phẩm</th>
        <th>Hình ảnh</th>
        <th>Gía</th>
        <th>Mô tả</th>
        <th>Nổi bật</th>
        <th>Thao tác</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.listProductsFilter" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td><img style="width: 70%" :src="item.img[0]" /></td>
          <td>
            {{
              item.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}
          </td>
          <td>{{ item.desc }}</td>
          <td>{{ item.active == true ? "Có" : "Không" }}</td>
          <td>
            <routerLink :to="{ name: 'edit', params: { id: item._id } }">
              <button class="btn btn-info">Sửa</button>
            </routerLink>

            <button class="btn btn-danger" @click="xoa(item)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Footer />
</template>
<style scoped>
table {
  font-size: 1.3rem;
}
.price {
  font-size: 1.4rem;
  text-align: right;
}
</style>
<script>
import Footer from "../components/FooterAdmin.vue";
import Header from "../components/HeaderAdmin.vue";
import axios from "axios";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const router = useRouter();
    const searchText = ref("");
    const data = reactive({
      products: [],
      listProductsFilter: [],
    });
    const isReset = ref(false);
    async function getAllProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        data.products = response.data;
      } catch (err) {}
    }
    getAllProducts();
    data.listProductsFilter = computed(() => {
      return data.products.filter((e) =>
        e.name.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });
    async function xacNhan(item) {
      try {
        await axios.patch("http://localhost:3000/products/" + item._id, {
          status: 1,
        });
        isReset.value = !isReset.value;
      } catch (err) {}
    }
    async function xoa(item) {
      if (confirm("Muốn xóa chắc chắn không?")) {
        try {
          await axios.delete("http://localhost:3000/products/" + item._id);
          isReset.value = !isReset.value;
        } catch (err) {}
      }
    }
    watch(isReset, async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        data.products = response.data;
      } catch (err) {}
    });
    return {
      searchText,
      xoa,
      data,
    };
  },
};
</script>
