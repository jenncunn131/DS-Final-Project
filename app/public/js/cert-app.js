var myApp = new Vue({
  //points to a CSS selector
  el: '#certProfile',
  //include all characteristics you want to see on the page under data and initialize elements here
  data: {
    // certifications: [{
    //   certificationName:'',
    //   defaultExpPeriod:'',
    //   certifyingAgency:''
    //
    // }],
    certifications:[],
    activeCert:null,
    select:{
      mem:''
    },
    certDetails:[],

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
    this.showCert();

  },

  methods: {
    newCertData(){
      return{
        certificationName:'',
        certifyingAgency:'',
        defaultExpPeriod:''
      }
    },
    activeCertData(){
      return{
        certificationID:'',
        certificationName:'',
        certifyingAgency:'',
        defaultExpPeriod:''
      }
    },
      // fetchUser: function(){
      fetchCertifications(){
      console.log("reaced here");
      fetch('api/certifications/viewCert.php')
      .then(response => response.json())
      .then(data => {
        this.certifications = data;
        console.log(this.certifications);


      });
    },
    showCert(){
      fetch('api/certifications/showCert.php')
      .then(response => response.json())
      .then(data => {
        this.certDetails = data;
        console.log(this.certDetails);
      });
    },
    editCert(){
      fetch('api/certifications/editCert.php', {
      method:'POST',
      body: JSON.stringify(this.activeCert),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then( response => response.json() )
    .then( json => {
      console.log("Returned from post:", json);
      // TODO: test a result was returned!
      this.certifications.push(json[0]);
      this.activeCert = this.activeCertData();
    });

    console.log("Creating (POSTing)...!");
    console.log(this.activeCert);
    },
    deleteCert(){
      fetch('api/certifications/deleteCert.php', {
      method:'POST',
      body: JSON.stringify(this.activeCert),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then( response => response.json() )
    .then( json => {
      console.log("Returned from post:", json);
      // TODO: test a result was returned!
      this.certifications=json;
      this.activeCert = this.activeCertData();
    });

    console.log("Creating (POSTing)...!");
    console.log(this.activeCert);
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
