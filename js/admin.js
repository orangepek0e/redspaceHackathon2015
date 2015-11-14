$( document ).ready(function() {
	var memes = ["plank", "cat", "yolo"];
	


	for (i = 0; i < memes.length; i++){
		// populate drop down with array of memes
		var memeList = document.getElementById("memeDrop");
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.textContent = memes[i];
		a.setAttribute('href', "#");
		li.setAttribute("id", memes[i])
		li.appendChild(a);
		memeList.appendChild(li);					   
		
	}
/*
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
*/
	// drop down menu
	$("#dropdownMenu2").on("click", "li a", function() {
		var platform = $(this).text();
		$("#dropdown_title2").html(platform);
		$('#printPlatform').html(platform);
	});   
	
	// TODO needs work to varify information being sent to the server for challenge
	$("#SendRequest").click(function() {
		var platform = $("#dropdown_title2").html();
		var isValid = (platform !== 'Pick a Meme!')

		if (!isValid) {
			alert('Please fill in missing details');
		} else {
			alert('Thank you for submitting');
		}
	});
	
	$(function () {
		$(":file").change(function () {
			if (this.files && this.files[0]) {
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
			}
		});
	});

	function imageIsLoaded(e) {
		$('#myImg').attr('src', e.target.result);
	};
	
	
	$("#uploadIt").click(function uploadIt() {
 var srcData;
		var file = document.getElementById('uploadImage').files[0];
		var meme = document.getElementById('dropdown_title2').innerHTML;
		var date = Date.now();
		var filesSelected = document.getElementById("uploadImage").files;
		if (filesSelected.length > 0)
		{
			var fileToLoad = filesSelected[0];

			var fileReader = new FileReader();

			fileReader.onload = function(fileLoadedEvent) {
				srcData = fileLoadedEvent.target.result; // <--- data: base64
				console.log(srcData + "1");
				var newImage = document.createElement('img');
				newImage.src = srcData;
				/*
				document.getElementById("imgTest").innerHTML = newImage.outerHTML;
				alert("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
				console.log("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);*/
				if(file && meme != "Pick a Meme!"){
					myDataRef.child('thumbnail').push({id: meme, name: file.name, image: srcData, date: date});
				} 

			}
			fileReader.readAsDataURL(fileToLoad);

		}
		console.log(srcData);

		
		/*if (false) {
			myDataRef.child('thumbnail').push({id: meme, name: file.name, image: encodeImageFileAsURL(file), date: date});
		}*/
	});
	
	function encodeImageFileAsURL(file){

		var filesSelected = document.getElementById("uploadImage").files;
		if (filesSelected.length > 0)
		{
			var fileToLoad = filesSelected[0];

			var fileReader = new FileReader();

			fileReader.onload = function(fileLoadedEvent) {
				srcData = fileLoadedEvent.target.result; // <--- data: base64
				console.log(srcData + "1");
				var newImage = document.createElement('img');
				newImage.src = srcData;
/*
				document.getElementById("imgTest").innerHTML = newImage.outerHTML;
				alert("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
				console.log("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);*/
				
			}
			fileReader.readAsDataURL(fileToLoad);
			
		}
	}
						 
});


/*
function encodeImageFileAsURL(){

	var filesSelected = document.getElementById("uploadImage").files;
	if (filesSelected.length > 0)
	{
		var fileToLoad = filesSelected[0];

		var fileReader = new FileReader();

		fileReader.onload = function(fileLoadedEvent) {
			var srcData = fileLoadedEvent.target.result; // <--- data: base64

			var newImage = document.createElement('img');
			newImage.src = srcData;

			//document.getElementById("imgTest").innerHTML = newImage.outerHTML;
			alert("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
			console.log("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
		}
		fileReader.readAsDataURL(fileToLoad);
	}
}*/