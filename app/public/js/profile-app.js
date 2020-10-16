var myApp = new Vue({
  //points to a CSS selector
  el: '#userProfile',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    users: [{
      // fname:'',
      // lname:'',
      // mobilePhone:'',
      // homePhone:'',
      // stationNum:'',
      // IsActive:'',
      // email:'',
      // position:'',
      // gender:'',
      // radioNum:'',
      // street:'',
      // city:'',
      // state:'',
      // zip:''
      // firstName: '',
      // lastName:'',
      // position:'',
      // radioNume:'',
      // station:'',
      // email:''
    }],
    userData:{}
    // userName:'',
    // userCountry:'',
    // userImgLarge:'',
    // userImgThumb:'',
    // userDob:'',
    // userEmail:'',
    // userAge:'',

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
        // this.users = data.results[0];
        // // var userData = data.results[0];
        // // console.log(json);
        // console.log("RECHDHER");
        // console.log(this.users);
        // this.userName = userData.name.first + " " + userData.name.last;
        // this.userEmail = userData.email;
        // this.userImgLarge = userData.picture.large;
        // this.userImgThumb = userData.picture.thumbnail;
        // this.userDob = userData.dob.date;
        // this.userAge = userData.dob.age;
        // this.userCountry = userData.location.country;

      });
    },


    formatDate(d){
      //pass a date to the function
      return moment(d).format("MMMM Do YYYY");

    }
  }
})
