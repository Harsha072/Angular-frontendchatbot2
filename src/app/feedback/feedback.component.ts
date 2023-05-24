import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  private popupWindow: Window | null | undefined;

  constructor() { }

  // openPopup(): void {
  //   this.popupWindow = window.open(
  //     'https://form.jotform.com/231326555393054',
  //     'blank',
  //     'scrollbars=yes,toolbar=no,width=700,height=500'
  //   );

  //   // Listen for the message from the popup window
  //   window.addEventListener('message', this.handlePopupMessage);
  // }

  // handlePopupMessage = (event: MessageEvent): void => {
  //   if (event.data === 'PopupClosed') {
  //     // Perform your tracking logic here
  //     console.log('Popup tab was closed');
  //   }
  // };

}
