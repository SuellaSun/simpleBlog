
function start(req,res) {
  console.log("Request handler 'start' was called.");
  

}
function login(req,res) {
    console.log("Request handler 'blogin' was called.");
  }
  
  function BlogHome(req,res) {
    console.log("Request handler 'upload' was called.");
  }

  // function faultPage(req,res){

  // }
  
  exports.start = start;
  exports.login = login;
  exports.blogHome = blogHome;
  // exports.faultPage = fault404Page;