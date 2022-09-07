function url_content(url)
{
    var content;
    $.get(url,function( data ) {content=data});
    return content;
}

var data = url_content("https://docs.google.com/spreadsheets/d/e/2PACX-1vTsK0lm1HAbiFKcgAxfTXvOu2mf91fsiRoW9TSr7jhaRvUYIJR7-ccjas4eecfTlsHeW0MGMxA2N792/pubhtml");
console.log(url_content())
