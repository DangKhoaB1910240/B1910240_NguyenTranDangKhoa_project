<template>
  <section class="vh-100" style="background-color: #9a616d">
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
                      Đăng nhập tài khoản của bạn
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
                        type="password"
                        id="form2Example27"
                        v-model="MatKhau"
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
                        Đăng nhập
                      </button>
                    </div>
                    <div class="text-danger" style="font-weight: bold">
                      {{ errorMessage }}
                    </div>
                    <a class="small text-muted" href="#!">Quên mật khẩu?</a>
                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      Bạn chưa có tài khoản?
                      <router-link to="/signup"
                        ><a href="#!" style="color: #393f81"
                          >Đăng ký ngay</a
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
    const errorMessage = ref("");
    async function submit() {
      try {
        const response = await axios.post("http://localhost:3000/users/login", {
          email: Email.value,
          password: MatKhau.value,
        });
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          if (response.data.user.role == 0) {
            router.push("/");
          } else {
            router.push("/confirmbills");
          }
        } else {
          errorMessage.value = "Đăng nhập thất bại!";
        }
      } catch (e) {}
    }
    return {
      errorMessage,
      submit,
      Email,
      MatKhau,
    };
  },
};
</script>
<style scoped></style>
