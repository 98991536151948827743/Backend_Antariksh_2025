import axios from 'axios';
import Contact from '../../model/contact.model.js';
import sendContactEmail from '../../nodemailer/contact/sendContact.js';
import sendAdminContactEmail from '../../nodemailer/contact/sendAdmin.js';

async function getLocationFromIP(ip) {
  try {
    const res = await axios.get(`https://ipapi.co/${ip}/json/`);
    return {
      ip,
      city: res.data.city,
      region: res.data.region,
      country: res.data.country_name,
      countryCode: res.data.country_code,
      latitude: res.data.latitude,
      longitude: res.data.longitude,
      timezone: res.data.timezone,
      isp: res.data.org
    };
  } catch {
    return { ip };
  }
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0].trim()
    || req.headers['x-real-ip']
    || req.socket.remoteAddress
    || req.connection.remoteAddress
    || req.ip;
}

export  const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, issue, deviceInfo } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Fill required fields' });
    }

    const clientIP = getClientIP(req);
    const ipLocationInfo = await getLocationFromIP(clientIP);

    // ---------- RATE LIMITER: max 3 messages per day ----------
    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    const todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);

    const messagesToday = await Contact.countDocuments({
      $or: [{ email }, { "requestInfo.ip": clientIP }],
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    if (messagesToday >= 3) {
      return res.status(429).json({
        success: false,
        message: 'You can only send 3 messages per day. Please try tomorrow.'
      });
    }



    // Merge frontend precise location if available
    let finalLocation = { ...ipLocationInfo };

    // If frontend precise location exists and is valid, use it
    if (deviceInfo?.preciseLocation && !deviceInfo.preciseLocation.error) {
    finalLocation = {
        ...finalLocation,
        ...deviceInfo.preciseLocation, // latitude, longitude, accuracy, etc.
    };
    }

    // Ensure mapLink is set
    finalLocation.mapLink = finalLocation.mapLink 
    || (finalLocation.latitude && finalLocation.longitude
        ? `https://www.google.com/maps?q=$@${finalLocation.latitude},${finalLocation.longitude}`
        : null);

    

    const requestInfo = {
    userAgent: deviceInfo?.userAgent || req.headers['user-agent'],
    vendor: deviceInfo?.vendor || 'unknown',
    referer: req.headers['referer'] || req.headers['referrer'],
    acceptLanguage: req.headers['accept-language'],
    origin: req.headers['origin'],
    ip: clientIP 
    };


    const contact = new Contact({
      name, email, phone, subject, message, issue,
      deviceInfo,
      locationInfo: finalLocation,
      requestInfo
    });

    
const content = {
  name,
  email,
  phone,
  subject,
  message,
  issue,
  locationInfo: finalLocation || {},  // fallback to empty object
  deviceInfo: deviceInfo || {},       // fallback to empty object
};

try {
  await sendContactEmail(name, email, phone, subject, message, issue, finalLocation, deviceInfo); // assuming sendContactEmail is updated similarly
} catch (err) {
  console.error("❌ Failed to send user contact email:", err);
}

try {
  await sendAdminContactEmail(content);
} catch (err) {
  console.error("❌ Failed to send admin contact email:", err);
}


    await contact.save();
    res.status(201).json({ success: true, message: 'Message sent!', contactId: contact._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
