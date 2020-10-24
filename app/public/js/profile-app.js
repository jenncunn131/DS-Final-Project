var myApp = new Vue({
  //points to a CSS selector
  el: '#userProfile',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    users: [{
      personID:'',
      fname:'',
      lname:'',
      mobilePhone:'',
      homePhone:'',
      stationNum:'',
      IsActive:'',
      email:'',
      position:'',
      gender:'',
      radioNum:'',
      street:'',
      city:'',
      state:'',
      zip:''

    }],
    activeUser:{},
    //console.log(this.activeUser),
    newUser:{
      fname:'',
      lname:'',
      position:'',
      radioNum:'',
      stationNum:'',
      email:''
    }

  },
  //created is the first thing browser recognizes when you launch application
  created(){
    this.fetchUser();


  },


  methods: {
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
    addPerson() {
     // evt.preventDefault();  // Redundant w/ Vue's submit.prevent

     // TODO: Validate the data!

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
     console.log(this.users);

   },


    formatDate(d){
      //pass a date to the function
      return moment(d).format("MMMM Do YYYY");

    }

  }
})
