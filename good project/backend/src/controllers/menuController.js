import MenuItem from '../models/MenuItem.js';
import cloudinary from '../config/cloudinaryConfig.js';

// Sanitize regex input to prevent ReDoS attacks
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'menu-items',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};

export const getMenuItems = async (req, res, next) => {
  try {
    const { category, vegan, vegetarian, glutenFree, spicy, minPrice, maxPrice, search, available } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (available !== undefined) filter.available = available === 'true';

    if (vegan === 'true') filter['dietary.vegan'] = true;
    if (vegetarian === 'true') filter['dietary.vegetarian'] = true;
    if (glutenFree === 'true') filter['dietary.glutenFree'] = true;
    if (spicy === 'true') filter['dietary.spicy'] = true;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      const sanitizedSearch = escapeRegex(search.trim());
      filter.$or = [
        { name: { $regex: sanitizedSearch, $options: 'i' } },
        { description: { $regex: sanitizedSearch, $options: 'i' } },
        { ingredients: { $in: [new RegExp(sanitizedSearch, 'i')] } }
      ];
    }

    const menuItems = await MenuItem.find(filter).sort({ popularity: -1, createdAt: -1 });

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const menuData = { ...req.body };

    // Handle image upload if file is present
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      menuData.image = result.secure_url;
      menuData.cloudinaryId = result.public_id;
    }

    const menuItem = await MenuItem.create(menuData);
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const updateData = { ...req.body };

    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (menuItem.cloudinaryId) {
        await deleteFromCloudinary(menuItem.cloudinaryId);
      }

      // Upload new image
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
      updateData.cloudinaryId = result.public_id;
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updatedMenuItem });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Delete image from Cloudinary if it exists
    if (menuItem.cloudinaryId) {
      await deleteFromCloudinary(menuItem.cloudinaryId);
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    next(error);
  }
};


