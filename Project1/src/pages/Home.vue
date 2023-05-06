<template>
  <Header />
  <!-- Carousel -->
  <div id="demo" class="carousel slide" data-bs-ride="carousel">
    <!-- Indicators/dots -->
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#demo"
        data-bs-slide-to="0"
        class="active"
      ></button>
      <button
        type="button"
        data-bs-target="#demo"
        data-bs-slide-to="1"
      ></button>
      <button
        type="button"
        data-bs-target="#demo"
        data-bs-slide-to="2"
      ></button>
    </div>

    <!-- The slideshow/carousel -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://cdn.pnj.io/images/promo/149/CAT-Nhan.jpg"
          alt="Los Angeles"
          class="d-block"
          style="width: 100%"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://cdn.pnj.io/images/promo/162/sanrino-1200x450.jpg"
          alt="Chicago"
          class="d-block"
          style="width: 100%"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://cdn.pnj.io/images/promo/164/banner-trang-suc-vang-thang-05.jpg"
          alt="New York"
          class="d-block"
          style="width: 100%"
        />
      </div>
    </div>

    <!-- Left and right controls/icons -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#demo"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#demo"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
  <div class="container">
    <div>
      <marquee behavior="" direction="">
        CHÀO ĐÓN BẠN ĐÃ ĐẾN VỚI CỬA HÀNG CHÚNG TÔI
      </marquee>

      <p>
        Cửa hàng chúng tôi luôn luôn cung cấp nhiều mẫu mã sản phẩm nổi bật đến
        từ nhiều nước trên thế giời. Vàng, bạc, bạch kim... Cửa hàng chúng tôi
        cam kết hàng thật 100%. Nếu có phát hiện bất kỳ hàng giả nhái, chúng tôi
        sẽ hoàn tiền 100%
      </p>
    </div>
    <div>
      <h3 class="text-center">SẢN PHẨM NỔI BẬT</h3>
      <div class="row">
        <div
          v-for="product in data.listProducts"
          :key="product._id"
          class="col-sm-4"
        >
          <img :src="product.img[0]" />
          <h5 class="text-center">{{ product.name }}</h5>
          <p class="text-center">
            {{
              product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}
          </p>
          <div class="addCart">
            <router-link :to="{ name: 'Detail', params: { id: product._id } }"
              ><button class="btn btn-success text-left">
                Chi tiết<img
                  src="../assets/images/opcao-de-interface-de-olho-aberto-visivel.png"
                /></button
            ></router-link>

            <button
              @click="addToCart(product)"
              class="btn btn-success text-right"
            >
              Thêm giỏ<img src="../assets/images/carrinho1.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<style scoped>
marquee {
  width: 100%;
  font-weight: bold;
  font-style: italic;
  font-size: 1.5rem;
  background: #00f7ff;
}
.row .col-sm-4 {
  background: linear-gradient(to bottom, #ffffff, #b4b1ad);
  width: 31.33%;
  margin-right: 2%;
  margin-bottom: 2%;
  border-radius: 5%;
}
.row .col-sm-4 img {
  width: 100%;
}
.row .col-sm-4 h5 {
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
}
.row .col-sm-4 p {
  color: black;
  font-weight: bold;
  font-size: 1.3rem;
  font-style: italic;
}
.row .col-sm-4 .addCart {
  text-align: center;
}
.row .col-sm-4 .addCart button {
  color: black;
  font-weight: bold;
  background: linear-gradient(to bottom, #f32b60, #ff8f1f);
  width: 40%;
}
.row .col-sm-4 .addCart button:first-child {
  margin-right: 1%;
}
.row .col-sm-4 .addCart button:last-child {
  margin-left: 1%;
}
.row .col-sm-4 .addCart button:hover {
  background: linear-gradient(to left, purple, pink);
}
.row .col-sm-4 .addCart img {
  width: 25%;
}
</style>
<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import axios from "axios";
import { reactive, ref } from "vue";
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const data = reactive({
      listProducts: [],
      cart: [],
    });
    const isChecked = ref(false);
    async function getAllProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/products?active=true"
        );
        data.listProducts = response.data;
      } catch (err) {}
    }
    getAllProducts();

    function addToCart(product) {
      product.soluong = 1;
      //Chưa đăng nhập không cho add to cart
      if (
        localStorage.getItem("token") == null ||
        JSON.parse(localStorage.getItem("user")).role != 0
      ) {
        alert("Vui lòng đăng nhập trước khi thêm vào giỏ");
        return;
      }

      //Kiểm tra : Sự tồn tại của localStorage
      if (localStorage.getItem("cart") == null) {
        //Nếu localStorage chưa tồn tại
        //thêm product vào data.cart
        for (var i = 0; i < data.cart.length; i++) {
          if (product._id == data.cart[i]._id) {
            isChecked.value = true;
            break;
          }
          isChecked.value = false;
        }
        if (isChecked.value == true) {
          //Nếu product đã có trong cart thì không cho thêm vào ( xuất hiện thông báo)
          alert("Bạn đã thêm sản phẩm này vào giỏ hàng rồi");
        } else {
          //Nếu product chưa có trong cart thì cho thêm vào
          data.cart.push(product);
        }
      } else {
        //Nếu localStorage tồn tại rồi
        //Lấy dữ liệu từ localStorage hiện tại gán cho data.cart
        data.cart = JSON.parse(localStorage.getItem("cart"));
        //thêm product vào data.cart
        for (var i = 0; i < data.cart.length; i++) {
          if (product._id == data.cart[i]._id) {
            isChecked.value = true;
            break;
          }
          isChecked.value = false;
        }
        if (isChecked.value == true) {
          //Nếu product đã có trong cart thì không cho thêm vào ( xuất hiện thông báo)
          alert("Bạn đã thêm sản phẩm này vào giỏ hàng rồi");
        } else {
          //Nếu product chưa có trong cart thì cho thêm vào
          data.cart.push(product);
        }
      }
      localStorage.setItem("cart", JSON.stringify(data.cart));
      console.log(JSON.parse(localStorage.getItem("cart")));
    }
    return {
      addToCart,
      data,
    };
  },
};
</script>
