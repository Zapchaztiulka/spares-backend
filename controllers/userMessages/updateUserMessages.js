const {
  userMessage: { UserMessage },
  user: { User },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { type, status, adminComment, userMessageIds } = req.body;
  const { id: adminId } = req.user;

  if (!type && !status && !adminComment) {
    throw HttpError(
      400,
      'At least one of type, status, or adminComment must be provided for update',
    );
  }

  const admin = await User.findById(adminId);
  await checkNotFound(admin, adminId, 'Manager');

  const userMessages = await UserMessage.find({ _id: { $in: userMessageIds } });
  if (userMessages.length !== userMessageIds.length) {
    throw HttpError(404, 'One or more user message IDs not found');
  }

  const updatedUserMessages = [];

  for (const msg of userMessages) {
    const updateFields = {};

    if (type) {
      updateFields.type = type;
    }

    if (status) {
      updateFields.status = status;
    }

    if (!updateFields.adminData) {
      updateFields.adminData = {};
    }

    if (adminComment) {
      updateFields.adminData.adminComment = adminComment;
    }

    updateFields.adminData.adminId = adminId;
    updateFields.adminData.adminName = admin.username;
    updateFields.adminData.adminSurname = admin.userSurname;

    const updatedMsg = await UserMessage.findByIdAndUpdate(
      msg._id,
      { $set: updateFields },
      { new: true },
    );

    updatedUserMessages.push(updatedMsg);
  }

  res.json(updatedUserMessages);
};
