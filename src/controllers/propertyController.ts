import Property from "../models/property.model";
import mongoose from "mongoose"
import { redisClient } from "../config/database";

export const createProperty = async (req:any, res:any) => {
 try {
   const property = await Property.create({ ...req.body, createdBy: req.user.id });
   res.json(property);
 } catch (error) {
    console.error("Create property Error:", error);
    res.status(500).json({ message: "Internal server error." });
 }
};

export const getProperties = async (req:any, res:any) => {
try {
    const key = `props:${JSON.stringify(req.query)}`;
    const cached = await redisClient.get(key);
    if (cached) return res.json(JSON.parse(cached));
  
    const properties = await Property.find(req.query);
    await redisClient.setEx(key, 3600, JSON.stringify(properties));
    res.json(properties);
} catch (error) {
    console.error("get properties Error:", error);
    res.status(500).json({ message: "Internal server error." });
}
};





export const updateProperty = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }
    const property:any = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    if (property.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    const updated = await Property.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Update Property Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const deleteProperty = async (req:any, res:any) => {
 try {
    const { id } = req.params;
  console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID format." });
    }

    const property:any = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    if (property.createdBy.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    await property.deleteOne(); // Cleaner than findByIdAndDelete here

    return res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error("Delete Property Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const advancedSearch = async (req:any, res:any) => {
try {
    const {
      type,
      minPrice,
      maxPrice,
      state,
      city,
      bedrooms,
      bathrooms,
      furnished,
      isVerified,
      tags,
    } = req.query;
  
    const query: any = {};
  
    if (type) query.type = type;
    if (state) query.state = state;
    if (city) query.city = city;
    if (bedrooms) query.bedrooms = Number(bedrooms);
    if (bathrooms) query.bathrooms = Number(bathrooms);
    if (furnished) query.furnished = furnished === "true";
    if (isVerified) query.isVerified = isVerified === "true";
    if (tags) query.tags = { $in: tags.toString().split(",") };
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
  
    const properties = await Property.find(query);
    res.json(properties);
} catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Internal server error." });
}
};
