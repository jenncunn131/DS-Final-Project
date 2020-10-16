var myApp = new Vue({
  //points to a CSS selector
  el: '#certProfile',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    certifications: [{
      certificationName:'',
      defaultExpPeriod:'',
      certifyingAgency:''

    }],

    newCert:{
      certificationName:'',
      defaultExpPeriod:'',
      certifyingAgency:''
    }

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
    this.fetchCertifications();

  },

  methods: {
      // fetchUser: function(){
      fetchCertifications(){
      console.log("reaced here");
      fetch('api/certifications/viewCert.php')
      .then(response => response.json())
      .then(data => {
        this.certifications = data;
        console.log(this.certifications);
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
    addCertification() {
     // evt.preventDefault();  // Redundant w/ Vue's submit.prevent

     // TODO: Validate the data!

     fetch('api/certifications/addcert.php', {
       method:'POST',
       body: JSON.stringify(this.newCert),
       headers: {
         "Content-Type": "application/json; charset=utf-8"
       }
     })
     .then( response => response.json() )
     .then( json => {
       console.log("Returned from post:", json);
       // TODO: test a result was returned!
       this.certifications.push(json[0]);
       this.newCert = this.newCertData();
     });

     console.log("Creating (POSTing)...!");
     console.log(this.newCert);
   },


    formatDate(d){
      //pass a date to the function
      return moment(d).format("MMMM Do YYYY");

    }
  }
})
