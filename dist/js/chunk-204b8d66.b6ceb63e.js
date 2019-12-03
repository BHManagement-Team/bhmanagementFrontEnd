(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-204b8d66"],{"2b56":function(t,e,o){"use strict";var a=o("6f54"),i=o.n(a);i.a},"6f54":function(t,e,o){},7277:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-row",[o("v-col",[o("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.room,"sort-by":"roomName",id:"table",search:t.search},scopedSlots:t._u([{key:"top",fn:function(){return[o("v-toolbar",{attrs:{flat:"",color:"white"}},[o("v-toolbar-title",[t._v("Room Management")]),o("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),o("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),o("v-spacer"),o("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},a),[t._v("New Item")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-card",[o("v-card-title",[o("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),o("v-card-text",[o("v-container",[o("v-row",[o("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[o("v-text-field",{attrs:{label:"Room Floor"},model:{value:t.editedItem.roomFloor,callback:function(e){t.$set(t.editedItem,"roomFloor",e)},expression:"editedItem.roomFloor"}})],1),o("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[o("v-text-field",{attrs:{label:"Room Name"},model:{value:t.editedItem.roomName,callback:function(e){t.$set(t.editedItem,"roomName",e)},expression:"editedItem.roomName"}})],1),o("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[o("v-text-field",{attrs:{label:"Room Capacity"},model:{value:t.editedItem.roomCapacity,callback:function(e){t.$set(t.editedItem,"roomCapacity",e)},expression:"editedItem.roomCapacity"}})],1),o("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[o("v-text-field",{attrs:{label:"Rent Price"},model:{value:t.editedItem.rentPrice,callback:function(e){t.$set(t.editedItem,"rentPrice",e)},expression:"editedItem.rentPrice"}})],1)],1)],1)],1),o("v-card-actions",[o("v-spacer"),o("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"error"},on:{click:function(e){return t.close()}}},[t._v("Cancel")]),o("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"success"},on:{click:t.save}},[t._v("Save")])],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(e){var a=e.item;return[o("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(a)}}},[t._v("mdi-pencil")]),o("v-icon",{attrs:{small:""},on:{click:function(e){return t.openDialog(a.number)}}},[t._v("mdi-delete")])]}},{key:"no-data",fn:function(){return[o("v-btn",{attrs:{color:"primary"}},[t._v("Reset")])]},proxy:!0}])})],1)],1),o("v-dialog",{attrs:{"max-width":"500px",id:"confirm"},model:{value:t.confirm,callback:function(e){t.confirm=e},expression:"confirm"}},[o("v-card",[o("v-card-title",[o("span",{staticClass:"headline"},[t._v("Are you sure you want to delete this room?")])]),o("v-card-actions",[o("v-spacer"),o("br"),o("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"error"},on:{click:function(e){return t.close()}}},[t._v("Cancel")]),o("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"success"},on:{click:function(e){return t.deleteItem(t.currentId)}}},[t._v("Yes")])],1)],1)],1)],1)},i=[],r=(o("c975"),o("a434"),o("2fa7")),n=o("bc3a"),c=o.n(n);function l(){var t=[];return c.a.post("http://localhost:3000/bhm/retrieveAllRooms",{token:localStorage.token}).then((function(e){console.log(e);var o=e.data.data,a=0;for(a;a<o.length;a++)t.push({number:o[a]._id,roomFloor:o[a].room_floor,roomName:o[a].room_name,roomCapacity:o[a].room_capacity,rentPrice:o[a].room_price})})).catch((function(t){console.log(t)})),t}var s={data:function(){var t;return t={search:"",confirm:!1,dialog:!1,currentId:null},Object(r["a"])(t,"dialog",!1),Object(r["a"])(t,"headers",[{text:"Room Floor",align:"left",value:"roomFloor"},{text:"Room Name",value:"roomName",sortable:!1},{text:"Room Capacity",value:"roomCapacity",sortable:!1},{text:"Rent Price",value:"rentPrice"},{text:"Actions",value:"action",sortable:!1}]),Object(r["a"])(t,"room",[]),Object(r["a"])(t,"editedIndex",-1),Object(r["a"])(t,"editedItem",{number:"",roomFloor:1,roomName:"",roomCapacity:0,rentPrice:0}),t},computed:{formTitle:function(){return-1===this.editedIndex?"Add Room Details":"Update Existing Room Details"}},mounted:function(){"null"!=localStorage.token?this.room=l():this.$router.push({path:"/"})},watch:{dialog:function(t){t||this.close()}},methods:{editItem:function(t){this.editedIndex=this.room.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},openDialog:function(t){this.confirm=!0,this.currentId=t},deleteItem:function(t){var e=this,o=this.room.indexOf(t);c.a.post("http://localhost:3000/bhm/deleteRoomByID/"+t,{token:localStorage.token}).then((function(t){console.log(t),e.room.splice(o,1)})).catch((function(t){console.log(t)})),this.confirm=!1},close:function(){var t=this;this.dialog=!1,this.confirm=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},save:function(){this.editedIndex>-1?(Object.assign(this.room[this.editedIndex],this.editedItem),alert("number is "+this.editedItem.number),c.a.post("http://localhost:3000/bhm/updateRoom/"+this.editedItem.number,{id:this.editedItem.number,room_name:this.editedItem.roomName,room_floor:this.editedItem.roomFloor,room_capacity:this.editedItem.roomCapacity,room_price:this.editedItem.rentPrice,token:localStorage.token}).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))):(this.room.push(this.editedItem),c.a.post("http://localhost:3000/bhm/createRoom",{room_name:this.editedItem.roomName,room_floor:this.editedItem.roomFloor,room_capacity:this.editedItem.roomCapacity,room_price:this.editedItem.rentPrice,token:localStorage.token}).then(this.room=l()).catch((function(t){console.log(t)}))),this.close()}}},d=s,m=(o("2b56"),o("2877")),u=o("6544"),h=o.n(u),v=o("8336"),f=o("b0af"),p=o("99d9"),b=o("62ad"),I=o("a523"),x=o("8fea"),g=o("169a"),k=o("ce7e"),_=o("132d"),C=o("0fd9"),y=o("2fa4"),R=o("8654"),V=o("71d9"),w=o("2a7f"),N=Object(m["a"])(d,a,i,!1,null,null,null);e["default"]=N.exports;h()(N,{VBtn:v["a"],VCard:f["a"],VCardActions:p["a"],VCardText:p["b"],VCardTitle:p["c"],VCol:b["a"],VContainer:I["a"],VDataTable:x["a"],VDialog:g["a"],VDivider:k["a"],VIcon:_["a"],VRow:C["a"],VSpacer:y["a"],VTextField:R["a"],VToolbar:V["a"],VToolbarTitle:w["a"]})}}]);
//# sourceMappingURL=chunk-204b8d66.b6ceb63e.js.map