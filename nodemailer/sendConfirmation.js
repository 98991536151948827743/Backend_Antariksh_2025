import { transporter } from './nodemailerSetup.js';
import { generateConfirmationEmail } from './generateConfirmationEmail.js';

const sendConfirmationEmail = async (email, name) => {
  try {
    const { subject, html } = generateConfirmationEmail(name);
    const mailer = transporter();
    await mailer.sendMail({
      from: `"Antariksh" <${mailer.options.auth.user}>`,
      to: email,
      subject,
      html,
    });
    console.log(`📩 Confirmation email sent to ${email} from ${mailer.options.auth.user}`);
    return { success: true, message: "✅ Confirmation email sent successfully." };
  } catch (error) {
    console.error("❌ Error sending confirmation email:", error);
    return { success: false, message: "❌ Failed to send confirmation email." };
  }
};

export default sendConfirmationEmail;