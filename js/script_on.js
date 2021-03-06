//mouse events for the silly numbers
$(document).on('mouseenter', '.image', function () {
    $(this).height("64px");
    $(this).width("64px");
});
$(document).on('mouseleave', '.image', function () {
    $(this).height("32px");
    $(this).width("32px");
});

$(document).on('click', '#sidebar h3', function () {
    //collapse_search();
    $('.search_criteria').hide("explode");
    //$('.search_results').show();
});

$(document).on('mouseenter', '#filters li', function () {
    showMenu($(this));
});
$(document).on('click', '#filters li', function () {
    showMenu($(this));
});

//collapsable button click event
$(document).on('click', '.collapsable button', function () {
    collapse_search(); //calls collapse_search(). this function might get used somewhere else too.
});

//classic x button with a twist
$(document).on('click', '.xplode', function () {
    $(this).parent().hide("explode", { pieces: 36 });
});

//when you click on the name text in the results, this happens
$(document).on('click', '.result_name', function () {
    var $this = $(this);
    var marker = $.grep(myFutureHS.map.overlays, function (pin) {
        return pin.get('unico') == $this.parent().attr('class');
    });
    console.log(marker);
    myFutureHS.map.popPin(marker[0], '.mapPins');
    //$("#map").fadeTo('slow',0.1); //fades the map for no really good reason
});

$(document).on('change', '#myPlace :text', function () {
    var addy = $('#myPlace :text').val();
    if (addy == "") {
        myFutureHS.map.updateMyPlace(null);
        $("#txtRadius").hide();
        $('#getGeo').attr('checked', false);
    }
    else {
        $("#txtRadius").show();
        myFutureHS.map.geocoder.geocode({
            'address': addy
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //map.setCenter(results[0].geometry.location);
                myFutureHS.map.updateMyPlace(results[0].geometry.location);
            }
        });
    }
});

$(document).on('change', '#getGeo', function () {
    var getGeo = $(this);
    if (getGeo.is(':checked')) {
        if (myFutureHS.map.currentLocation() == -1) {
            alert("Current location not supported on your browser or device");
            getGeo.attr('checked', false);
        }
        else {
            $('#myPlace :text').val("Current Location");
            $("#txtRadius").show();
        }
    }
    else {
        myFutureHS.map.updateMyPlace(null);
        $('#myPlace :text').val("");
        $("#txtRadius").hide();
    }
});