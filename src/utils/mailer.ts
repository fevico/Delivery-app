import transporter from "#/config/nodemailerConfig";


export function sendResetEmail(email: string, passwordResetToken: string): void {
    const mailOptions = {
      from: 'DeliveryApp',
      to: email,
      subject: 'Password Reset',
      text: `To reset your password, click on this link: http://localhost:3002/api/auth/reset-password/${passwordResetToken}`,
    };
    transporter.sendMail(mailOptions)

  }