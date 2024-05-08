function loadDetails(url, targetElement) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Insert the loaded content directly after the movie's section
            targetElement.insertAdjacentHTML('afterend', xhr.responseText);
        } else {
            console.error("Request failed: " + xhr.status);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
