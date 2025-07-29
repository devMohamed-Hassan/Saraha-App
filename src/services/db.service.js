export const findOne = async (model, filter = {}, populate = []) => {
  let query = model.findOne(filter);
  if (populate.length) query = query.populate(populate);
  return await query;
};

export const findById = async (model, id, populate = []) => {
  let query = model.findById(id);
  if (populate.length) query = query.populate(populate);
  return await query;
};

export const find = async (model, filter = {}, populate = []) => {
  let query = model.find(filter);
  if (populate.length) query = query.populate(populate);
  return await query;
};
export const create = async (model, data = {}) => {
  const doc = await model.create(data);
  return doc;
};
export const findOneAndUpdate = async (
  model,
  filter = {},
  update = {},
  options = {},
  populate = []
) => {
  let query = model.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true,
    ...options,
  });

  if (populate.length) query = query.populate(populate);

  return await query;
};
export const findByIdAndUpdate = async (
  model,
  id,
  update = {},
  options = {},
  populate = []
) => {
  let query = model.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    ...options,
  });

  if (populate.length) query = query.populate(populate);

  return await query;
};
export const findOneAndDelete = async (
  model,
  filter = {},
  options = {},
  populate = []
) => {
  let query = model.findOneAndDelete(filter, options);

  if (populate.length) query = query.populate(populate);

  return await query;
};

export const findByIdAndDelete = async (
  model,
  id,
  options = {},
  populate = []
) => {
  let query = model.findByIdAndDelete(id, options);

  if (populate.length) query = query.populate(populate);

  return await query;
};