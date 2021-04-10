$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });

/***************************************
 * Admin Add Activity button
 ****************************************/
function postAddActivity(theToken) {
    const aName = $('#title').val();
    const aDesc = $('#description').val();
    const myToken = theToken;
    const myUrl = "/admin/add-activity";

    console.log('Params' + aName, aDesc)

    $.ajax({
        url: myUrl,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            title: aName,
            description: aDesc,
            _csrf: myToken
        }),
        success: function (result) {
            
            $('#closeModal').trigger("click")
            location.reload();
            
            console.log('Results: ' + result)
        }, error: function (err) {
            console.log(err);
        }
    });
};


/***************************************
 * Admin Edit Activity button
 ****************************************/
function getEditActivity(actId, theToken) {
    const activityId = actId;
    const myToken = theToken;
    const myUrl = "/admin/edit-activity/" + activityId;

    $.ajax({
        url: myUrl,
        type: 'GET',
        contentType: "application/json",
        data: JSON.stringify({
            activityId: activityId,
            _csrf: myToken
        }),
        success: function (activity) {

            $('#myModal2').html('<div class="modal-dialog">'
            + '<div class="modal-content"><div class="modal-header"><h4>Edit Activity</h4>'
            + '<button type="button" class="close" id="closeModal" data-dismiss="modal">&times;</button>'
            + '</div><div class="modal-body">'
            + '<form action="/admin/edit-activity" method="POST"><div class="form-group">'
            + '<label for="title">Name of activity</label>'
            + '<input name="title" type="text" class="form-control" id="title"'
            + 'value="' + activity.title + '" placeholder="Activity name"></div><div class="form-group">'
            + '<label for="description">Description</label>'
            + '<textarea name="description" type="text" class="form-control" id="description"'
            + 'placeholder="Description">' + activity.description + '</textarea></div>'
            + '<input type="hidden" name="_csrf" value="' + myToken + '">'
            + '<input type="hidden" value="' + activity._id + '" name="activityId">'
            + '<button type="submit" class="btn btn-success">Update</button>'
            + '</form></div><div class="modal-footer">'
            + '<button type="submit" class="btn btn-danger btn-default pull-left"'
            + 'data-dismiss="modal">Cancel</button></div></div></div>');

            
            $('#myModal2div').trigger("click")

            // console.log('Results: ' + activity.description)
        }, error: function (err) {
            console.log(err);
        }
    });
};


/***************************************
 * Admin Delete user button
 ****************************************/
function deleteUser(theUserId) {
    let myToken = $('#my_OldToken').val();
    const userId = theUserId;

    //Then show popup to get user confirmation
    swal({
        title: "Confirm?",
        text: "This action can't be undone. Continue?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, submit!",
        cancelButtonText: "No, cancel!",
        closeOnConfirm: false,
        closeOnCancel: false
    }).then(
        //If user confirms action
        function (isConfirm) {
            if (isConfirm) {
                //Make an ajax request to the server to create the week object
                $.ajax({
                    url: "/admin/deleteUser/" + userId,
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify({
                        userId: userId,
                        _csrf: myToken
                    }),
                    success: function (data) {
                        //Show this if the week object has been created
                        swal("Deleted!", "The user has been deleted.", "success");
                        location.reload();

                    },
                    error: function (data) {
                        //Show this if there is an error
                        swal("NOT Deleted!", "Something blew up. Sorry", "error");
                    }
                });
            } else {
                //Show this if the user withdraws
                swal("Cancelled", "The user was not deleted.", "error");
            }
        });
    return false
}