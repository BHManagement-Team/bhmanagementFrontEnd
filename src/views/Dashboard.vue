<template>
  <div>
     <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
              <v-btn color="success" @click="dialog = !dialog" id="btnAddRoom">
                <v-icon>mdi-plus</v-icon>Add Room
              </v-btn>
            <!-- Rooms Available For: Any Gender
            Room Size: Double Room
            Room Number: 1BFloor
            Sharing With: Male
            Occupation: Any Occupation
            Orientation Preference: Not Important
            Rent Type: Per month
            Rent Price: ₱ 1,000.00
            Language Preference: Any
            Spirituality Preference: Any -->

          <!-- Modal add room -->
            <v-dialog v-model="dialog" max-width="500px" >
              <v-card>
                <v-card-text><br>
                  <h3>ADD ROOM</h3>
                  <v-text-field label="Room Floor" v-model="roomFloor" prepend-icon="mdi-home-floor-1" Type="number"></v-text-field>
                  <v-text-field label="Room Name" v-model="roomName" prepend-icon="mdi-home-edit"></v-text-field>
                  <v-text-field label="Room Type" v-model="roomType" prepend-icon="mdi-lock"></v-text-field>
                  <v-text-field label="Room Size" v-model="roomSize" prepend-icon="mdi-lock"></v-text-field>
                  <v-text-field label="Sharing With" v-model="roomSharing" prepend-icon="mdi-account-group"></v-text-field>
                  <v-text-field label="Rent Price" v-model="roomRentPrice" prepend-icon="mdi-account-cash" Type="number"></v-text-field>
                  <small class="grey--text">*This details will be save.</small>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn color="red" @click="dialog = false">Cancel</v-btn>
                  <v-btn color="blue" @click="dialog = false" id="btnModalSaceRoom" >Save Room</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          <!-- Modal add room -->
               <!-- <v-data-table id="table"
                :headers="headers"
                :items="desserts"
              ></v-data-table> -->
              <v-card>
                <v-card-title id="table">
                  Room Management
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="rooms" :search="search" ></v-data-table>
              </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
  #btnAddRoom{
    position:absolute;
    top:130px;
    left: 200px;
  }
  #table{
    margin-top:200px;
  }
</style>
<script>
export default {
  name: "Dashboard",
  data(){
    return{
      dialog:false,
      search: '',
        headers: [
          {
            text: 'Floor Number',
            align: 'left',
            sortable: false,
            value: 'floorNumber',
          },
          { text: 'Room Name', value: 'roomName' },
          { text: 'Occupant Name', value: 'occupant' }
        ],
        rooms: [
          {
            floorNumber: 1,
            roomName: '1AFloor',
            occupant: 'Christian Gigante'
          },
          {
            floorNumber: 1,
            roomName: '1CFloor',
            occupant:'Marion jay Balugo'
          },
          {
            floorNumber: 2,
            roomName: '2BFloor',
            occupant:'Hannah Mae Peliño'
          },
        ],
      }
    },
};
</script>