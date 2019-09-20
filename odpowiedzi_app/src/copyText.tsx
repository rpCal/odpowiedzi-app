export const copyText = (text, callback?) => {
  // @note: It should work on device: android 4
  var copy = function(e) {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData("text/plain", text);
      if (callback) {
        callback();
      }
    } else if ((window as any).clipboardData) {
      (window as any).clipboardData.setData("Text", text);
      if (callback) {
        callback();
      }
    }
  };
  window.addEventListener("copy", copy);
  document.execCommand("copy");
  window.removeEventListener("copy", copy);
};
