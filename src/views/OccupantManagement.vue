<template>
  <div>
    <v-btn color="success" @click="dialog = !dialog" id="btnAddRoom">
      <v-icon>mdi-plus</v-icon>Add Room
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <modal-direction></modal-direction>
    </v-dialog>

    
    <v-card>
      <v-card-title id="table">
        Occupant Management
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details       
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="rooms" :search="search">
          <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        
      >
        edit
      </v-icon>
      <v-icon
        small
      
      >
        delete
      </v-icon>
    </template>
      </v-data-table>
    </v-card>
    
  </div>
</template>

<script>
import ModalDirection from "@/components/AddOccupantModal";
export default {
  name: "OccupantManagement",
  components: {
    ModalDirection
  },
  data() {
    return {
      dialog: false,
      modalOpen: false,
      search: "",
      template:"<v-btn>update Occupant</v-btn>",
      headers: [
        {
          text: "Floor Number",
          align: "left",
          sortable: false,
          value: "floorNumber"
        },
        { text: "Room Name", value: "roomName" },
        { text: "Occupant Name", value: "occupant" },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      rooms: [
        {
          floorNumber: 1,
          roomName: "1AFloor",
          occupant: "Christian Gigante"
          
        },
        {
          floorNumber: 1,
          roomName: "1CFloor",
          occupant: "Marion jay Balugo"
        },
        {
          floorNumber: 2,
          roomName: "2BFloor",
          occupant: "Hannah Mae Peliño"
        }
      ]
    };
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    }
  }
};
</script>