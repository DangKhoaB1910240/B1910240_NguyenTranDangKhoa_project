<template>
  <Header />

  <section class="h-100 h-custom" style="background-color: #8fc4b7">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-8 col-xl-6">
          <div class="card rounded-3">
            <img
              src="https://cdn3.dhht.vn/wp-content/uploads/2020/12/banner-nhan.jpg"
              class="w-100"
              style="
                border-top-left-radius: 0.3rem;
                border-top-right-radius: 0.3rem;
              "
              alt="Sample photo"
            />
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                THÔNG TIN ĐẶT HÀNG
              </h3>

              <form @submit.prevent="payment" class="px-md-2">
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1q"
                    class="form-control"
                    v-model="data.user.name"
                  />
                  <label class="form-label" for="form3Example1q">Họ tên</label>
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1q"
                    class="form-control"
                    v-model="data.user.email"
                  />
                  <label class="form-label" for="form3Example1q">Email</label>
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1q"
                    class="form-control"
                    v-model="data.user.phone"
                  />
                  <label class="form-label" for="form3Example1q">SĐT</label>
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1q"
                    class="form-control"
                    v-model="data.user.addr"
                  />
                  <label class="form-label" for="form3Example1q">Địa chỉ</label>
                </div>

                <div class="mb-4">
                  <select class="select" v-model="selected">
                    <option value="" disabled>Phương thức thanh toán</option>
                    <option value="Thanh toán trực tiếp">
                      Thanh toán trực tiếp
                    </option>
                    <option value="Thanh toán online">Thanh toán online</option>
                    <option value="Chuyển khoản">Chuyển khoản</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-success btn-lg mb-1">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import axios from "axios";
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      user: {},
      cart: [],
    });
    let sum = 0;

    data.user = JSON.parse(localStorage.getItem("user"));
    const selected = ref("");
    if (localStorage.getItem("cart") == null) {
      router.push("/product");
    }
    if (localStorage.getItem("cart") != null) {
      data.cart = JSON.parse(localStorage.getItem("cart"));
    }

    if (data.cart.length > 0) {
      for (var i = 0; i < data.cart.length; i++) {
        sum += data.cart[i].soluong * data.cart[i].price;
      }
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    async function payment() {
      try {
        const response = await axios.post("http://localhost:3000/bills", {
          id_user: data.user._id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          addr: data.user.addr,
          total: sum,
          payment: selected.value,
          products: data.cart,
          purchase_date: today,
        });
        if (response.status == 201) {
          alert("Chúc mừng ! Bạn đã đặt hàng thành công.");
          localStorage.removeItem("cart");
          router.push("/order");
        }
      } catch (err) {}
    }
    return {
      payment,
      selected,
      data,
    };
  },
};
</script>
