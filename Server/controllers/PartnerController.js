import Partner from '../models/Partner.js';

export const registerPartner = async (req, res) => {
  try {
    const { name, address, stateName, cityName, contactNo, email } = req.body;
    console.log('Received partner registration data:', req.body);

    // 1. Basic validation
    if (!name || !address || !stateName || !cityName || !contactNo || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

    // 2. Check for duplicate email
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(409).json({
        success: false,
        message: 'A partner with this email already exists.',
      });
    }

    // 3. Generate custom userId (Name + Last 4 digits of Phone)
    const formattedName = name.trim().toLowerCase().replace(/\s+/g, '');
    const cleanContact = contactNo.trim().replace(/\D/g, ''); // Extract numbers only
    const lastFourDigits = cleanContact.slice(-4);
    
    const generatedUserId = `${formattedName}${lastFourDigits}`;

    const firstThreeDigits = cleanContact.slice(0, 3);
    const generatedPassword = `${formattedName}${firstThreeDigits}`;

    // 4. Create document with auto-generated userId
    const newPartner = new Partner({
      name,
      address,
      stateName,
      cityName,
      contactNo,
      email,
      password: generatedPassword,
      userId: generatedUserId,
    });

    await newPartner.save();

    return res.status(201).json({
      success: true,
      message: 'Partner registered successfully!',
      data: newPartner,
    });
  } catch (error) {
    console.error('Error registering partner:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error. Failed to register partner.',
      error: error.message,
    });
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    return res.status(200).json({
      success: true,
      message: 'Partners retrieved successfully!',
      data: partners,
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error. Failed to fetch partners.',
      error: error.message,
    });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Partner deleted successfully!',
      data: partner,
    });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error. Failed to delete partner.',
      error: error.message,
    });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPartner = await Partner.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPartner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Partner updated successfully',
      data: updatedPartner,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};