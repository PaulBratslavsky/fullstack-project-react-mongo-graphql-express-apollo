const isOwner = (req, userId) =>
  req._id.toString() !== userId.toString() ? false : true;

module.exports = isOwner;
