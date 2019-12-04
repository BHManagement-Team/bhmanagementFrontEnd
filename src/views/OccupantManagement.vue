<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="occupant"
          sort-by="roomName"
          class="elevation-1"
          id="styleMargins"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Occupant Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">Add Occupant</v-btn>
                </template>
                <v-card>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-text-field
                          v-model="editedItem.roomFloor"
                          label="Room Floor"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.roomName"
                          label="Room Name"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.roomOccupant"
                          label="Name"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field v-model="editedItem.email" label="Email" :rules="emailRules"></v-text-field>
                        <v-text-field
                          v-model="editedItem.contact"
                          label="Contact"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
                      <v-btn
                        class="ma-2"
                        outlined
                        color="success"
                        @click="save()"
                        :disabled="!valid"
                      >Save</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn class="text" outlined color="success" @click="editItem(item)">OCCUPANT DETAILS</v-btn>
            <v-btn
              class="text"
              outlined
              color="primary"
              @click="paymentDetail(item)"
            >PAYMENT DETAILS</v-btn>
            <v-btn class="text" outlined color="error" @click="deleteItem(item)">DELETE</v-btn>
          </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
          </template>
        </v-data-table>
        <!-- PAYMENT HISTORY -->
        <v-dialog v-model="payment" max-width="800px">
          <v-data-table
            :headers="paymentHeaders"
            :items="paymentHistory"
            sort-by="roomName"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Payment History</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="modalPayment" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" @click="modalPayment=true">Add Payment</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ paymentTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-text-field
                          v-model="editedPayment.paymentAmount"
                          label="Payment Amount"
                          type="Number"
                        ></v-text-field>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="ma-2" outlined color="error" @click="closePaymentModal()">Cancel</v-btn>
                      <v-btn class="ma-2" outlined color="success" @click="closePaymentModal(item)">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-dialog v-model="paymentEdit" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{paymentTitle}}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-text-field
                        v-model="editedPayment.paymentAmount"
                        label="Payment Amount"
                        type="Number"
                      ></v-text-field>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" outlined color="error" @click="closePaymentModal()">Cancel</v-btn>
                    <v-btn class="ma-2" outlined color="success" @click="closePaymentModal()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn class="text" outlined color="success" @click="editPayment(item)">EDIT PAYMENT</v-btn>
            </template>
            <template v-slot:no-data>
              <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
            </template>
          </v-data-table>
        </v-dialog>
        <!-- END -->
      </v-col>
    </v-row>
  </div>
</template>
<style>
#styleMargins {
  margin-top: 100px !important;
  margin-left: 250px;
  margin-right: 100px;
}
.text {
  font-size: 10px !important;
  margin-left: 10px;
}
</style>



<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    paymentEdit: false,
    modalPayment: false,
    payment: false,
    dialog: false,
    //payment section
    paymentHeaders: [
      {
        text: "Payment Date",
        align: "Amount",
        value: "billing_date"
      },
      { text: "Amount", value: "amount", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedPayment: {
      paymentDate: 0,
      paymentAmount: 0
    },
    defaultPayment: {
      paymentDate: 0,
      paymentAmount: 0
    },
    //end payment section
    headers: [
      {
        text: "Room Floor",
        align: "left",
        value: "room_floor"
      },
      { text: "Room Name", value: "room_name", sortable: false },
      { text: "Occupant", value: "occupant_name", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      roomFloor: "",
      roomName: "",
      roomOccupant: "",
      email: "",
      contact: ""
    },
    paymentHistory: [],
    occupant: [],
    defaultItem: {
      roomFloor: "",
      roomName: "",
      roomOccupant: "",
      email: "",
      contact: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ADD OCCUPANT" : "OCCUPANT DETAILS";
    },
    paymentTitle() {
      return this.editedIndex === -1 ? "ADD PAYMENT" : "PAYMENT DETAILS";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.populateOccupant();
  },
  methods: {
    paying() {
      this.payDialog = true;
    },

    //retrieve occupants
    populateOccupant() {
      axios
        .post("http://localhost:3000/bhm/retrieveAllOccupants", {
          token: this.$store.state.token
        })
        .then(response => {
          console.log("this is the value of response after mounting: ");
          console.log(response);
          this.occupant = response.data.data;
        })
        .catch(error => {
          console.log("error in populating: " + error);
        });
    },
    editItem(item) {
      this.editedIndex = this.occupant.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialog = true;
    },
    editPayment(item) {
      console.log("this it the value of item in editing payment: " + item);
      this.editedIndex = 1;
      this.paymentEdit = true;
    },
    deleteItem(item) {
      const index = this.occupant.indexOf(item);
      confirm("Are you sure you want to delete this?") &&
        this.occupant.splice(index, 1);
    },
    //after closing for accounts
    close() {
      this.$refs.form.resetValidation();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.payDialog = false;
      }, 300);
      for (let key in this.editedItem) {
        if (this.editedItem.hasOwnProperty(key)) {
          this.editedItem[key] = "";
        }
      }
      this.dialog = false;
    },
    //for accounts only
    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          console.log("edit");
          Object.assign(this.occupant[this.editedIndex], this.editedItem);
        } else {
          console.log(this.payment);

          axios
            .post("http://localhost:3000/bhm/createOccupant", {
              token: localStorage.token,
              room_name: this.editedItem.roomName,
              room_floor: this.editedItem.roomFloor,
              occupant_name: this.editedItem.roomOccupant,
              occupant_email: this.editedItem.email,
              occupant_contact: this.editedItem.contact
            })
            .then(response => {
              this.occupant.push({
                token: response.data,
                room_name: this.editedItem.roomName,
                room_floor: this.editedItem.roomFloor,
                occupant_name: this.editedItem.roomOccupant,
                occupant_email: this.editedItem.email,
                occupant_contact: this.editedItem.contact
              });
              for (let key in this.editedItem) {
                if (this.editedItem.hasOwnProperty(key)) {
                  this.editedItem[key] = "";
                }
              }
              this.$refs.form.resetValidation();
              this.close();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    paymentDetail(item) {
      this.editedItem = Object.assign({}, item);
      axios
        .post(
          "http://localhost:3000/bhm/retrievePaymentByID/" +
            this.editedItem._id,
          { token: this.$store.state.token }
        )
        .then(response => {
          this.paymentHistory = response.data.data.reverse();

          this.modalPayment = false;
        })
        .catch(error => {
          console.log(error);
        });

      this.payment = true;
    },
    //saving for payment    
    closePaymentModal(item) {
      console.log(this.editedIndex);
      if (this.editedIndex > -1) {
         axios
          .post("http://localhost:3000/bhm/updatePayment", {
            token: this.$store.state.token,
            amount: this.editedPayment.paymentAmount,
            id:this.editedItem._id
          })
          .then(response => {
            console.log(this.paymentHistory.unshift(response.data.data));
            Object.assign(this.paymentHistory[this.paymentHistory.indexOf(item)], this.editedItem);
            this.modalPayment = false;
          })
          .catch(error => {
            console.log(error);
          });
        this.paymentEdit = false;
      } else {
        axios
          .post("http://localhost:3000/bhm/payment/" + this.editedItem._id, {
            token: this.$store.state.token,
            amount: this.editedPayment.paymentAmount
          })
          .then(response => {
            console.log(this.paymentHistory.unshift(response.data.data));

            this.modalPayment = false;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>