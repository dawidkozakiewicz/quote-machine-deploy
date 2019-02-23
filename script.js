/* dzięki temu nie będę musiał zawieszać strony na github pages, albo gdziekolwiek bo: "This API enables cross-origin requests to anywhere oraz:
 Create a request to <url>, and includes CORS headers in the response." */
var prefix = "https://cors-anywhere.herokuapp.com/"; 

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
  /* pobierze nam losowy cytat za pomocą API */
  $.ajax({
    type: "GET",
    url: prefix + quoteUrl,
    success: createTweet});
  /* aby nasze zapytania się nie cache'owały. */
  $.ajaxSetup({
    cache: false
  });
}

function createTweet(input) {
console.log(input);
  var data = input[0];
/* pod kluczem data.content jest zwykły kod HTML paragrafu. 
Nie jest to format danych, o jaki nam chodzi.
W związku z tym za pomocą jQuery tworzymy element HTML na podstawie HTML z tego klucza,
a następnie wyciągamy z niego zawartość tekstową za pomocą metody .text()
Wykorzystaliśmy też metodę .trim(), która pozwoli nam 'uciąć' niepotrzebne spacje na początku/końcu stringa: */
  var quoteText = $(data.content).text().trim();

  var quoteAuthor = data.title;

  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }

  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
  if (tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
/* jQuery wkleja nam cytat i autora na stronę oraz dokleja do linku całość, żeby mógł się wpisać na twitterze do okienka tweeta: */
    $('.quote').text(quoteText);
    $('.author').text("Author: " + quoteAuthor);
    $('.tweet').attr('href', tweet);
  }
}
/* ładuje zaraz po starcie pierwszy losowy cytat i czeka w pogotowiu, aż naciśniemy button, żeby wylosować następny: */
$(document).ready(function() {
  getQuote();
  $('.trigger').click(function() {
    getQuote();
    console.log('a ku ku');
  });
});
