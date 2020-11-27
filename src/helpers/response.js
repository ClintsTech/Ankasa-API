const response = {
  success: (value, res, msg) => {
    const data = {
      success: true,
      status: 200,
      message: msg,
      data: value,
    };
    res.json(data);
  },
  failed: (value, res, msg) => {
    const data = {
      success: false,
      status: 400,
      message: msg,
      data: value,
    };
    res.json(data);
  },
};
module.exports = response;
