compucorp.service('search', ['$http', function ($http) {
    this.baseUrl = 'https://api.spotify.com/v1/';
    this.limit = 6;
    this.page = -1;
    this.albumsNo = 3;
    this.offset = (this.page * this.limit) + this.limit;
    this.searchByAlbum = function (album, page, limit) {
        offset = (page * limit) + limit;
        return $http.get(this.baseUrl + 'search?q=' + album + '&type=artist,album&offset=' + offset + '&limit=' + limit);
    }
    this.artistAlbums = function (id) {
        return $http.get(this.baseUrl + 'artists/' + id + '/albums?limit=' + this.albumsNo);
    }
    this.albumInfo = function (ids) {
        return $http.get('https://api.spotify.com/v1/albums/?ids=' + ids);
    }
}]);