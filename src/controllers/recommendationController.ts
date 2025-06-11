import userModel from "../models/user.model";


export const recommendProperty = async (req:any, res:any) => {
 try {
   const { email } = req.body;
   const recipient = await userModel.findOne({ email });
   if (!recipient) return res.status(404).json({ message: "User not found" });
 
   recipient.recommendationsReceived.push({
     property: req.params.id,
     recommendedBy: req.user.id
   });
   await recipient.save();
   res.json({ message: "Recommended!" });
 } catch (error) {
    console.error("Recommendations Error:", error);
    res.status(500).json({ message: "Internal server error." });
 }
};

export const getRecommendations = async (req: any, res: any) => {
  try {
    const user = await userModel.findById(req.user.id).populate([
      {
        path: "recommendationsReceived.property",
        select: "title",
      },
      {
        path: "recommendationsReceived.recommendedBy",
        select: "name email",
      }
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user.recommendationsReceived);
  } catch (error) {
    console.error("Get Recommendations Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
