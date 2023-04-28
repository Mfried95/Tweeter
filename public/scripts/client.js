/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(() => {
  const getCurrentDateTime = function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTimeString;
  };

  const createTweetElement = function(tweet) {
    const $article = $(`<article>`).addClass("tweet-container");
    const $tweetData = $(`
    <section>
    <article id="tweet">
      <header class="new-header">
      <img src="${tweet.user.avatars}" class="avatar" />
        ${tweet.user.name}
        <span>${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
      <span class="current-time">${getCurrentDateTime()}</span>
        <div class="actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  </section>
  `);
    const checking = $article.append($tweetData);

    return checking;
  };

  const renderTweets = function(tweets) {
    // clear existing tweets from the DOM
    $(".tweets-section").empty();

    // loop through each tweet
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweets-section").append($tweet);
    }
  };

  const addPost = (event) => {
    event.preventDefault(); // prevent the default submit
    const tweetLength = $('#tweet-text').val().length;
    const $error = $("#error-message").css("color", "red");

    // check the length of the tweet content
    if (tweetLength < 140) {
      // serialize the form data
      const formData = $(event.target).serialize();

      // AJAX request
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: formData,
        success: function() {
          // clear the form input and reload the tweets
          $(event.target).find("textarea").val("");
          loadtweets();
        },
        function(error) {
          console.log(error);
        },
      });
    } else {
      $error.text('Error: tweet is too long!');
      $error.color('red');
      $error.removeClass('hidden');
      return;
    }
  };

  const loadtweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(error) {
        console.log(error);
      },
    });
  };

  // const $tweets = createTweetElement(tweetData);
  // $(".tweets-section").append($tweets);
  loadtweets();
  $("form").submit(addPost);
});
