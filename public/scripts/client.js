/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  createdAt: 1461116232227,
};

const render = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    createdAt: 1682359985490,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    createdAt: 1682446385490,
  },
];

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
      <header>
        <img src="${tweet.user.avatars}" />
        <h3>${tweet.user.name}</h3>
        <span>${tweet.user.handle}</span>
      </header>
      <div class="tweet-content">
        <p>${tweet.content.text}</p>
      </div>
      <footer>
        <span class="current-time">${getCurrentDateTime()}</span>
        <div class="actions">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
  `);
  const checking = $article.append($tweetData);

  return checking;
};

$(document).ready(() => {
  // const $tweets = createTweetElement(tweetData);
  // $(".tweets-section").append($tweets);
  renderTweets(render);
});

const renderTweets = function(tweets) {
  // loop through each tweet
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(".tweets-section").append($tweet);
  }
};
