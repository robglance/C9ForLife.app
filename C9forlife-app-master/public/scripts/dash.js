/***************************************
 * User adding activity to bucket
 ****************************************/
function addToBucket(actId) {
    console.log('Act Id: ' + actId);
    const activityId = actId;
    let myToken = $('#myToken').val();
    let myUrl = "/mad/bucket";

    $.ajax({
        url: myUrl,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            activityId: activityId,
            _csrf: myToken
        }),
        success: function (result) {
            $('.alert').css('display', 'block')
            $('.alert').html('<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>'
            + '<strong>Success!!</strong> Activity successfully added to you Activities');
            console.log('Results: ' + result)
        }, error: function (err) {
            console.log(err);
        }
    });
};

/***************************************
 * User sending Activity idea to admin
 ****************************************/
function sendIdea(uEmail, theToken) {
    const iName = $('#ideaName').val();
    const iDesc = $('#ideaDesc').val();
    const userEmail = uEmail;
    const myToken = theToken;
    const myUrl = "/mad/user-idea";

    $.ajax({
        url: myUrl,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            userEmail: userEmail,
            ideaName: iName,
            ideaDesc: iDesc,
            _csrf: myToken
        }),
        success: function (result) {
            
            $('#closeModal').trigger("click")

            $('.alert').css('display', 'block')
            $('.alert').html('<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>'
            + '<strong>Success!!</strong> Your idea was successfully submitted');
            console.log('Results: ' + result)
        }, error: function (err) {
            console.log(err);
        }
    });
};