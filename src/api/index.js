
//封装的简易fetch
//post
function myfetchPost(url='',data=''){
    return fetch(url,{
        method:'post',
        headers:{'content-type':'application/x-www-form-urlencoded'},
        body:data
    })
    .then(body=>body.json())
}
//get
function myfetchGet(url){
    return fetch(url)
            .then(body=>body.json())
}
//搜索相关接口
//1,获取热门搜索
export const getHotSearchApi=function(){
    return myfetchGet('http://106.12.79.128:666/search/hot')
}
//2，获取搜索建议(下拉列表)
export const getSearchSuggestApi=function(keywords){
    return myfetchGet(`http://106.12.79.128:666/search/suggest?keywords=${keywords}&type=mobile`)
}
//3，根据关键词搜索专辑、mv、歌手
export const getSearchResultApi=function(keywords){
    return myfetchGet(` http://106.12.79.128:666/search/multimatch?keywords=${keywords}`)
}
//4，根据关键词搜索获取（该关键词:mv，歌手，歌曲名）相关的歌曲
export const getSearchSongsApi=function(keywords){
    return myfetchGet(`http://106.12.79.128:666/search?keywords=${keywords}`)
}
//5，获取音乐播放
export const getMusicPlayerApi=function(id){
    return myfetchGet(`http://106.12.79.128:666/song/url?id=${id}`)
}
//6，获取歌曲详情
export const getMusicDetailApi=function(id){
    return myfetchGet(`http://106.12.79.128:666/song/detail?ids=${id}`)
}
