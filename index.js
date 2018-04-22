$(function () {
    let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAigkWqLG3LBI_oOdfvoxy3LXXfiDCzqC8 " +
    "&part=snippet" +
    "&q=";
    $("#search-button").on("click", getYoutube)
    function getYoutube(){
let query = $("#query").val();
let container = $("#search-container").empty();
if (query === ""){
    $("#query").addClass("error");
}
else {
    $("#query").removeClass("error");
    $.ajax({
        url: url + query,
        type: "get",
        datatype: "json",
    })
        .done(
            (result) => 
        {
            console.log(result);
            
            result.items.forEach(
                (item) => {
                    let src = item.snippet.thumbnails.default.url;
                    let id = item.id.videoId;
                    let title = item.snippet.title;
                    let img = $("<div> <h3> "+ title + "</h3> </div> <a href= https://www.youtube.com/watch?v="+id+ "target='_blank'> <img src='"+src+"'/></a>");
                    container.append(img);
                    console.log(item)
                }
            )

     
            }
        )
        .fail();
    }
}
});


