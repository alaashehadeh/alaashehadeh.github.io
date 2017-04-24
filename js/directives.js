compucorp.directive('animateSearch', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            //check start search
            scope.$watch('searchStart', function (data) {
                if (data) {
                    if (scope.page == -1) {
                        //remove static content
                        $('.result-container').css('background-image', 'none');
                        $('.result-container').css('height', '60vh');
                        $('.message').css('display', 'block');
                        $('.message').css('margin-top', '20vh');

                        //add animation
                        $('.message').html('<i class="fa fa-spinner fa-spin fa-5x"></i>');
                    }
                    else {
                        scope.loadPage = true;
                    }
                }
            });

            //show search result
            scope.$watch('showContent', function (data) {
                if (data) {
                    $('.message').css('display', 'none');
                    $('.result-container').css('height', 'auto');
                }
            });
        }
    }
});

compucorp.directive('modal', function (search) {
    return {
        restrict: 'AE',
        scope: {
            index: '='
        },
        link: function (scope, elem) {
            elem.bind('click', function () {
                data = scope.$parent.output[scope.index].content;
                image = data.images[0].url;
                name = data.name;

                //get the artist albums
                if (data.type == 'artist') {
                    counter = 0;
                    $('body').prepend('<!-- modal --> <div class="modal"> </div> <div class="modalBody"> <!-- cover section --> <div class="cover"> <div class="close"><img src="Images/Cross@2x.png" onclick="$(\'.modal\').remove(),$(\'.modalBody\').remove()" /> </div> <img src="' + image + '" /> <div class="artist">' + name + '</div> </div><div id="article"></div>');
                    text = '';
                    search.artistAlbums(data.id).then(function successCallback(response) {
                        data = response.data.items;
                        id = '';
                        for (key in data) {
                            //get the album data
                            if (id == '')
                                id = data[key].id;
                            else
                                id = id + ',' + data[key].id;
                        }
                        search.albumInfo(id).then(function successCallback(r) {
                            d = r.data.albums;
                            for (k in d) {
                                var date = new Date(d[k].release_date);
                                var year = date.getFullYear();

                                text = text + '<!-- albums section --> <div class="albums-info"><div class="other-albums"> <div class="other-cover"> <img src="' + d[k].images[1].url + '"> </div> <div class="other-info"> <div class="other-title">' + d[k].name + '</div><div class="other-year">' + year + '</div></div></div></div>';
                            }

                            text = text + '</div></div>';
                            $('#article').append(text);
                            $('.modalBody').css('top', window.pageYOffset + 20 + 'px');
                        });
                    });
                }
            });
        }
    }
});