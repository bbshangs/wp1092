// TODO:

const comment_input_box = document.getElementById("comment-input-box");
const comment_input = document.getElementById("comment-input");
const comment_button = document.getElementById("comment-button");
const cancel_button = document.getElementById("cancel-button");

// change button color if there is input
comment_input.addEventListener('input', evt => {
	if (comment_input.value == "") {
		comment_button.style.backgroundColor = "#cccccc";
		comment_button.style.disabled = "true";
	}
	else {
		comment_button.style.backgroundColor = "#065fd4";
		comment_button.style.disabled = "false";
	}
});

// click on comment button
// comment_button.addEventListener('click', evt => {
// 	var comment = createElement("div");
// 	var img = createElement("img");
// 	var comment_right = createElement("div");
// 	var comment_info = createElement("div");
// 	comment_input.value = "";
// 	comment_button.style.backgroundColor = "#cccccc";
// });


// <div class="comment">
// 	<img class="comment-img" src="images/user-icon.jpg"/>
// 	<div class="comment-right">
// 	    <div>
// 	        <span class="comment-name">Toby Chen</span>
// 	        <span class="comment-time">現在</span>
// 	    </div>
// 	    <p class="comment-text">I am Toby Chen. This is a comment.</p>
// 	</div>
// </div>

//show cancel and comment button after clicking input box
comment_input_box.addEventListener('click', evt => {
	// console.log("clicked");
	comment_button.style.display = "block";
	cancel_button.style.display = "block";
})

//hide cancel and comment button after clicking cancel button
cancel_button.addEventListener('click', evt => {
	comment_button.style.display = "none";
	cancel_button.style.display = "none";
})