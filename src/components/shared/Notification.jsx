import { toast } from 'react-hot-toast';

export function notify(message) {
  const audio = new Audio('/notification.mp3'); // sound must be in /public
  audio.play();

  toast.custom((t) => (
    <div className={`mail-toast ${t.visible ? 'enter' : 'leave'}`}>
      <img src="/icons/icon-192x192.png" alt="Logo" className="mail-logo" />
      <div className="mail-content">
        <strong className="mail-title">📩 New Notification</strong>
        <div className="mail-text">{message}</div>
       <p className="mail-footer">Thank you ❤️</p>
      </div>
    </div>
  ), {
    position: 'bottom-right',
    duration: 5000,
  });
}
