import { RecurrenceRule, scheduledJobs, scheduleJob } from "node-schedule";
import { createTransport } from "nodemailer";
import Email from "../models/email.model.js";

// Email Transporter Configuration using the service as Gmail
// If 2 factor authentication is on then create a app password and then integrate the password!!
const transporter = createTransport({
  service: "gmail",
  auth: {
    // add the credentials
    user: "randiveraj96@gmail.com",
    pass: "jwdh sptr jncw rvsq",
  },
  debug: true, // Enable debug output
});

// Function to send email which uses the transporter to send email
const sendEmail = async (email) => {
  const { recipient, subject, body, attachments } = email;
  try {
    // Using the transporter to send the mail
    const info = await transporter.sendMail({
      from: `"Raj Randive" <randiveraj96@gmail.com>`,
      to: recipient,
      subject: subject,
      text: body,
      attachments: attachments.length > 0 ? attachments : [], // If no attachments then do not send any attachments
    });
    console.log("Email sent with info", info);
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error(`Failed to send email to ${recipient}:`, error);
  }
};

// *********************************************************************************************************
// Schedule an Email according to the time
export async function scheduleEmail(req, res) {
  const {
    recipient,
    subject,
    body,
    scheduleTime,
    recurrence,
    recurrenceDetails,
    attachments,
  } = req.body;

  try {
    // Validate scheduleTime
    const scheduleDate = new Date(scheduleTime);
    if (isNaN(scheduleDate.getTime()) || scheduleDate <= new Date()) {
      return res
        .status(400)
        .json({ msg: "Schedule time must be a valid future date." });
    }

    const newEmail = new Email({
      recipient,
      subject,
      body,
      scheduleTime,
      recurrence,
      recurrenceDetails,
      attachments,
    });
    await newEmail.save();

    console.log(`Scheduling email for ${recipient} at ${scheduleDate}`);

    // Schedule email using node-schedule
    const jobName = newEmail._id.toString();

    if (recurrence === "none") {
      scheduleJob(jobName, scheduleDate, () => {
        console.log(`Job triggered: sending email to ${recipient}`);
        sendEmail(newEmail);
      });
    } else {
      const rule = new RecurrenceRule();
      rule.hour = scheduleDate.getHours();
      rule.minute = scheduleDate.getMinutes();

      if (recurrence === "daily") {
        scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending daily email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === "weekly") {
        rule.dayOfWeek = recurrenceDetails.days;
        scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending weekly email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === "monthly") {
        rule.date = recurrenceDetails.dates;
        scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending monthly email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === "quarterly") {
        rule.month = [0, 3, 6, 9];
        rule.date = recurrenceDetails.dates;
        scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending quarterly email to ${recipient}`);
          sendEmail(newEmail);
        });
      }
    }

    res.json(newEmail);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
