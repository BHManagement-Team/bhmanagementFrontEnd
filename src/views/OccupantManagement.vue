<template>
  <div id="styleMargin">
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
                      <v-text-field v-model="editedItem.roomFloor" label="Room Floor" prepend-icon="mdi-home-floor-l"></v-text-field>
                      <v-text-field v-model="editedItem.roomName" label="Room Name" prepend-icon="mdi-home-edit"></v-text-field>
                      <v-text-field v-model="editedItem.roomOccupant" label="Name" prepend-icon="mdi-account"> </v-text-field>
                      <v-text-field v-model="editedItem.email" label="Email" :rules="emailRules" prepend-icon="mdi-email"></v-text-field>
                      <v-text-field v-model="editedItem.contact" label="Contact" prepend-icon="mdi-cellphone-iphone"></v-text-field>
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
            <v-btn class="ma-2" outlined color="success" @click="editItem(item)">OCCUPANT DETAILS</v-btn>
            <v-btn class="ma-2" outlined color="primary" @click="editItem(item)">PAYMENT DETAILS</v-btn>
            <v-btn class="ma-2" outlined color="error" @click="deleteItem(item)">DELETE</v-btn>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<style>
#styleMargin {
  margin-left: 30px;
  margin-right: 100px;
  max-width: 1320px;
}
</style>
<script>
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
      { text: "Occupant", value: "roomOccupant", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      roomFloor: "",
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
    },
    paymentItem: {
      roomFloor: '',
      roomName: "",
      roomOccupant: "",
      email: "",
      contact: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ADD OCCUPANT" : "OCCUPANT DETAILS";
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
          contact: "094452492469"
        },
        {
          roomFloor: 1,
          roomName: "1AFloor",
          roomOccupant: "Hannah Mae",
          email: "c@gmail.com",
          contact: "094452492469"
        },
        {
          roomFloor: 1,
          roomName: "1BFloor",
          roomOccupant: "Marion Jay",
          email: "c@gmail.com",
          contact: "094452492469"
        }
      ];
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