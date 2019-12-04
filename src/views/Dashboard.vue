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
                    <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
                    <v-btn class="ma-2" outlined color="success" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="openDialog(item.number)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" >Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
     <!-- confirmation Modal -->
    <v-dialog v-model="confirm" max-width="500px" id="confirm">
      <v-card>
        <v-card-title>
          <span class="headline">Are you sure you want to delete this room?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <br />
          <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
          <v-btn class="ma-2" outlined color="success" @click="deleteItem(currentId)">Yes</v-btn>
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
function populateRoom(){
      var room=[]
      axios
      .post("http://localhost:3000/bhm/retrieveAllRooms",{token:localStorage.token})
      .then(response => {
        var datax = response.data.data;
        var counter = 0;
        for (counter; counter < datax.length; counter++) {
          room.push({
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
      return room
    }
export default {
  data: () => ({
    search: '',
    confirm: false,    
    dialog: false,    
    currentId: null,
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
    room: [],
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
      this.room=populateRoom()
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
      this.editedIndex = this.room.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    openDialog(id) {   
      this.confirm = true, 
     this.currentId = id    
    },   
    deleteItem(id) { 
      const index = this.room.indexOf(id) ; 
      axios        
      .post("http://localhost:3000/bhm/deleteRoomByID/" + id, {token: localStorage.token})        
      .then(response => {          
        console.log(response);          
        this.room.splice(index, 1);        
      })        
      .catch(error => {          
        console.log(error);        
      });      
      this.confirm = false;    
    },
    close() {
      this.dialog = false;
      this.confirm =false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.room[this.editedIndex], this.editedItem);
        alert("number is "+this.editedItem.number)
        axios
          .post("http://localhost:3000/bhm/updateRoom/"+ this.editedItem.number, {id:this.editedItem.number,room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice,
            token: localStorage.token})
          .then(response => {
            console.log(response);
            
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.room.push(this.editedItem);
        axios
          .post("http://localhost:3000/bhm/createRoom", {
            room_name: this.editedItem.roomName,
            room_floor: this.editedItem.roomFloor,
            room_capacity: this.editedItem.roomCapacity,
            room_price: this.editedItem.rentPrice,
            token :localStorage.token
          })
          .then( 
            
            this.room = populateRoom()
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