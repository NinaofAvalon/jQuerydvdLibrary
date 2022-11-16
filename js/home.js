$(document).ready(function () {
    loadDvds();
    //clearDVDMenu()
    addDvd();
});


function loadDvds() {
    clearDVDTable()
    var contentRows = $('#contentRows');
    
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds',
        success: function(dvdArray) {
            $.each(dvdArray, function(index, dvd){
                var title = dvd.title;
                var releaseYear = dvd.releaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var notes = dvd.notes;
                var dvdId = dvd.dvdId;
                
                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + releaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><button type="button" class="btn btn-info" >Edit</button></td>';
                    row += '<td><button type="button" class="btn btn-info" >Delete</button></td>';
                    row += '</tr>';
                
                contentRows.append(row);
            })
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        }
    }); 
}

function addDvd() {
    $('#createButton').click(function (event) {
        $.ajax({
           type: 'POST',
           url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds',
           data: JSON.stringify({
                title: $('#addDVDTitle').val(),
                releaseYear: $('#addReleaseYear').val(),
                director: $('#addDirector').val(),
                rating: $('#addRating').val(),
                notes: $('#addNotes').val()
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               $('#errorMessages').empty();
               $('#addDVDTitle').val('');
               $('#addReleaseYear').val('');
               $('#addDirector').val('');
               $('#addRating').val('');
               $('#addNotes').val('');
               loadDvds();
           },
           error: function () {
               $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
           }
        })
    });
}

function clearDVDMenu() {
    $('#createButton').on("click", function(){

        $('#dvdTable').hide();
        $('#createButton').hide();

        })

    };

function clearDVDTable() {
    $('#contentRows').empty();
}