const Crypto = require('../models/Crypto');

exports.create = (userData) => Crypto.create(userData);

exports.getAll = () => {
   return Crypto.find({}).lean()
}
exports.getOneDetailed = (id) => {

   return Crypto.findById(id).lean()
}

exports.updateOne = (id, data) => {

   return Crypto.findByIdAndUpdate(id, data);
}

exports.deleteOne = (id) => {

   return Crypto.findByIdAndRemove(id)
}
exports.getOne = (id) => {

   return Crypto.findById(id)
}

exports.findAllByName = (name) => {

  return Crypto.find({name}).lean();
}
exports.findAllByPaymentMethod = (paymentMethod) => {

   return Crypto.find({paymentMethod}).lean();
 }