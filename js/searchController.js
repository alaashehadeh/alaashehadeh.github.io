compucorp.controller('searchController', ['$scope', 'search', function ($scope, search) {
    $scope.next = false;
    $scope.limit = 6;
    $scope.page = -1;
    $scope.loadPage = false;
    $scope.nextLoader = false;

    //output result
    $scope.output = new Array();

    $scope.search = function (start) {
        $scope.nextLoader = true;
        if (start) {
            $scope.page = -1;
            $scope.output = new Array();
        }

        $scope.next = false;

        //change search status
        $scope.searchStart = true;
        $scope.showContent = false;

        //search for album
        search.searchByAlbum($scope.keyword, $scope.page, $scope.limit).then(function successCallback(response) {
            $scope.searchStart = false;
            $scope.nextLoader = false;
            for (i = 0; i < search.limit; i++) {
                //add album items
                if (response.data.albums.items[i]) {
                    add = {type: 'albums', content: response.data.albums.items[i],number: i};
                    $scope.output.push(add);
                }
                //add artist items
                if (response.data.artists.items[i]) {
                    add = {type: 'artists', content: response.data.artists.items[i],number: i};
                    $scope.output.push(add);
                }
            }

            //check next page
            if (response.data.albums.next && response.data.artists.next) {
                $scope.next = true;

                //set next page
                $scope.page++;
            }
            else
                $scope.next = false;


            $scope.searchStart = false;
            $scope.showContent = true;
        });
    };

}])
;