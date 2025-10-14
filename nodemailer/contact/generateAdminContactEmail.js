

const generateAdminContactEmail = (contact = {}) => {
  const {
    name = "Unknown",
    email = "N/A",
    phone = "N/A",
    subject = "No Subject",
    message = "No Message",
    issue = "General",
    locationInfo = {},
    deviceInfo = {},
  } = contact;

  const city = locationInfo?.city || "N/A";
  const region = locationInfo?.region || "N/A";
  const country = locationInfo?.country || "N/A";
  const latitude = locationInfo?.latitude || "N/A";
  const longitude = locationInfo?.longitude || "N/A";
  const mapLink = locationInfo?.mapLink || "#";

  const deviceName = deviceInfo?.device || "Unknown Device";
  const os = deviceInfo?.os || "Unknown OS";
  const browser = deviceInfo?.browser || "Unknown Browser";

  const html = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width:700px; margin:auto; padding:25px; background:#0b0c1b; color:#ffffff; border-radius:16px; box-shadow: 0 0 15px rgba(0, 224, 255, 0.4);">
    
    <h2 style="color:#00e0ff; text-align:center; margin-bottom:25px;">📬 New Contact Form Submission</h2>
    
    <div style="background:#111329; padding:15px; border-radius:12px; margin-bottom:20px;">
      <h3 style="color:#00e0ff; border-bottom:1px solid #222; padding-bottom:5px;">👤 User Info</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Issue Type:</strong> ${issue}</p>
    </div>

    <div style="background:#111329; padding:15px; border-radius:12px; margin-bottom:20px;">
      <h3 style="color:#00e0ff; border-bottom:1px solid #222; padding-bottom:5px;">📍 Location Info</h3>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Latitude:</strong> ${latitude}</p>
      <p><strong>Longitude:</strong> ${longitude}</p>
      <p><strong>Map Link:</strong> <a href="${mapLink}" target="_blank" style="color:#00e0ff; text-decoration:underline;">Open Map</a></p>
    </div>

    <div style="background:#111329; padding:15px; border-radius:12px; margin-bottom:20px;">
      <h3 style="color:#00e0ff; border-bottom:1px solid #222; padding-bottom:5px;">💻 Device Info</h3>
      <p><strong>Device:</strong> ${deviceName}</p>
      <p><strong>OS:</strong> ${os}</p>
      <p><strong>Browser:</strong> ${browser}</p>
      <pre style="background:#0d0e1a; padding:10px; border-radius:10px; overflow-x:auto; color:#ffffff;">
${JSON.stringify(deviceInfo, null, 2)}
      </pre>
    </div>

    <p style="text-align:center; font-size:12px; color:#607d8b; margin-top:20px;">
      © 2025 Antariksh. All rights reserved.
    </p>

  </div>
  `;

  const mailSubject = `📬 New Contact Submission from ${name}`;

  return { subject: mailSubject, html };
};

export default generateAdminContactEmail;
