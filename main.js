// main.js
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  
    const subscribeButton = document.getElementById('subscribeButton');
    subscribeButton.addEventListener('click', () => {
      subscribeToPushNotifications();
    });
  
    function subscribeToPushNotifications() {
      navigator.serviceWorker.ready
        .then(function(registration) {
          return registration.pushManager.getSubscription()
            .then(function(subscription) {
              if (subscription) {
                return subscription;
              }
  
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_KEY') // Replace with your public key
              });
            });
        })
        .then(function(subscription) {
          console.log('User is subscribed:', subscription);
        })
        .catch(function(error) {
          console.error('Failed to subscribe the user:', error);
        });
    }
  
    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
  
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  } 
  