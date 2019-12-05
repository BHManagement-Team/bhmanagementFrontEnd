<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="room"
          sort-by="roomName"
          class="elevation-1"
          id="table"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Room Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.roomFloor"
                              label="Room Floor"
                              :rules="floorRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.roomName"
                              label="Room Name"
                              :rules="nameRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.roomCapacity"
                              label="Room Capacity"
                              :rules="capacityRules"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.rentPrice"
                              label="Rent Price"
                              :rules="priceRules"
                              type="number"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
                      <v-btn
                        class="ma-2"
                        outlined
                        color="success"
                        @click="save"
                        :disabled="!valid"
                      >Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="openDialog(item.number)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
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
  </div>
</template>
<style>
#table {
  margin-top: 100px;
  margin-left: 250px;
  margin-right: 100px;
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
function populateRoom() {
  var room = [];
  axios
    .post("http://localhost:3000/bhm/retrieveAllRooms", {
      token: localStorage.token
    })
    .then(response => {
      console.log(response);
      var datax = response.data.data;
      var counter = 0;
      for (counter; counter < datax.length; counter++) {
        room.push({
          number: datax[counter]._id,
          roomFloor: datax[counter].room_floor,
          roomName: datax[counter].room_name,
          roomCapacity: datax[counter].room_capacity,
          rentPrice: datax[counter].room_price
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
    search: "",
    confirm: false,
    success: false,
    updated: false,
    valid: true,
    dialog: false,
    currentId: null,
    dialog: false,
    floorRules: [v => !!v || "Room Floor is required"],
    nameRules: [v => !!v || "Name is required"],
    capacityRules: [v => !!v || "Capacity is required"],
    priceRules: [v => !!v || "Price is required"],
    headers: [
      {
        text: "Room Floor",
        align: "left",
        value: "roomFloor"
      },
      { text: "Room Name", value: "roomName" },
      { text: "Room Capacity", value: "roomCapacity" },
      { text: "Rent Price", value: "rentPrice" },
      { text: "Actions", value: "action", sortable: false }
    ],
    room: [],
    editedIndex: -1,
    editedItem: {
      number: "",
      roomFloor: "",
      roomName: "",
      roomCapacity: "",
      rentPrice: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Room Details"
        : "Update Existing Room Details";
    }
  },
  mounted() {
    if (localStorage.token != "null") {
      this.room = populateRoom();
    } else {
      this.$router.push({ path: "/" });
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.room.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    openDialog(id) {
      (this.confirm = true), (this.currentId = id);
    },
    showSuccess() {
      this.success = true;
    },
    showupdated() {
      this.updated = true;
    },
    deleteItem(id) {
      const index = this.room.indexOf(id);
      axios
        .post("http://localhost:3000/bhm/deleteRoomByID/" + id, {
          token: localStorage.token
        })
        .then(response => {
          console.log(response);
          this.room.splice(index - 1, 1);
        })
        .catch(error => {
          console.log(error);
        });
      this.confirm = false;
    },
    closesuccess() {
      this.success = false;
    },
    cloeseupdate() {
      this.updated = false;
    },
    close() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.confirm = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.room[this.editedIndex], this.editedItem);
        axios
          .post(
            "http://localhost:3000/bhm/updateRoom/" + this.editedItem.number,
            {
              _id: this.editedItem.number,
              room_name: this.editedItem.roomName,
              room_floor: this.editedItem.roomFloor,
              room_capacity: this.editedItem.roomCapacity,
              room_price: this.editedItem.rentPrice,
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
        this.room.push(this.editedItem);
        axios
          .post("http://localhost:3000/bhm/createRoom", {
            room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice,
            token: localStorage.token
          })
          .then((this.room.push = populateRoom()), this.showSuccess())
          .catch(error => {
            console.log(error);
          });
      }
      this.$refs.form.resetValidation();
      this.close();
    }
  }
};
</script>