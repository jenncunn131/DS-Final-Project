var myApp = new Vue({
  //points to a CSS selector
  el: '#reportApp',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    expmembers: [{
      fname:'',
      lname:'',
      expirationDate:'',
      certificationName:''

    }],
    users: [
    //   {
    //
    //   fname:'',
    //   lname:'',
    //   mobilePhone:'',
    //   homePhone:'',
    //   stationNum:'',
    //   IsActive:'',
    //   email:'',
    //   position:'',
    //   gender:'',
    //   radioNum:'',
    //   street:'',
    //   city:'',
    //   state:'',
    //   zip:''
    // }
  ],
  select:{
    expCert:''
  },

  },
  //created is the first thing browser recognizes when you launch application
  created(){
    this.fetchExpMembers();
    this.fetchUser();


  },


  methods: {
      // fetchUser: function(){
      fetchUser(){
      console.log("reaced here");
      fetch('api/reports/allmembers.php')
      .then(response => response.json())
      .then(data => {
        this.users = data;
        console.log(this.users);

      });
    },
    fetchExpMembers() {
     // evt.preventDefault();  // Redundant w/ Vue's submit.prevent

     // TODO: Validate the data!

     console.log("reaced here");
     fetch('api/reports/expmembers.php')
     .then(response => response.json())
     .then(data => {
       this.expmembers = data;
       console.log(this.expmembers);

   });
 },


    formatDate(d){
      //pass a date to the function
      return moment(d).format("MMMM Do YYYY");

    }
  }
})
