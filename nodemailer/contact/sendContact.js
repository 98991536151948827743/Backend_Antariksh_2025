import { transporter } from "../nodemailerSetup.js";
import  generateContactEmail  from "./generateContactThankYouEmail.js";

export const sendContactEmail = async (name, email) => {
  try {
    const { subject, html } = generateContactEmail(name);
    const mailer = transporter();
    await mailer.sendMail({
      from: `"Antariksh" <${mailer.options.auth.user}>`,
      to: email,
      subject,
        html,
        });
        console.log(`📩 Contact email sent to ${email} from ${mailer.options.auth.user}`);
        return { success: true, message: "✅ Contact email sent successfully." };
    } catch (error) {
        console.error("❌ Error sending contact email:", error);
        return { success: false, message: "❌ Failed to send contact email." };
    }
};

export default sendContactEmail;
