(function() {
    domReady(function(event) {
        onAppReady();
    });

    var onAppReady = function() {
        var categoriesNodes = document.querySelectorAll('.items-list-wrapper .item');
        if (!categoriesNodes) {
            alert("Brak elementow w kategorii")
        }
        var categories = Array.prototype.slice.call(categoriesNodes);

        for (var i = 0; i < categories.length; i++) {
            var node = categories[i];

            node.addEventListener('long-press', function(e) {
                var itemText = this.getAttribute("data-text")
                console.log('long press - ' + itemText)
                copyTextToClipboard(itemText);
                var audioElement = document.querySelector("#copied");
                if (audioElement !== undefined && audioElement !== null) {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                    audioElement.play();
                }
            });

            node.addEventListener('click', function(e) {
                var itemText = this.getAttribute("data-text")
                console.log('click - ' + itemText)
                var audioElement = this.querySelector("audio")
                if (!audioElement) {
                    alert('Brakuje pliku audio')
                }
                audioElement.pause();
                audioElement.currentTime = 0;
                audioElement.play();
            });

            node.addEventListener("mousedown", window.mousedownRippleListener);
        }
    }
})();