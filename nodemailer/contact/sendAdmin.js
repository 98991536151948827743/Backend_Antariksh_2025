import { transporter } from "../nodemailerSetup.js";
import generateAdminContactEmail from "./generateAdminContactEmail.js";

export const sendAdminContactEmail = async (contact = {}) => {
  try {
    const { subject: emailSubject, html } = generateAdminContactEmail(contact);

    const mailer = transporter();

    await mailer.sendMail({
      from: `"Antariksh" <${mailer.options.auth.user}>`,
      to: "raghvigupta2525@gmail.com", // make dynamic if needed
      subject: `${emailSubject} from ${contact.email || "Unknown Sender"}`,
      html,
    });

    console.log(`📩 Admin contact email sent to custom.rahul5g3d.official@gmail.com from ${contact.email || "Unknown Sender"}`);
    return { success: true, message: "✅ Admin contact email sent successfully." };
  } catch (error) {
    console.error("❌ Error sending admin contact email:", error);
    return { success: false, message: "❌ Failed to send admin contact email." };
  }
};

export default sendAdminContactEmail;
