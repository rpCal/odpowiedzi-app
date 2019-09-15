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
                console.log('long press - ' + itemText);

                //copyTextToClipboard(itemText);
                // Clipboard.copy('text to be copied');
                // var audioElement = document.getElementById("copied");
                // if (!audioElement) {
                //     alert('nie ma pliku')
                // }

                var audioElement = document.querySelector("#copied audio")
                if (!audioElement) {
                    alert('Brakuje pliku audio')
                }

                // alert('osluch')
                // audioElement.pause();
                // audioElement.currentTime = 0;
                // audioElement.play();

            });

            node.addEventListener('click', function(e) {

                var itemText = this.getAttribute("data-text")
                console.log('click - ' + itemText)
                    // alert('text to ' + itemText)
                    // copyTextToClipboard(itemText);
                    // alert('skopiowano')
                    // Clipboard.copy('text to be copied');
                var audioElement = this.querySelector("audio")
                if (!audioElement) {
                    alert('Brakuje pliku audio')
                }
                // audioElement.pause();
                // audioElement.currentTime = 0;
                audioElement.play();



                var copy = function(e) {
                    e.preventDefault();
                    if (e.clipboardData) {
                        e.clipboardData.setData('text/plain', itemText);
                        alert("Skopiowanio tekst: " + itemText)
                    } else if (window.clipboardData) {
                        window.clipboardData.setData('Text', itemText);
                        alert("Skopiowanio tekst:  " + itemText)
                    }
                }
                window.addEventListener('copy', copy);
                document.execCommand('copy');
                window.removeEventListener('copy', copy);

                // copyTextToClipboard(itemText)
            });

            node.addEventListener("mousedown", window.mousedownRippleListener);
        }

        // var clipboard = new ClipboardJS('.items-list-wrapper .item', {
        //     text: function(trigger) {
        //         return trigger.getAttribute('data-text');
        //     }
        // });

        // clipboard.on('success', function(e) {
        //     // console.info('Action:', e.action);
        //     // console.info('Text:', e.text);
        //     // console.info('Trigger:', e.trigger);

        //     // alert('Skopiowano');
        //     e.clearSelection();
        // });

        // clipboard.on('error', function(e) {
        //     alert('Nie udalo sie skopiowac tekstu');
        //     // console.error('Action:', e.action);
        //     // console.error('Trigger:', e.trigger);
        // });

        function copyStringToClipboard(str) {
            // Create new element
            var el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = str;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = { position: 'absolute', left: '-9999px' };
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand('copy');
            // Remove temporary element
            document.body.removeChild(el);
        }


        function fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                alert('Fallback: Copying text command was ' + msg);
                // console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
                alert('Fallback: Oops, unable to copy');
                // console.error('Fallback: Oops, unable to copy', err);
            }

            document.body.removeChild(textArea);
        }

        function copyTextToClipboard(text) {
            if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(text);
                return;
            }
            navigator.clipboard.writeText(text).then(function() {
                alert("Async: Copying to clipboard was successful!")
                    // console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                alert('Async: Could not copy text: ');
                // console.error('Async: Could not copy text: ', err);
            });
        }
    }
})();



// window.Clipboard = (function(window, document, navigator) {
//     var textArea,
//         copy;

//     function isOS() {
//         return navigator.userAgent.match(/ipad|iphone/i);
//     }

//     function createTextArea(text) {
//         textArea = document.createElement('textArea');
//         textArea.value = text;
//         document.body.appendChild(textArea);
//     }

//     function selectText() {
//         var range,
//             selection;

//         if (isOS()) {
//             range = document.createRange();
//             range.selectNodeContents(textArea);
//             selection = window.getSelection();
//             selection.removeAllRanges();
//             selection.addRange(range);
//             textArea.setSelectionRange(0, 999999);
//         } else {
//             textArea.select();
//         }
//     }

//     function copyToClipboard() {
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//     }

//     copy = function(text) {
//         createTextArea(text);
//         selectText();
//         copyToClipboard();
//     };

//     return {
//         copy: copy
//     };
// })(window, document, navigator);