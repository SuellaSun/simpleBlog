function start() {
  console.log("Request handler 'start' was called.");
}
function login() {
    console.log("Request handler 'blogin' was called.");
  }
  
  function BlogHome() {
    console.log("Request handler 'upload' was called.");
  }
  
  exports.login = login;
  exports.blogHome = blogHome;