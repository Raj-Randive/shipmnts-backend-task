const Email = require("../models/Email");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "preet.nxg@gmail.com",
    pass: "yove ojjc ozjw zqgt", // Use an app password if 2FA is enabled
  },
  debug: true, // Enable debug output
});

// Function to send email
const sendEmail = async (email) => {
  const { recipient, subject, body, attachments } = email;
  try {
    console.log("Sending email:", email);
    await transporter.sendMail({
      from: '"Preet Chandak" <preet.nxg@gmail.com>',
      to: recipient,
      subject: subject,
      text: body,
      attachments: attachments.length > 0 ? attachments : [], // Only attach if there are any
    });
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error(`Failed to send email to ${recipient}:`, error);
  }
};

// Schedule Email
exports.scheduleEmail = async (req, res) => {
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
      schedule.scheduleJob(jobName, scheduleDate, () => {
        console.log(`Job triggered: sending email to ${recipient}`);
        sendEmail(newEmail);
      });
    } else {
      const rule = new schedule.RecurrenceRule();
      rule.hour = scheduleDate.getHours();
      rule.minute = scheduleDate.getMinutes();

      if (recurrence === "daily") {
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending daily email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === "weekly") {
        rule.dayOfWeek = recurrenceDetails.days; // array of days [0, 1, 2, ...]
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending weekly email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === "monthly") {
        rule.date = recurrenceDetails.dates; // array of dates [1, 15, 28, ...]
        schedule.scheduleJob(jobName, rule, () => {
          console.log(`Job triggered: sending monthly email to ${recipient}`);
          sendEmail(newEmail);
        });
      } else if (recurrence === "quarterly") {
        rule.month = [0, 3, 6, 9]; // January, April, July, October
        rule.date = recurrenceDetails.dates; // array of dates [1, 15, ...]
        schedule.scheduleJob(jobName, rule, () => {
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
};

// Get All Scheduled Emails
exports.getEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get Single Scheduled Email
exports.getEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ msg: "Email not found" });
    res.json(email);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Cancel Scheduled Email
exports.cancelEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ msg: "Email not found" });

    await Email.deleteOne({ _id: req.params.id });

    // Cancel the scheduled job if it exists
    const job = schedule.scheduledJobs[req.params.id];
    if (job) {
      job.cancel();
    }

    res.json({ msg: "Email canceled" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
