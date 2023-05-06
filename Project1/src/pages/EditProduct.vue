<template>
  <Header />

  <div class="container mt-3">
    <!-- Section: Design Block -->
    <section class="text-center">
      <!-- Background image -->
      <div
        class="p-5 bg-image"
        style="
          background-image: url('https://mdbootstrap.com/img/new/textures/full/171.jpg');
          height: 300px;
        "
      ></div>
      <!-- Background image -->

      <div
        class="card mx-4 mx-md-5 shadow-5-strong"
        style="
          margin-top: -100px;
          background: hsla(0, 0%, 100%, 0.8);
          backdrop-filter: blur(30px);
        "
      >
        <div class="card-body py-5 px-md-5">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <h2 class="fw-bold mb-5">CHỈNH SỬA SẢN PHẨM</h2>
              <form @submit.prevent="editProduct">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="form3Example1"
                        class="form-control"
                        v-model="data.products.name"
                      />
                      <label class="form-label" for="form3Example1"
                        >Tên sản phẩm</label
                      >
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="form3Example2"
                        class="form-control"
                        v-model="data.products.price"
                      />
                      <label class="form-label" for="form3Example2">Gía</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control"
                    v-model="data.products.desc"
                  />
                  <label class="form-label" for="form3Example3">Mô tả</label>
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control"
                    v-model="data.products.img[0]"
                  />
                  <label class="form-label" for="form3Example3"
                    >Hình ảnh 1</label
                  >
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control"
                    v-model="data.products.img[1]"
                  />
                  <label class="form-label" for="form3Example3"
                    >Hình ảnh 2</label
                  >
                </div>
                <!-- Password input -->

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Lưu
                </button>
                <!-- Register buttons -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->
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
    const route = useRoute();
    const data = reactive({
      products: {},
      cate: [],
    });
    async function getAllCate() {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        data.cate = response.data;
      } catch (err) {}
    }
    getAllCate();
    async function getProductById() {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/" + route.params.id
        );
        data.products = response.data;
        console.log(data.products);
      } catch (err) {}
    }
    getProductById();
    async function editProduct() {
      try {
        const response = await axios.patch(
          "http://localhost:3000/products/" + route.params.id,
          {
            name: data.products.name,
            price: data.products.price,
            desc: data.products.desc,
            img: data.products.img,
          }
        );
        if (response.status == 200) {
          alert("Chỉnh sửa thành công");
          router.push("/manageproducts");
        }
      } catch (err) {}
    }
    return {
      editProduct,
      data,
    };
  },
};
</script>
