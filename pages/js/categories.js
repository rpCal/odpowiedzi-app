(function() {
    domReady(function(event) {
        onAppReady();
    });

    var onAppReady = function() {
        var categoriesNodes = document.querySelectorAll('.categories-list-wrapper .category');
        if (!categoriesNodes) {
            alert("Brak elementow w kategorii")
        }
        var categories = Array.prototype.slice.call(categoriesNodes);

        for (var i = 0; i < categories.length; i++) {
            var node = categories[i];
            var longPress = function(e) {
                window.location.href = this.getAttribute("data-category");
            }
            var click = function(e) {
                var audioElement = this.querySelector('audio');
                if (!audioElement) {
                    alert('Brakuje pliku audio')
                }
                audioElement.pause();
                audioElement.currentTime = 0;
                audioElement.play();
            }

            node.addEventListener('long-press', longPress, false);

            node.addEventListener('click', click, false);

            node.addEventListener("mousedown", window.mousedownRippleListener);
        }
    }
})();