import Subscriberinfo from "../models/Subscriber.js";
export const registerSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please porvide email" });
    }
    const existingSubscriver = await Subscriberinfo.findOne({ email });
    if (existingSubscriver) {
      return res.status(409).json({ message: "Existing Subscriber" });
    }
    const data = await Subscriberinfo.create({
      email,
    });
    return res.status(201).json({ message: "Subscriber Registered", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something wrong check console" });
  }
};
