export default function seDev() {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  
    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register(swUrl)
          .then(function (register) {
            console.log("Worker registration is successful:", register.scope);
          })
          .catch(function (err) {
            console.log("Service worker registration failed:", err);
          });
      });
    } else {
      console.log("Service worker is not supported by this browser.");
    }
  }
  