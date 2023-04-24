$(document).ready(function () {
  $("textarea").on("input", function () {
    let remainingChars = 140 - $(this).val().length;
    $(".counter").text(remainingChars);

    if (remainingChars < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });
});
