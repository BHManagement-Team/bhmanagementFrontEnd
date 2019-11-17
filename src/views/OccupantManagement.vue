<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="desserts" sort-by="roomName" class="elevation-1" id="table">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Occupant Management</v-toolbar-title>
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
                          <v-text-field v-model="editedItem.roomOccupant" label="Room Occupant"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" outlined color="error"  @click="close()">Cancel</v-btn>
                    <v-btn class="ma-2" outlined color="success"  @click="save()">Save</v-btn>
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
            <v-btn color="primary" @click="initialize">Reset</v-btn>
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
export default{
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Room Floor',
        align: 'left',
        value: 'roomFloor',
      },
      { text: 'Room Name', value: 'roomName' ,sortable: false },
      { text: 'Occupant(s)', value: 'roomOccupant',sortable: false },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      roomFloor: 1,
      roomName: '',
      roomOccupant :''
    },
    defaultItem: {
      roomFloor: 0,
      roomName: '',
     roomOccupant :''
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'ADD DETAILS' : 'UPDATE DETAILS'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.desserts = [
        {
          roomFloor: 2,
          roomName: '2CFloor',
          roomOccupant:'Chilla Jean'
        },
        {
          roomFloor: 1,
          roomName: '1AFloor',
          roomOccupant:'Hannah Mae'
        },
        {
          roomFloor: 1,
          roomName: '1BFloor',
          roomOccupant:'Marion Jay'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>