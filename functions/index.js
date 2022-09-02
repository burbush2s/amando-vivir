
const functions = require("firebase-functions");
var admin = require("firebase-admin");
admin.initializeApp();
var db = admin.database();

exports.expresion = functions.https.onRequest(async(req, res) => {
  
  const ref = db.ref('blog/secciones/expresion');
  var expresion;
  
  await ref.once('value', (snapshot) => {
    expresion = snapshot.val();
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  res.status(200).send(`<!doctype html>
    <head>
      <title>Portafolio</title>
      <link rel="stylesheet" href="css/style.css">
      <script src="js/main.js"></script>
    </head>
    <div id="portfolio">
  <div class="container">
    <div class="section-title text-center center">
      <div class="categories">
        <ul class="cat">
          <li>
            <ol class="type">
              <li><a href="/blog" data-filter="*" class="active">Inicio</a></li>
              </ol>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <h2>`+expresion.titulo+`</h2>
      <hr>
      <p>`+expresion.descripcion+`</p>
      
    </div>
    
    <div class="row">
      <div class="portfolio-items center">
      <video width="704" height="396" controls>
        <source src="`+expresion.url+`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      </div>
    </div>
  </div>
</div>
  </html>`);
});


exports.blogEntry = functions.https.onRequest(async (req, res) => {
  const ref = db.ref('blog/posts/nuevo');
  var post;
  
  await ref.once('value', (snapshot) => {
    post = snapshot.val();
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  }); 
  res.status(200).send(`<!doctype html>
    <head>
      <title>Nuevo blog</title>
      <link rel="stylesheet" href="css/style.css">
      <script src="js/main.js"></script>
    </head>
    <div id="blog">
      <div class="container">
          <div class="categories">
          <ul class="cat">
            <li>
              <ol class="type">
                <li><a href="/blog" data-filter="*" class="active">Inicio</a></li>
                </ol>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="section-title center">
          <h2>Blog</h2>
          <hr>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <div class="about-text center">
                <p>`+post.titulo+`</p>
              </div>
              <div class="about-text">
                <p>`+post.contenido+`
              </div>
                </p>
                
            </div>
          </div>

        </div>
      </div>
    </div>
  </html>`);
});



