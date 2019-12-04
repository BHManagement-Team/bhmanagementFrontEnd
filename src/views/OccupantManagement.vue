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
                          v-model="editedItem.room_floor"
                          label="Room Floor"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.room_name"
                          label="Room Name"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.occupant_name"
                          label="Name"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.occupant_email"
                          label="Email"
                          :rules="emailRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.occupant_contact"
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
            <v-btn
              class="text"
              outlined
              color="primary"
              @click="payment = true,editedPayment(item)"
            >PAYMENT DETAILS</v-btn>
            <v-btn class="text" outlined color="success" @click="editItem(item)">OCCUPANT DETAILS</v-btn>
            <v-btn class="text" outlined color="error" @click="openDialog(item._id)">DELETE</v-btn>
          </template>
        </v-data-table>
        <!-- PAYMENT HISTORY -->
        <!-- <v-dialog v-model="payment" max-width="800px">
          <v-data-table
            :headers="paymentHeaders"
            :items="occupant"
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
                          v-model="editedItem.roomFloor"
                          label="Payment Date"
                          type="Date"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.roomName"
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
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn class="text" outlined color="success" @click="editPayment(item)">EDIT PAYMENT</v-btn>
            </template>
          </v-data-table>
        </v-dialog>-->
        <!-- END -->
        <!-- confirmation Modal -->
        <v-dialog v-model="confirm" max-width="500px" id="confirm">
          <v-card>
            <center>
              <img src="~@/assets/del.gif" id="delImg" />
            </center>
            <v-card-title>
              <span class="headline">Are you sure you want to delete?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <br />
              <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
              <v-btn class="ma-2" outlined color="success" @click="deleteItem(currentId)">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- end -->
        <v-dialog v-model="success" max-width="500px" id="confirm">
          <v-card>
            <v-card-title>
              <center>
                <img src="~@/assets/suc.gif" id="successImg" />
              </center>
              <br />
              <h2 class="headline">Room has been added successfully!!</h2>
              <br />
              <v-spacer></v-spacer>
              <br />
              <br />
              <v-btn class="btnClose" outlined color="success" @click="closesuccess()">C L O S E</v-btn>
              <br />
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
        </v-dialog>
        <v-dialog v-model="updated" max-width="500px" id="confirm">
          <v-card>
            <v-card-title>
              <center>
                <img src="~@/assets/suc.gif" id="successImg" />
              </center>
              <br />
              <h2 class="headline">Room has been updated successfully!!</h2>
              <br />
              <v-spacer></v-spacer>
              <br />
              <br />
              <v-btn class="btnClose" outlined color="success" @click="cloeseupdate()">C L O S E</v-btn>
              <br />
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
        </v-dialog>
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
#successImg {
  margin-left: 150px;
  height: 150px;
  width: auto;
}
#delImg {
  margin-left: 25px;
  height: 150px;
  width: auto;
}
.btnClose {
  margin-left: 170px !important;
}
#confirm {
  margin-top: 100px !important;
  text-align: center;
}
.headline {
  margin-left: 35px !important;
}
</style>
<script>
import axios from "axios";
function populateOccupant() {
  var room = [];
  axios
    .post("http://localhost:3000/bhm/retrieveAllOccupants", {
      token: localStorage.token
    })
    .then(response => {
      console.log(response);
      var datax = response.data.data;
      var counter = 0;
      for (counter; counter < datax.length; counter++) {
        room.push({
          _id: datax[counter]._id,
          room_floor: datax[counter].room_floor,
          room_name: datax[counter].room_name,
          occupant_name: datax[counter].occupant_name,
          occupant_email: datax[counter].occupant_email,
          occupant_contact: datax[counter].occupant_contact
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  return room;
}
export default {
  data: () => ({
    updated:false,
    confirm: false,
    success: false,
    currentId: null,
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    modalPayment: false,
    payment: false,
    dialog: false,
    headers: [
      {
        text: "Room Floor",
        align: "left",
        value: "room_floor"
      },
      { text: "Room Name", value: "room_name" },
      { text: "Occupant", value: "occupant_name" },
      { text: "Email", value: "occupant_email", sortable: false },
      { text: "Contact #", value: "occupant_contact", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    occupant: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      room_floor: "",
      room_name: "",
      occupant_name: "",
      occupant_email: "",
      occupant_contact: ""
    },
    defaultItem: {
      _id: "",
      room_floor: "",
      room_name: "",
      occupant_name: "",
      occupant_email: "",
      occupant_contact: ""
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

  methods: {
    openDialog(id) {
      (this.confirm = true), (this.currentId = id);
    },
    editPayment(item) {
      this.editedIndex = this.occupant.indexOf(item);
      this.editedPayment = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editedIndex = this.occupant.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
     showSuccess() {
      this.success = true;
    },
    showupdated() {
      this.updated = true;
    },
    deleteItem(id) {
      const index = this.occupant.indexOf(id);
      axios
        .post("http://localhost:3000/bhm/deleteOccupantByID/" + id, {
          token: localStorage.token
        })
        .then(response => {
          console.log(response);
          this.occupant.splice(index -1, 1);
        })
        .catch(error => {
          console.log(error);
        });
      this.confirm = false;
    },
    closePaymentModal() {
      this.modalPayment = false;
    },
    closesuccess() {
      this.success = false;
    },
    cloeseupdate() {
      this.updated = false;
    },
    close() {
      this.updated = false;
      this.confirm = false;
      this.$refs.form.resetValidation();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.occupant[this.editedIndex], this.editedItem);
        axios
          .post(
            "http://localhost:3000/bhm/updateOccupant/" + this.editedItem._id,
            {
              _id: this.editedItem._id,
              room_name: this.editedItem.room_name,
              room_floor: this.editedItem.room_floor,
              occupant_name: this.editedItem.occupant_name,
              occupant_email: this.editedItem.occupant_email,
              occupant_contact: this.editedItem.occupant_contact,
              token: localStorage.token
            }
          )
          .then(response => {
            console.log(response);
            this.showupdated();
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.occupant.push(this.editedItem);
        axios
          .post("http://localhost:3000/bhm/createOccupant", {
            room_name: this.editedItem.room_name,
            room_floor: this.editedItem.room_floor,
            occupant_name: this.editedItem.occupant_name,
            occupant_email: this.editedItem.occupant_email,
            occupant_contact: this.editedItem.occupant_contact,
            token: localStorage.token
          })
          .then(response => {
            console.log(response);
            this.occupant = populateOccupant();
            this.showSuccess()
          });
      }
      this.$refs.form.resetValidation();
      this.close();
    }
  },
  mounted() {
    if (localStorage.token != "null") {
      this.occupant = populateOccupant();
    } else {
      this.$router.push({ path: "/" });
    }
  }
};
</script>