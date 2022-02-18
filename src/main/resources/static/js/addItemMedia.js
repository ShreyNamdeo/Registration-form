$('#youtubeVideoUpload').hide();
$('#youtubeVideoUploaded').hide();
$(document).ready(function(){
	var extraObj = $("#fileuploader").uploadFile({
	    url:"/upload/IMAGE/item/"+$("#itemId").val(),
        fileName:"myfile",
        acceptFiles:"image/jpeg , image/jpg",
        showPreview:true,
        maxFileCount:5,
        maxFileSize:1024*1024,
        previewHeight: "100px",
        previewWidth: "100px",
        sequential:true,
        sequentialCount:1,
        autoSubmit:false
	});
	$("#imageUpload").click(function(){
        extraObj.startUpload();
    });

    var uploadedvideoName;
    var extravideoThumbnailObj;
    var extravideoObj = $("#videofileuploader").uploadFile({
	    url:"/upload/VIDEO/item/"+$("#itemId").val(),
        fileName:"myfile",
        multiple:false,
        acceptFiles:"video/mp4",
        showPreview:true,
        maxFileCount:1,
        maxFileSize:1024*1024,
        previewHeight: "200px",
        previewWidth: "200px",
        sequential:true,
        sequentialCount:1,
        autoSubmit:false,
        onSuccess:function(files,data,xhr,pd)
        {
            //files: list of files
            //data: response from server
            //xhr : jquer xhr object
            var res = $.parseJSON(data);
            uploadedvideoName = res.mediaKey;
            //alert("data in var is :"+uploadedvideoName);
            $("#upload-video-box").append("<video controls='controls' preload='metadata' id='videoOnUpload'><source src='"+res.mediaLink+"' type='video/mp4'></video><br><br><a class='buttons btn btn-primary add-media' onclick='shoot()' id='captureScreenShot'><i class='fa fa-camera-retro'></i> Capture Screenshot</a><br><br><div id='output'></div><br><br><span style='color:red'>* Right click to save image and then upload as thumbnail </span> <div id='thumbnailuploader'>Upload thumbanail for video</div><a class='btn btn-primary add-media thumbnailUpload' id='thumbnailUpload'><i class='fa fa-cloud-upload'></i> Upload</a>");
            //<a class='btn btn-round add-media' id='uploadScreenshotButton' onclick='addTumbnailImage(\""+res.mediaKey+"\")' style='display:none;'>Upload Screenshot</a>
            var extravideoThumbnailObj = $("#thumbnailuploader").uploadFile({
                url:"/upload/VIDEO/"+uploadedvideoName+"/thumbnail",
                fileName:"myfile",
                acceptFiles:"image/*",
                showPreview:true,
                multiple:false,
                previewHeight: "100px",
                previewWidth: "100px",
                sequential:true,
                sequentialCount:1,
                autoSubmit:false
            });
            $("#thumbnailUpload").click(function()
            {
                extravideoThumbnailObj.startUpload();
            });
        }
	});
	$("#videoUpload").click(function()
    {
        extravideoObj.startUpload();
    });

    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    $("#add-youtube-video").click(function(){
        //alert("here");
        var myId = getId($("#video").val());
        /*alert(myId);*/
        $('#video-box').html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>');
        $('#youtubeVideoUpload').show();
        $('#youtubeVideoUploaded').hide();
    });
    $("#youtubeVideoUpload").click(function(){
        $.ajax({
            type: 'POST',
            url: "/upload/VIDEO/YOUTUBE/"+getId($("#video").val())+"/item/"+$("#itemId").val(),
            contentType: 'application/json',
            processData: false,
            crossDomain: true,
            headers: { 'Access-Control-Allow-Headers': 'x-requested-with' ,'Access-Control-Allow-Origin' : '*'}
        })
        .done(function(result) {
            //alert('Video added successfully');
            $('#youtubeVideoUpload').hide();
            $('#youtubeVideoUploaded').show();
            console.log(result);
        })
        .fail(function() {
            alert('Youtube video upload failed');
            console.log( arguments);
        });
    });
});

var videoId = 'videoOnUpload';
var scaleFactor = 0.25;
var snapshots = [];

/**
 * Captures a image frame from the provided video element.
 *
 * @param {Video} video HTML5 video element from where the image frame will be captured.
 * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
 *
 * @return {Canvas}
 */
function capture(video, scaleFactor) {
	if(scaleFactor == null){
		scaleFactor = 1;
	}
	var w = video.videoWidth * scaleFactor;
	var h = video.videoHeight * scaleFactor;
	var canvas = document.createElement('canvas');
		canvas.width  = w;
	    canvas.height = h;
	var ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, w, h);
    return canvas;
}

/**
 * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
 */
function shoot(){
    //alert("shoot called");
	var video  = document.getElementById(videoId);
	var output = document.getElementById('output');
	var canvas = capture(video, scaleFactor);
		/*canvas.onclick = function(){
			window.open(this.toDataURL());
		};*/
	snapshots.unshift(canvas);
	output.innerHTML = '';
	for(var i=0; i<1; i++){
		output.append(snapshots[i]);
	}
	$("#uploadScreenshotButton").css("display","table");
}
//currently not in use
function addTumbnailImage(videoName){
    //alert(videoName);
    var canvas = document.createElement('canvas');
    var dataURL = canvas.toDataURL().replace("image/png", "image/octet-stream");
    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];
    for(var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file=new Blob([new Uint8Array(array)], {type: 'image/png'});


    var formdata = new FormData();
    formdata.append("thumbnail.png", file);

    console.log(dataURL);
    $.ajax({
    type: "POST",
    url: "/upload/VIDEO/"+videoName+"/thumbnail",
    data: formdata,
    processData: false,
    contentType: false
    }).done(function(o) {
        console.log('saved');
        // If you want the file to be visible in the browser
        // - please modify the callback in javascript. All you
        // need is to return the url to the file, you just saved
        // and than put the image in your browser.
    });
}