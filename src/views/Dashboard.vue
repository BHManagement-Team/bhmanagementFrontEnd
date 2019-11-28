<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
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
                  <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.roomFloor" label="Room Floor"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.roomName" label="Room Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.roomCapacity" label="Room Capacity"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.rentPrice" label="Rent Price"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" outlined color="error" @click="save">Cancel</v-btn>
                    <v-btn class="ma-2" outlined color="success" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" >Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
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
function populateRoom(){
      var desserts=[]
      axios
      .post("http://localhost:3000/bhm/retrieveAllRooms",{token:localStorage.token})
      .then(response => {
       
        console.log(response)
        var datax = response.data.data;
        var counter = 0;
        for (counter; counter < datax.length; counter++) {
          desserts.push({
            number:datax[counter]._id,
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
      return desserts
    }
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Room Floor",
        align: "left",
        value: "roomFloor"
      },
      { text: "Room Name", value: "roomName", sortable: false },
      { text: "Room Capacity", value: "roomCapacity", sortable: false },
      { text: "Rent Price", value: "rentPrice" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      number:"",
      roomFloor: 1,
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
  mounted() {
    if(localStorage.token!="null"){
      this.desserts=populateRoom()
    }else{
      this.$router.push({path:"/"});
    }
  },
  
 
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    
      editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        alert("number is "+this.editedItem.number)
        axios
          .post("http://localhost:3000/bhm/updateRoom", {id:this.editedItem.number,room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice})
          .then(response => {
            console.log(response);
            
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.desserts.push(this.editedItem);
        axios
          .post("http://localhost:3000/bhm/createRoom", {
            room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice,
            token :localStorage.token
          })
          .then( 
            
            this.desserts=populateRoom()
          )
          .catch(error => {
            console.log(error);
          });
      }
      this.close();
    }
  }
};
</script>