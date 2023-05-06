<template>
  <section class="vh-200" style="background-color: #9a616d">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://trangsuc.doji.vn/resize/medium/nhan-cuoi-0718w9006ja1660-dXBsb2FkcHJvZHVjdG5oYW4tY3VvaQ==-medium.jpg"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem; height: 100%"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="submit">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i
                        class="fas fa-cubes fa-2x me-3"
                        style="color: #ff6219"
                      ></i>
                      <span class="h1 fw-bold mb-0">Khoa Shop</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      Đăng ký tài khoản
                    </h5>

                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example17"
                        class="form-control form-control-lg"
                        v-model="Email"
                      />
                      <label class="form-label" for="form2Example17"
                        >Email</label
                      >
                    </div>
                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        v-model="HoTen"
                        id="form2Example17"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example17"
                        >Họ tên</label
                      >
                    </div>
                    <div class="form-outline mb-4">
                      <input
                        v-model="SDT"
                        type="text"
                        id="form2Example17"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example17"
                        >Số điện thoại</label
                      >
                    </div>
                    <div class="form-outline mb-4">
                      <input
                        v-model="MatKhau"
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example27"
                        >Mật khẩu</label
                      >
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Đăng ký
                      </button>
                    </div>
                    <div
                      v-if="isChecked"
                      class="text-success"
                      style="font-weight: bold"
                    >
                      {{ message }}
                    </div>
                    <div v-else class="text-danger" style="font-weight: bold">
                      {{ message }}
                    </div>
                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      Bạn đã có tài khoản?
                      <router-link to="/login"
                        ><a href="#!" style="color: #393f81"
                          >Đăng nhập ngay</a
                        ></router-link
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const Email = ref("");
    const MatKhau = ref("");
    const HoTen = ref("");
    const SDT = ref("");
    const message = ref("");
    const isChecked = ref(true);
    async function submit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          {
            email: Email.value,
            password: MatKhau.value,
            name: HoTen.value,
            phone: SDT.value,
          }
        );
        if (response.data.message == "Tồn tại rồi bạn ơi") {
          message.value = "Email tồn tại rồi!";
          isChecked.value = false;
        } else {
          message.value = "Đăng ký thành công!";
          isChecked.value = true;
        }
      } catch (e) {}
    }
    return {
      isChecked,
      message,
      submit,
      HoTen,
      SDT,
      Email,
      MatKhau,
    };
  },
};
</script>
<style scoped></style>
