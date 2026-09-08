import LeadDistribution from "../models/LeadDistribution.js";

export const createLeadDistribution = async (req, res) => {
  try {
    const data = await LeadDistribution.create({
      PropertyType: req.body.PropertyType,
      PropertyName: req.body.PropertyName,
      AgentName: req.body.AgentName,
    });
    return res.json({ message: "Lead Successfully distributed", data });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
export const viewLeadDistribution = async (req, res) => {
  try {
    const data = await LeadDistribution.find();
    return res.json({ message: "Lead Successfully fetched", data });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
export const deleteLeadDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await LeadDistribution.findByIdAndDelete({ id });
    return res.json({ message: "Lead Successfully deleted", data });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
