// TODO:
var comment_input_box = document.getElementById("comment-input-box");
var comment_input = document.getElementById("comment-input");
var comment_button = document.getElementById("comment-button");
var cancel_button = document.getElementById("cancel-button");
var comment_num = document.getElementById("comment-num");

// change button color if there is input
comment_input.addEventListener('input', evt => {
	if (comment_input.value.trim() == "") {
		// console.log("disabled");
		comment_button.style.backgroundColor = "#cccccc";
		comment_button.setAttribute('disabled', 'disabled');
	}
	else {
		// console.log("enabled");
		comment_button.style.backgroundColor = "#065fd4";
		comment_button.removeAttribute('disabled');
	}
});


var comment_group = document.getElementById("comment-group");
var num = 1;
// click on comment button
comment_button.addEventListener('click', evt => {
	var comment = document.createElement("div");
	var img = document.createElement("img");
	var comment_right = document.createElement("div");
	var comment_info = document.createElement("div");
	var name = document.createElement("span");
	var time = document.createElement("span");
	var p = document.createElement("p");

	comment.className = "comment";
	img.className = "comment-img";
	img.src = "images/user-icon.jpg";
	comment_right.className = "comment-right";
	name.className = "comment-name";
	name.textContent = "Toby Chen ";
	time.className = "comment-time";
	time.textContent = "現在";
	p.className = "comment-text";
	p.textContent = comment_input.value.trim();

	comment_info.appendChild(name);
	comment_info.appendChild(time);
	comment_right.appendChild(comment_info);
	comment_right.appendChild(p);
	comment.appendChild(img);
	comment.appendChild(comment_right);
	comment_group.appendChild(comment);
	num = num + 1;
	comment_num.textContent = num + "則留言";

	comment_input.value = "";
	comment_button.style.backgroundColor = "#cccccc";
	comment_button.setAttribute('disabled', 'disabled');
});

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
	comment_input.value = "";
	comment_button.style.backgroundColor = "#cccccc";
	comment_button.setAttribute('disabled', 'disabled');
})