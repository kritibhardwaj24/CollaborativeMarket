const router = require("express").Router();
const Notification = require("../models/notificationsModel");
const authMiddleware = require("../middlewares/authMiddleware");

//Add a new notification
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({ success: true, message: "Notification added successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Get all notifications by a user
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({ success: true, data: notifications });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

//Delete a notification
router.delete("/delete-notification", authMiddleware, async (req, res) => {
  try {
    await Notification.finByIDandDelete(req.params.id);
    res.send({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

//Read all notifications by user
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.body.userId,
        read: false,
      },
      { $set: { read: true } }
    );
    res.send({ success: true, message: "Job done! Notified you!" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
