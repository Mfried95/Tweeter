/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const $article = $("<article>").addClass("tweet-container");
    const $tweetData = $(`
      <section class="new-tweets-section">
        <article id="tweet">
          <header class="new-header">
            <img src="${tweet.user.avatars}" class="avatar" />
            ${tweet.user.name}
            <span>${tweet.user.handle}</span>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <span class="time-ago">${timeago.format(tweet.created_at)}</span>
            <div class="actions">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
      </section>
    `);

    $article.append($tweetData);

    return $article;
  };

  const renderTweets = function (tweets) {
    // clear existing tweets from the DOM
    $(".tweets-section").empty();

    // loop through each tweet
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweets-section").prepend($tweet);
    }
  };

  const addPost = (event) => {
    event.preventDefault(); // prevent the default submit
    const tweetLength = $("#tweet-text").val().length;
    const $error = $("#error-message").css("color", "red");
  
    if (tweetLength <= 140) {
      if (tweetLength === 0) {
        $error.text("Error: tweet cannot be empty!");
        $error.removeClass("hidden");
        return;
      }
      const formData = $(event.target).serialize();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: formData,
        success: function () {
          $error.empty();
          $(event.target).find("textarea").val("");
          $(event.target).find(".counter").text("140");
          loadtweets();
        },
        error: function () {
          $error.text("There is an error");
        },
      });
    } else {
      $error.text("Error: tweet is too long!");
      $error.removeClass("hidden");
      return;
    }
  };

  const loadtweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (error) {
        console.log(error);
      },
    });
  };

  loadtweets();
  $("form").submit(addPost);
});
