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
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Room Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="default" dark class="mb-2" v-on="on">New Item</v-btn>
                </template>
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
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.roomName" label="Room Name" type="text"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.roomCapacity"
                            label="Room Capacity"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.rentPrice"
                            label="Rent Price"
                            type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
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
<<<<<<< HEAD
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="openDialog(item._id)">mdi-delete</v-icon>
          </template>
          <!-- <template v-slot:no-data>
            <v-btn color="primary" >Reset</v-btn>
          </template>-->
        </v-data-table>
      </v-col>
    </v-row>

    <!-- // <v-dialog v-model="updatedModal" max-width="500px">
    //   <v-card>
    //     <v-card-title>
    //       <span class="headline">{{ formTitle }}</span>
    //     </v-card-title>

    //     <v-card-text>
    //       <v-container>
    //         <v-row>
    //           <v-col cols="12" sm="6" md="4">
    //             <v-text-field v-model="editedItem.roomFloor" label="Room Floor" type="text"></v-text-field>
    //           </v-col>
    //           <v-col cols="12" sm="6" md="4">
    //             <v-text-field v-model="editedItem.roomName" label="Room Name" type="text"></v-text-field>
    //           </v-col>
    //           <v-col cols="12" sm="6" md="4">
    //             <v-text-field v-model="editedItem.roomCapacity" label="Room Capacity" type="number"></v-text-field>
    //           </v-col>
    //           <v-col cols="12" sm="6" md="4">
    //             <v-text-field v-model="editedItem.rentPrice" label="Rent Price" type="number"></v-text-field>
    //           </v-col>
    //         </v-row>
    //       </v-container>
    //     </v-card-text>

    //     <v-card-actions>
    //       <v-spacer></v-spacer>
    //       <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
    //       <v-btn class="ma-2" outlined color="success" @click="save()">Save</v-btn>
    //     </v-card-actions>
    //   </v-card>
    // </v-dialog>-->

    <!-- confirmation Modal -->
    <v-dialog v-model="confirm" max-width="500px" id="confirm">
      <v-card>
        <v-card-title>
          <span class="headline">Are you sure you want to delete this room?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <br>
          <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
          <v-btn class="ma-2" outlined color="success" @click="deleteItem(currentId)">Yes</v-btn>
=======
            <v-icon small class="mr-2" @click="editItem(room, room.room_id) ">mdi-pencil</v-icon>
            <v-icon small @click="confirm = true">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <!-- confirmation Modal -->
    <v-dialog v-model="confirm" max-width="500px" id="confirm">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Are you sure you want to delete?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
          <v-btn class="ma-2" outlined color="success" @click="save()">Yes</v-btn>
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
        </v-card-actions>
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
</style>
<script>
import axios from "axios";
<<<<<<< HEAD
// function
=======
function populateRoom() {
  var room = [];
  axios
    .post("http://localhost:3000/bhm/retrieveAllRooms", { token: "sd" })
    .then(response => {
      console.log(response);
      var datax = response.data.data;
      var counter = 0;
      for (counter; counter < datax.length; counter++) {
        room.push({
          roomFloor: datax[counter].room_floor,
          roomName: datax[counter].room_name,
          roomCapacity: datax[counter].room_capacity,
          rentPrice: datax[counter].room_price
        });
        // room.setAttribute("id",datax[counter]._id);
      }
    })
    .catch(error => {
      console.log(error);
    });
  return room;
}
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
export default {
  data: () => ({
    confirm: false,
    dialog: false,
    currentId: null,
    headers: [
      {
        text: "Room Floor",
        align: "left",
        value: "room_floor"
      },
      { text: "Room Name", value: "room_name", sortable: false },
      { text: "Room Capacity", value: "room_capacity", sortable: false },
      { text: "Rent Price", value: "room_price" },
      { text: "Actions", value: "action", sortable: false }
    ],
    room: [],
<<<<<<< HEAD
=======
    room_id: "",
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
    editedIndex: -1,
    editedItem: {
      roomFloor: 0,
      roomName: "",
      roomCapacity: 0,
      rentPrice: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add Room Details"
        : "Update Existing Room Details";
    }
  },
<<<<<<< HEAD
=======
  created() {
    this.room = populateRoom();
  },
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
<<<<<<< HEAD
    populateRoom() {
      axios
        .post("http://localhost:3000/bhm/retrieveAllRooms", { token: "sd" })
        .then(response => {
          console.log(response);
          var datax = response.data.data;
          this.room = datax;
=======
    editItem(room, id) {
      axios
        .post("http://localhost:3000/bhm/updateRoom/" + id, {
          room_name: this.editedItem.roomName,
          room_floor: this.editedItem.roomFloor,
          room_capacity: this.editedItem.roomCapacity,
          room_price: this.editedItem.rentPrice
        })
        .then(response => {
          console.log(response);
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
        })
        .catch(error => {
          console.log(error);
        });
<<<<<<< HEAD
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    openDialog(id) {
      (this.confirm = true), (this.currentId = id);
    },
    deleteItem(id) {
      const index = this.room.indexOf(id);
      axios
        .post("http://localhost:3000/bhm/deleteRoomByID/" + id, {
          token: "sd"
        })
        // .then({
        //     this.room.splice(index, 1)
        //   })
        .then(response => {
          console.log(response);
          this.room.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
      this.confirm = false;
=======
      this.editedIndex = this.room.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(room, id) {
      const index = this.room.indexOf(id);
      confirm("Are you sure you want to delete this item?");
      axios
        .delete("http://localhost:3000/bhm/deleteRoomByID/" + id, {
          token: "sd"
        })
        .then(this.room.splice(index, 1))
        .catch(error => {
          console.log(error);
        });
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
    },

    close() {
      this.confirm = false;
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
<<<<<<< HEAD
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.room[this.editedIndex], this.editedItem);
        axios
          .post("http:/localhost:3000/bhm/updateRoom?method=boolean", {
=======
    save(item) {
      if (this.editedIndex > -1) {
        Object.assign(this.room[this.editedIndex], this.editedItem);
        axios
          .post("http:/localhost:3000/bhm/updateRoom/" + item, {
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
            room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
<<<<<<< HEAD
=======
        this.room.push(this.editedItem);
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
        axios
          .post("http://localhost:3000/bhm/createRoom", {
            token: "fdsfasdf",
            room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice,
            token: "fdsfdsf"
          })
<<<<<<< HEAD
          // .then((this.room = populateRoom())})
          .then(response => {
            this.room.push(response.data)((this.room = populateRoom())),
              (this.dialog = false);
            console.log(response);
          })
=======
          .then((this.room = populateRoom()))
>>>>>>> f8107f5fc11ff5e740fec74168bd12aa587f78c7
          .catch(error => {
            console.log(error);
          });
      }
      this.close();
    },
    mounted() {
      this.populateRoom();
    }
  }
};
</script>