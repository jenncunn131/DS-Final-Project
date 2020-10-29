var myApp = new Vue({
  //points to a CSS selector
  el: '#userProfile',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    users: [
  ],
    activeUser:null,
    //console.log(this.activeUser),
    newUser:{
      fname:'',
      lname:'',
      mobilePhone:'',
      stationNum:'',
      email:'',
      position:'',
      radioNum:'',
      street:'',
      city:'',
      state:'',
      zip:''
    }

  },
  //created is the first thing browser recognizes when you launch application
  created(){
    this.fetchUser();


  },


  methods: {
    // newUserData(){
    //   return{
    //     fname:'',
    //     lname:'',
    //     position:'',
    //     radioNum:'',
    //     stationNum:'',
    //     email:''
    //   }
    // },
      // fetchUser: function(){
      fetchUser(){
      console.log("reaced here");
      fetch('api/people/index.php')
      .then(response => response.json())
      .then(data => {
        this.users = data;
        console.log(this.users);

      });
    },
    editPerson(){
      fetch('api/people/editppl.php', {
      method:'POST',
      body: JSON.stringify(this.activeUser),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then( response => response.json() )
    .then( json => {
      console.log("Returned from post:", json);
      // TODO: test a result was returned!
      this.users.push(json[0]);
      this.activeUser = this.activeUserData();
    });

    console.log("Creating (POSTing)...!");
    console.log(this.activeUser);
    },

    addPerson() {
     // evt.preventDefault();  // Redundant w/ Vue's submit.prevent

     // TODO: Validate the data!
     //
     fetch('api/people/addppl.php', {
       method:'POST',
       body: JSON.stringify(this.newUser),
       headers: {
         "Content-Type": "application/json; charset=utf-8"
       }
     })
     .then( response => response.json() )
     .then( json => {
       console.log("Returned from post:", json);
       // TODO: test a result was returned!
       this.users.push(json[0]);
       this.newUser = this.newUserData();
     });

     console.log("Creating (POSTing)...!");
     console.log(this.newUser);
     // console.log(this.users);
     // console.log('fname:'+this.newUser.fname);
   },


    formatDate(d){
      //pass a date to the function
      return moment(d).format("MMMM Do YYYY");

    }

  }
})
