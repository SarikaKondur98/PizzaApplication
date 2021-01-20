<template>
  <div>
    <v-img src="/Static/Pizzaplace.jpg">
      <v-container text-xs-center>
        <v-layout>
          <v-flex xs12 sm6 md12>
            <h1 class="display-2">Today's Orders</h1>
            <br />
            <v-flex xs6 sm3>
              <v-btn outline color="white" class="mx-5" @click="takeOrder()"
                >Take a Order</v-btn
              >
            </v-flex>
            <div>
              <v-container>
                <v-layout row wrap>
                  <v-dialog v-model="addDialog" max-width="800">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-card>
                        <v-card-title class="headline"
                          >Order Details<v-spacer></v-spacer
                          ><v-icon @click="addDialog = false"
                            >close</v-icon
                          ></v-card-title
                        >
                        <v-divider></v-divider>
                        <div class="bread">
                          <v-container>
                            <v-layout row wrap>
                              <v-flex xs12 sm6>
                                <v-text-field
                                  label="Customer Name"
                                  type="text"
                                  v-model="cName"
                                  :rules="nameRules"
                                  required
                                ></v-text-field> </v-flex
                              ><v-spacer></v-spacer>
                              <v-flex xs12 sm3>
                                <v-text-field
                                  required
                                  label="Items Ordered"
                                  v-model="itemOrder"
                                  type="number"
                                  :rules="nameRules"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <v-text-field
                                  required
                                  label="Total Amount"
                                  type="number"
                                  v-model="total"
                                  :rules="nameRules"
                                ></v-text-field>
                              </v-flex>
                              <br /><br />
                              <v-flex xs12 sm10>
                                <v-select
                                  required
                                  :items="items"
                                  label="Order Status"
                                  v-model="selectOrder"
                                  outline
                                  :rules="nameRules"
                                ></v-select>
                              </v-flex>
                              <br />
                              <br />
                              <br />
                              <v-flex xs12 sm12>
                                <v-divider></v-divider>
                                <v-btn
                                  :disabled="!valid"
                                  outline
                                  color="indigo darken-4"
                                  class="mx-5"
                                  @click="addDetailsDialog()"
                                  >Add</v-btn
                                >
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </div>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-layout>
              </v-container>
            </div>
            <br />
            <br />
            <div class="film">
              <v-layout row wrap>
                <v-flex xs7 md2 class="white--text font-weight-black"
                  >Customers Name</v-flex
                >
                <v-flex xs4 md2 class="white--text font-weight-black"
                  >No. of Items Ordered</v-flex
                >
                <v-flex xs4 md2 class="white--text font-weight-black"
                  >Total Amount</v-flex
                >
                <v-flex xs7 md3 class="white--text font-weight-black"
                  >Order Status</v-flex
                >
                <v-flex xs7 md3 class="white--text font-weight-black"
                  >Change Order Status</v-flex
                >
              </v-layout>
            </div>
            <div class="cinema">
              <v-flex class="pa-3 my-3" v-for="(order, i) in orders" :key="i">
                <v-layout row wrap>
                  <v-flex xs7 md2>{{ order.name }}</v-flex>
                  <v-flex xs4 md2>{{ order.itemsOrdered }}</v-flex>
                  <v-flex xs4 md2>{{ order.totalAmount }}</v-flex>
                  <v-flex xs7 md3>{{ order.status }}</v-flex>
                  <v-flex xs7 md3
                    ><v-icon class="white--text" @click="edit(i, order)"
                      >create</v-icon
                    ></v-flex
                  >
                </v-layout>
              </v-flex>
            </div>
            <div>
              <v-container>
                <v-layout row wrap>
                  <v-dialog v-model="editDialog" max-width="800">
                    <v-form>
                      <v-card>
                        <v-card-title class="headline"
                          >Order Details<v-spacer></v-spacer
                          ><v-icon @click="editDialog = false"
                            >close</v-icon
                          ></v-card-title
                        >
                        <v-divider></v-divider>
                        <div class="bread">
                          <v-container>
                            <v-layout row wrap>
                              <v-flex xs12 sm6>
                                <v-text-field
                                  label="Customer Name"
                                  type="text"
                                  v-model="cName"
                                  disabled
                                ></v-text-field> </v-flex
                              ><v-spacer></v-spacer>
                              <v-flex xs12 sm3>
                                <v-text-field
                                  label="Items Ordered"
                                  v-model="itemOrder"
                                  type="number"
                                  disabled
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <v-text-field
                                  disabled
                                  label="Total Amount"
                                  type="number"
                                  v-model="total"
                                ></v-text-field>
                              </v-flex>
                              <br /><br />
                              <v-flex xs12 sm10>
                                <v-select
                                  required
                                  :items="items"
                                  label="Order Status"
                                  solo
                                  v-model="selectOrder"
                                ></v-select>
                              </v-flex>
                              <br />
                              <v-flex xs12 sm12>
                                <v-divider></v-divider>
                                <v-btn
                                  outline
                                  color="indigo darken-4"
                                  class="mx-5"
                                  @click="editDetailsDialog()"
                                  >Save</v-btn
                                >
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </div>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-layout>
              </v-container>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      editDialog: false,
      addDialog: false,
      selectedIndex: null,
      selectOrder: null,
      cName: "",
      itemOrder: "",
      total: "",
      nameRules: [(v) => !!v || "This Field is Required"],
      items: ["Order Received", "Preparing", "Ready to Serve"],
      orders: [
        {
          name: "Daniel Radcliffe",
          itemsOrdered: 5,
          totalAmount: 450,
          status: "Order Received",
        },
        {
          name: "Emma Watson",
          itemsOrdered: 7,
          totalAmount: 950,
          status: "Preparing",
        },
        {
          name: "Rupert Grint",
          itemsOrdered: 10,
          totalAmount: 1550,
          status: "Ready to Serve",
        },
      ],
    };
  },
  methods: {
    edit(i, val) {
      this.selectedIndex = i;
      this.cName = val.name;
      this.itemOrder = val.itemsOrdered;
      this.total = val.totalAmount;
      this.selectOrder = val.status;
      this.editDialog = true;
    },
    editDetailsDialog() {
      this.orders[this.selectedIndex].name = this.cName;
      this.orders[this.selectedIndex].itemsOrdered = this.itemOrder;
      this.orders[this.selectedIndex].totalAmount = this.total;
      this.orders[this.selectedIndex].status = this.selectOrder;
      this.editDialog = false;
    },
    takeOrder() {
      this.$refs.form.resetValidation();
      this.addDialog = true;
      this.cName = "";
      this.itemOrder = "";
      this.total = "";
      this.selectOrder = null;
    },
    addDetailsDialog() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let obj = {
          name: this.cName,
          itemsOrdered: this.itemOrder,
          totalAmount: this.total,
          status: this.selectOrder,
        };
        this.orders.push(obj);
        this.addDialog = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  padding-top: 75px;
  color: antiquewhite;
}
.cinema {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: bold;
  color: gray;
}
.film {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: bold;
  color: antiquewhite;
  font-size: 130%;
}
.bread {
  font-family: "Nunito", sans-serif;
}
</style>