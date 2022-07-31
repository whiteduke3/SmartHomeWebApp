<template>
  <div id="users" class="py-2">
    <div class="row justify-content-center">
      <div class="bg-light col-10">
        <b-table striped hover
                 :items="users"
                 :fields="fields"
                 @row-clicked="display"
                 class="text-dark"
        >
          <template v-slot:cell(permissionLvl)="cell">{{lvlNames[cell.value]}}</template>
          <template v-slot:cell(groupId)="cell">{{groupNames[cell.value]}}</template>
        </b-table>
      </div>  
    </div>    
        
    <div class="form-group row justify-content-center mt-3">
      <label class="col-2 col-form-label text-left" for="uname">Ime</label>
      <div class="col-6">
        <b-form-input id="uname" type="text" v-model="uname"></b-form-input>
      </div>
    </div>

    <div class="form-group row justify-content-center">
      <label class="col-2 col-form-label text-left" for="pword">Geslo</label>
      <div class="col-6">
        <b-form-input id="pword" type="password" v-model="pword" :state=passState></b-form-input>
      </div>
    </div>

    <div class="form-group row justify-content-center">
      <span class="col-2 col-form-label text-left">Pravice</span>
      <b-dropdown :text="lvlNames[lvl]" class="col-6" variant="primary">
        <b-dropdown-item-button v-for="(text, index) in lvlNames" @click="lvl=index" :key="index">{{text}}</b-dropdown-item-button>
      </b-dropdown>
    </div>

    <div class="form-group row justify-content-center">
      <span class="col-2 col-form-label text-left">Skupina</span>
      <b-dropdown :text="groupNames[groupId]" class="col-6" variant="primary">
        <b-dropdown-item-button v-for="(text, index) in groupNames" @click="groupId=index" :key="index">{{text}}</b-dropdown-item-button>
      </b-dropdown>
    </div>



    <!-- <div class="row justify-content-center">
      <div class="col-10">
        <areas-settings v-model="areas"></areas-settings>
      </div>
    </div>  -->

    <div class="pt-5">
      <div v-if='success==1'>
          <font color='green'>shranjeno</font>
      </div>
      <div v-else-if='success==2'>
          <font color='#d9534f'>napaka, preveri vpisane podatke</font>
      </div>
      <b-button size="sm" variant="primary" class="mx-1" @click="save()">Shrani</b-button>
      <b-button size="sm" variant="primary" class="mx-1" @click="del()">Odstrani</b-button>
    </div>  
  </div>
</template>

<script>
// import areasSettings from './PermissionAreasSettings.vue'
import Comm from "../../../modules/rest/restCommunication";
import navigation from "../../../modules/navigation/navigation";

export default {
  data () {
    return {
      lvlNames:["gost","uporabnik","serviser", "administrator"],
      groupNames:navigation.groups,
      users:[] ,
      fields:[ 
        {key:"username", label: 'Ime', 'class': 'text-left' },
        {key:"permissionLvl", label: 'Pravice', 'class': 'text-left' },
        {key:"groupId", label: 'Skupina', 'class': 'text-left' },
      ],
      index: null,
      uname: '',
      pword: '',
      lvl:0,
      groupId:0,
      success:0,
      passState:null,
    }
  },
  methods: {
    display(item, index) {
      this.changeSelectedRow(index);
      this.fillUserData(item);
    },

    fillUserData(user){
      this.uname = user.username;
      this.lvl = user.permissionLvl;
      this.groupId = user.groupId;
    },

    emptyUserData(){
      this.uname = '';
      this.pword = '';
      this.lvl = 0;
      this.groupId =0;
    },

    async del() {
      await Comm.post('/users/delete/', this.uname);
      this.index=null;
      this.emptyUserData();
      this.getUsers();
    },
    async save() {
      if (this.pword.length==0){
        this.passState=false;
        this.success = 2;
      }else{
        this.passState=null;
        var req = {username: this.uname, password: this.pword, gsm: "", mail: "", smsReminder: 0, mailReminder: 0, permissionLvl: this.lvl, groupId:this.groupId};
        var res = await Comm.post('/users/save/',req);
        if (res=='true'){
          this.success = 1; 
          this.emptyUserData();
        }else{
          this.success = 2;
        }

        this.getUsers();
      }
    },

    changeSelectedRow(index){
      this.success = 0; 
      if(this.index!=null){
        this.users[this.index]._rowVariant='';
      }
      this.index = index;
      this.users[index]._rowVariant='active';
    },


    async getUsers(){
      this.users = await Comm.get('/users/get/');
      // console.log(this.users);
    },
  },
 

  mounted:function () {
    this.getUsers();
  },
  // components:{
  //   'areas-settings':areasSettings
  // }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>