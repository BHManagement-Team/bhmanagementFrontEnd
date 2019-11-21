<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
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
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-text-field v-model="editedItem.roomFloor" label="Room Floor"></v-text-field>
                      <v-text-field v-model="editedItem.roomName" label="Room Name"></v-text-field>
                      <v-text-field v-model="editedItem.roomOccupant" label="Name"></v-text-field>
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                      <v-text-field v-model="editedItem.contact" label="Contact"></v-text-field>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
                    <v-btn class="ma-2" outlined color="success" @click="save()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn class="text" outlined color="success" @click="editItem(item)">OCCUPANT DETAILS</v-btn>
            <v-btn class="text" outlined color="primary" @click="payment = true,editedPayment(item)">PAYMENT DETAILS</v-btn>
            <v-btn class="text" outlined color="error" @click="deleteItem(item)">DELETE</v-btn>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
        <!-- PAYMENT HISTORY -->
        <v-dialog v-model="payment" max-width="800px">
          <v-data-table
            :headers="paymentHeaders"
            :items="desserts"
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
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
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
export default {
  data: () => ({
    modalPayment: false,
    payment: false,
    dialog: false,
    //payment section
    paymentHeaders: [
      {
        text: "Payment Date",
        align: "Amount",
        value: "paymentDate"
      },
      { text: "Amount", value: "paymentAmount", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedPayment: {
      paymentDate: 0,
      paymentAmount:0
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
        value: "roomFloor"
      },
      { text: "Room Name", value: "roomName", sortable: false },
      { text: "Occupant", value: "roomOccupant", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      roomFloor: 1,
      roomName: "",
      roomOccupant: "",
      email: "",
      contact: ""
    },
    defaultItem: {
      roomFloor: 0,
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

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          roomFloor: 2,
          roomName: "2CFloor",
          roomOccupant: "Chilla Jean",
          email: "c@gmail.com",
          contact: "094452492469",
          paymentDate:[ "January 11,2019"],
          paymentAmount: [500]
        },
        {
          roomFloor: 1,
          roomName: "1AFloor",
          roomOccupant: "Hannah Mae",
          email: "c@gmail.com",
          contact: "094452492469",
          paymentDate: ["January 20,2019", "February 20,2019", "March 20,2019"],
          paymentAmount: [1500, 1500, 1500]
        },
        {
          roomFloor: 1,
          roomName: "1BFloor",
          roomOccupant: "Marion Jay",
          email: "c@gmail.com",
          contact: "094452492469",
          paymentDate: ["January 10,2019", "March 20,2019"],
          paymentAmount: [500, 1000]
        }
      ];
    },
    editPayment(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedPayment = Object.assign({}, item);
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this?") &&
        this.desserts.splice(index, 1);
    },
    closePaymentModal() {
      this.modalPayment = false;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>