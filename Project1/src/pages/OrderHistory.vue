<template>
  <Header />

  <div class="container mt-3">
    <h2 class="text-center">ĐƠN HÀNG CỦA BẠN</h2>

    <table class="table text-center">
      <thead style="height: 30px; background-color: #d28484; color: aliceblue">
        <th>STT</th>
        <th>Sản phẩm</th>
        <th>Tổng tiền</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ đặt</th>
        <th>Phương thức thanh toán</th>
        <th>Trạng thái</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.bills" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="text-start">
            <ol
              style="list-style-type: none"
              v-for="product in item.products"
              :key="product._id"
            >
              <li>
                <h5>{{ product.name }}</h5>
                <img style="width: 30%" :src="product.img[0]" />
                <p>
                  Gía:
                  {{
                    product.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </p>
                <p>Số lượng: {{ product.soluong }}</p>
              </li>
            </ol>
          </td>
          <td>
            {{
              item.total.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}
          </td>
          <td>{{ item.phone }}</td>
          <td>{{ item.addr }}</td>
          <td>{{ item.payment }}</td>
          <td v-if="item.status == 0" class="text-info">Chờ xác nhận</td>
          <td v-if="item.status == 1" class="text-success">Đã xác nhận</td>
          <td v-if="item.status == 2" class="text-danger">Bị hủy bỏ</td>
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
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
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
      bills: [],
    });
    async function getAllBills() {
      try {
        const response = await axios.get(
          "http://localhost:3000/bills?id=" +
            JSON.parse(localStorage.getItem("user"))._id
        );
        data.bills = response.data;
        console.log(data.bills);
      } catch (err) {}
    }
    getAllBills();
    return {
      data,
    };
  },
};
</script>
