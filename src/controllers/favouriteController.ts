
import userModel from "../models/user.model";

export const addFavourite = async (req:any, res:any) => {
 try {
   const user = await userModel.findById(req.user.id);
   user!.favorites.push(req.params.id);
   await user!.save();
   res.json(user);
 } catch (error) {
    console.error("add favoutite Error:", error);
    res.status(500).json({ message: "Internal server error." });
 }
};

export const getFavourites = async (req:any, res:any) => {
try {
    const user = await userModel.findById(req.user.id).populate("favorites");
    res.json(user!.favorites);
} catch (error) {
    console.error("Get favourite Error:", error);
    res.status(500).json({ message: "Internal server error." });
}
};

export const removeFavourite = async (req:any, res:any) => {
try {
  await userModel.updateOne(
    { _id: req.user.id },
    { $pull: { favorites: req.params.id } }
  );
  res.json({ message: "Removed from favorites" });
} catch (error) {
    console.error("remove favourite Error:", error);
    res.status(500).json({ message: "Internal server error." });
}
};
