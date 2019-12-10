<template>
  <div id="body">
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
                    <v-btn color="primary" dark class="mb-2" v-on="on">Add Room</v-btn>
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
            <template v-slot:item.status="{ item }">
              <span>{{item.status}}</span>
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
                v-if="isShown(item)"
                color="red lighten-2"
              >mdi-account</v-icon>
            </template>
            <v-icon small class="mr-2" @click="editItem(item)">mdi-account</v-icon>
            <template v-slot:item.addOccupant="{ item }">
              <v-btn
                :disabled="isDisable(item)"
                @click="addOccupantModal(item)"
                color="primary"
                light
                class="ma-2"
              >Add Occupant</v-btn>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)" color="blue lighten-2">mdi-pencil</v-icon>

              <v-icon
                small
                @click="openDialog(item.number)"
                color="blue lighten-2"
                :disabled="isdeletable(item)"
              >mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!-- confirmation Modal -->
      <v-dialog v-model="confirm" max-width="500px" id="confirm">
        <v-card>
          <center>
            <img src="~@/assets/del.gif" id="delImg">
          </center>
          <v-card-title>
            <span class="headline">Are you sure you want to delete?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <br>
            <v-btn class="ma-2" outlined color="error" @click="close()">Cancel</v-btn>
            <v-btn class="ma-2" outlined color="success" @click="deleteItem(currentId)">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- end -->
      <v-dialog v-model="successAddOccupant" max-width="500px" id="confirm">
        <v-card>
          <v-card-title>
            <center>
              <img src="~@/assets/suc.gif" id="successImg">
            </center>
            <br>
            <h2 class="headline">Occupant successfully added!!</h2>
            <br>
            <v-spacer></v-spacer>
            <br>
            <br>
            <v-btn class="btnClose" outlined color="success" @click="closesuccess()">C L O S E</v-btn>
            <br>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog v-model="successAddOccupant" max-width="500px" id="confirm">
        <v-card>
          <v-card-title>
            <center>
              <img src="~@/assets/suc.gif" id="successImg">
            </center>
            <br>
            <h2 class="headline">Room has been added successfully!!</h2>
            <br>
            <v-spacer></v-spacer>
            <br>
            <br>
            <v-btn class="btnClose" outlined color="success" @click="closeSuccess()">C L O S E</v-btn>
            <br>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteconfirm" max-width="500px" id="confirm">
        <v-card>
          <v-card-title>
            <center>
              <img src="~@/assets/suc.gif" id="successImg">
            </center>
            <br>
            <h2 class="headline">Room has been deleted successfully!!</h2>
            <br>
            <v-spacer></v-spacer>
            <br>
            <br>
            <v-btn class="btnClose" outlined color="success" @click="closedelete()">C L O S E</v-btn>
            <br>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addOccupant" max-width="500px">
        <v-card>
          <v-form ref="form" lazy-validation>
            <v-card-title>
              <span class="headline">Add Occupant</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedOccupant.occupant_name"
                  label="Name"
                  :rules="nameRules"
                ></v-text-field>
                <v-text-field
                  v-model="editedOccupant.occupant_email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  v-model="editedOccupant.occupant_contact"
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
                @click="createOccupant()"
                :disabled="!valid"
              >Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="updated" max-width="500px" id="confirm">
        <v-card>
          <v-card-title>
            <center>
              <img src="~@/assets/suc.gif" id="successImg">
            </center>
            <br>
            <h2 class="headline">Room has been updated successfully!!</h2>
            <br>
            <v-spacer></v-spacer>
            <br>
            <br>
            <v-btn class="btnClose" outlined color="success" @click="cloeseupdate()">C L O S E</v-btn>
            <br>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-dialog>
    </div>
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
#body {
  background-color: rgb(224, 224, 224);
  height: 100%;
}
</style>
<script>
import axios from "axios";

export default {
  data: () => ({
    successAddOccupant: false,
    datax: [],
    disable: false,
    search: "",
    deleteconfirm: false,
    confirm: false,
    success: false,
    updated: false,
    valid: true,
    dialog: false,
    currentId: null,
    dialog: false,
    addOccupant: false,
    occupantNum: [],
    showIcon: true,
    //for the status
    tempNumber: "ss",
    nameRules: [v => !!v || "Name is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    //rules in room input fields
    floorRules: [v => !!v || "Room Floor is required"],
    nameRules: [v => !!v || "Name is required"],
    capacityRules: [v => !!v || "Capacity is required"],
    priceRules: [v => !!v || "Price is required"],
    //header for tables
    headers: [
      {
        text: "Room Floor",
        align: "left",
        value: "roomFloor"
      },
      { text: "Room Name", value: "roomName" },
      { text: "Rent Price", value: "rentPrice" },
      { text: "Room Capacity", value: "roomCapacity" },
      { text: "Room Status", value: "status" },
      { text: "Add Ocuppants", value: "addOccupant", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    room: [],
    editedIndex: -1,
    editedItem: {
      number: "",
      roomFloor: "",
      roomName: "",
      roomCapacity: "",
      rentPrice: "",
      status:""
    },
    editedOccupant: {
      occupant_name: "",
      occupant_email: "",
      occupant_contact: ""
    },

    //temporary value for editing
    ItemInRow: {
      number: "",
      roomFloor: "",
      roomName: "",
      roomCapacity: "",
      rentPrice: "",
      status:""
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
    this.populateRoom();
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    addOccupantModal (item) {
      this.editedItem = Object.assign({}, item);
      this.ItemInRow=Object.assign({}, item);
      this.editedIndex = this.room.indexOf(item);
      console.log("temporary ",this.ItemInRow)
      this.addOccupant = true;
    },
    isdeletable(item) {
      if (item.status != "Empty") {
        return true;
      }
    },
    // tempStore(){
    //   this.ItemInRow=editedItem
    // },
    isDisable(item) {
      if (item.status == "Full" || item.status > item.roomCapacity) {
        return true;
      }
      // check option and index
      // return true - disable, false - active
    },
    isShown(item) {
      if (item.status != "Full" && item.status != "Empty"  )  {
        return true;
      }
    },

    populateRoom() {
      async function getRooms(tokenVar) {
        var respon = axios
          .post("http://localhost:3000/bhm/retrieveAllRooms", {
            token: tokenVar
          })
          .then(response => {    
            return response;
          })
          .catch(error => {
            console.log("when no rooms found" + error);
          });

        return await respon;
      }

      //get occupant
      async function getOccupant(tokenVar, roomData) {
        // var counter = 0;
         var OccupantCount =[];
          for(const item of roomData){
         let response = await axios.post("http://localhost:3000/bhm/retrieveRoomOccupants", {
                token: tokenVar,
                room_ID:item._id
              })
              if(response.data.data==null || response.data.data==0){
              OccupantCount.push("Empty")
              }else if(item.room_capacity==response.data.data) {
               OccupantCount.push("Full") 
              }else{
                OccupantCount.push(response.data.data)
               
              }
            
      }
       return OccupantCount
      }

      getRooms(this.$store.state.token)
        .then(
          respon => {
            this.datax = respon.data.data;
           getOccupant(this.$store.state.token, this.datax).then(response => {             
              this.occupantNum=response;
              var counter = 0;
              for (counter; counter < this.datax.length; counter++) {
                 if(this.occupantNum[counter] !="Empty" || this.occupantNum[counter] !="Full"){
                this.showIcon=true
              }      
                this.room.push({
                  number: this.datax[counter]._id,
                  roomFloor: this.datax[counter].room_floor,
                  roomName: this.datax[counter].room_name,
                  status: this.occupantNum[counter],
                  roomCapacity: this.datax[counter].room_capacity,
                  rentPrice: this.datax[counter].room_price
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.room.indexOf(item);
      this.editedItem= Object.assign({}, item);
      this.ItemInRow = Object.assign({}, item);
      console.log("god",this.ItemInRow);
      this.dialog = true;
    },
    //dialogs after transaction
    openDialog(id) {
      (this.confirm = true), (this.currentId = id);
    },
    showSuccess() {
      this.success = true;
    },
    showupdated() {
      this.updated = true;
    },
    showDelete() {
      this.deleteconfirm = true;
    },
    closeSuccess() {
      this.successAddOccupant = true;
    },
    deleteItem(id) {
      const index = this.room.indexOf(id);
      axios
        .post("http://localhost:3000/bhm/deleteRoomByID/" + id, {
          token: this.$store.state.token
        })
        .then(response => {
          console.log(response);
          this.room.splice(index - 1, 1);
          this.showDelete();
        })
        .catch(error => {
          console.log(error);
        });
      this.confirm = false;
    },
    closesuccess() {
      this.successAddOccupant = false;
      this.success = false;
    },
    cloeseupdate() {
      this.updated = false;
    },
    closedelete() {
      this.deleteconfirm = false;
    },
    close() {
      this.addOccupant = false;
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.confirm = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedItem.roomFloor < 0) {
        alert("Room Floor cant be below 0");
        if (this.editedItem.roomCapacity < 0) {
          alert("Room Capacity cant be below 0");
        }
      } else {
        if (this.editedIndex > -1) {
          console.log("ayw saba",this.ItemInRow)
          if(this.ItemInRow.roomCapacity<this.editedItem.roomCapacity){
          axios
            .post(
              "http://localhost:3000/bhm/updateRoom",
              {
                room_ID: this.editedItem.number,
                room_name: this.editedItem.roomName,
                room_floor: this.editedItem.roomFloor,
                room_capacity: this.editedItem.roomCapacity,
                room_price: this.editedItem.rentPrice,
                token: localStorage.token
              }
            )
            .then(() => {
              if(this.editedItem.status="Full"){
                this.editedItem.status=this.ItemInRow.roomCapacity
              }
              Object.assign(this.room[this.editedIndex], this.editedItem);
              this.showupdated();
              this.close();
            })
            .catch(error => {
              console.log(error);
            });
          }else{
            alert("room can be over crowded")
          }
        } else if (this.$refs.form.validate()) {
          console.log("hoi")
          this.snackbar = true;
          if (isNaN(this.editedItem.roomFloor)) {
            alert("room floor should be a number ");
          } else if (isNaN(this.editedItem.roomCapacity)) {
            console.log(this.editedItem.roomCapacity);
            alert("room capacity should be a number ");
          } else if (isNaN(this.editedItem.rentPrice)) {
            alert("room price should be a number ");
          } else if (this.editedItem.roomFloor < 0) {
            alert("room floor should not  be less than 0 ");
          } else if (this.editedItem.roomCapacity < 0) {
            alert("room floor should not  be less than 0  ");
          } else if (this.editedItem.rentPrice < 0) {
            alert("room floor should not  be less than 0  ");
          } else {
            axios
              .post("http://localhost:3000/bhm/createRoom", {
                room_name: this.editedItem.roomName,
                room_floor: this.editedItem.roomFloor,
                room_capacity: this.editedItem.roomCapacity,
                room_price: this.editedItem.rentPrice,
                token: this.$store.state.token
              })
              .then(
                this.editedItem.status="Empty",
                this.room.push(this.editedItem),
                this.showSuccess(),
                this.close()
              )
              .catch(error => {
                console.log(error);
              });
          }
          
         
        }
      }
    },
    createOccupant() {
      axios
        .post("http://localhost:3000/bhm/createOccupant", {
          token: this.$store.state.token,
          room_ID: this.editedItem.number,
          room_name: this.editedItem.roomName,
          room_floor: this.editedItem.roomFloor,
          occupant_name: this.editedOccupant.occupant_name,
          occupant_email: this.editedOccupant.occupant_email,
          occupant_contact: this.editedOccupant.occupant_contact
        })
        .then(response => {
          console.log("item in row ",this.ItemInRow)
          this.addOccupant = false;
          this.successAddOccupant = true
          console.log(this.room.indexOf(this.editedItem))
          if(this.editedItem.status=="Empty"){
            this.editedItem.status=1
          }else{
          this.editedItem.status+=1
          if(this.editedItem.status+=1 == this.editedItem.roomCapacity){
            this.editedItem.status="Full"
          }
          }
          
         Object.assign(this.room[this.editedIndex], this.editedItem);
          
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>