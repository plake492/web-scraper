$(".delete").on("click", function() {
  const selected = $(this).attr("data-id");
  $.ajax({
    type: "GET",
    url: "/delete/" + selected
  }).then(function() {
    location.reload();
  });
});

$("#scrape").on("click", function() {
  event.preventDefault();
  console.log("SCRAPE");
  $.ajax({
    type: "GET",
    url: "/scrape"
  }).then(function(data) {
    console.log(data);
    // scrape();
    location.reload();
  });
});

$("#comment").on("click", function() {
  const comment = $("#message-text")
    .val()
    .trim();
  console.log(comment);
  $.ajax({
    type: "POST",
    url: "/post_comment",
    data: {
      comment
    }
  }).then(function(data) {
    location.reload();
  });
});
