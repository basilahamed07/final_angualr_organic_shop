import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-emailtest',
  templateUrl: './emailtest.component.html',
  styleUrl: './emailtest.component.css'
})
export class EmailtestComponent {


  constructor(private emailService: EmailService) { }

  sendEmail() {
    const emailData = {
      recipient_email: 'basilahamed46@gmail.com',
      subject: 'Test Subject',
      message: 'This is a test message.'
    };

    this.emailService.sendEmail(emailData).subscribe(response => {
      console.log('Email sent successfully', response);
    }, error => {
      console.error('Error sending email', error);
    });
  }
}
