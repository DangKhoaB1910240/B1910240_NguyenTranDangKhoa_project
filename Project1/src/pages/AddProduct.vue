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
              <h2 class="fw-bold mb-5">THÊM SẢN PHẨM</h2>
              <form @submit.prevent="addProduct">
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
                    v-model="data.products.img1"
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
                    v-model="data.products.img2"
                  />
                  <label class="form-label" for="form3Example3"
                    >Hình ảnh 2</label
                  >
                </div>
                <!-- Password input -->
                <div class="form-outline mb-4">
                  <select name="" id="" v-model="selected">
                    <option value="">Danh mục</option>
                    <option v-for="c in data.cate" :key="c._id" :value="c._id">
                      {{ c.name }}
                    </option>
                  </select>
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="radio"
                    name="active"
                    value="true"
                    v-model="picked"
                  />Nổi bật
                  <input
                    name="active"
                    type="radio"
                    value="false"
                    v-model="picked"
                  />Không nổi bật
                </div>
                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Lưu
                </button>e
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
    const data = reactive({
      products: {
        name: "",
        price: "",
        desc: "",
        img: [],
        img1: "",
        img2: "",
        active: Boolean,
      },
      cate: [],
    });
    const selected = ref("");
    const picked = ref("");
    const isReset = ref(false);
    async function getAllCate() {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        data.cate = response.data;
      } catch (err) {}
    }
    getAllCate();
    async function addProduct() {
      data.products.img.push(data.products.img1);
      data.products.img.push(data.products.img2);
      try {
        const response = await axios.post("http://localhost:3000/products", {
          name: data.products.name,
          price: data.products.price,
          desc: data.products.desc,
          img: data.products.img,
          active: picked.value,
          id_category: selected.value,
        });
        if (response.status == 201) {
          alert("Thêm sản phẩm thành công !");
          router.push("/manageproducts");
        }
      } catch (err) {}
    }
    return {
      addProduct,
      data,
      picked,
      selected,
    };
  },
};
</script>
