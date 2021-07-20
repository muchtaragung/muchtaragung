function search_movie() {
    $('#movie-list').html('');
    $.ajax({
        url : 'http://omdbapi.com',
        type : 'get',
        dataType : 'json',
        data : {
            'apikey' : '683c4386',
            's' : $('#search-input').val()
        },
        success : function (result) {
//             console.log(result);
             $("#loading-image").show();
            if (result.Response == "True") {
                let movie = result.Search;

                $.each(movie  , function(i ,data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                    <div class="card mb-3">
                        <img class="card-img-top" src="`+ data.Poster +`" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                            <a href="#" class="card-link see-detail" data-id=`+data.imdbID+` data-toggle="modal" data-target="#exampleModalCenter">See detail</a>
                        </div>
                    </div>
                    </div>
                    `);
                     $("#loading-image").hide();
                });
                $('#search-input').val('');
            }else{
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">`+ result.Error +`</h1>
                </div>
                `);
                 $("#loading-image").hide();
            }
        }
    });
}

$('#search-button').on('click', function() {
    search_movie();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        search_movie();
    }
    
});

$('#movie-list').on('click','.see-detail', function () {
//     console.log($(this).data('id'));
    $.ajax({
        url : 'http://omdbapi.com',
        type : 'get',
        dataType : 'json',
        beforeSend: function() {
            $("#loading-image").show();
         },
        data : {
            'apikey' : '683c4386',
            'i' : $(this).data('id')
        },
        success : function (result) {
            if (result.Response == "True") {
                $('.modal-body').html(`
                
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+result.Poster+`" class="img-fluid" >
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+result.Title+`</h3></li>
                                <li class="list-group-item">`+result.Released+`</li>
                                <li class="list-group-item">`+result.Director+`</li>
                                <li class="list-group-item">`+result.Genre+`</li>
                                <li class="list-group-item">`+result.Actors+`</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `);
                $("#loading-image").hide();
            }
        }
    });
});
