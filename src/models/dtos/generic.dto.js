// const { v4: uuid } = require("uuid");

class GenericDto {
  create(data) {
    return ({
      ...data,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    })
  }
  update(data) {
    return ({
      ...data,
      updatedAt: new Date(Date.now())
    })
  }
  mix(data1, data2) {
    return ({
      ...data1,
      ...data2
    })
  }
  add(data1, data2) {
    const data = data1;
    data[`${data2}`] = data2;
    return data;
  }
}

module.exports = GenericDto;