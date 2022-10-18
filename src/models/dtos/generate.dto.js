class GenerateDto {
  product({ title, price, thumbnail, description, category }) {
    return { 
      title, 
      price: +price, 
      description,
      thumbnail,
      category
    };
  }
  stock(data) {
    return {
      ...this.product(data),
      items: [],
      stock: 0
    };
  }
  cart({ idUser, address }) {
    return { 
      author: idUser, 
      items: [],
      address
    };
  }
  voucher({ _id: idOrder, createdAt }, { products, total}, { _id: idUser, firstname, lastname, email, address }) {
    return ({
      _id: idOrder,
      owner: { 
        _id: idUser, 
        email,
        fullname: `${firstname} ${lastname}`
      },
      products,
      total,
      dateOfDelivery: createdAt,
      address
    });
  }
  personalData({ email, firstname, lastname, phone, birth, address }) {
    return ({
      age: new Date().getFullYear() - new Date(birth).getFullYear(),
      fullName: `${firstname} ${lastname}`,
      phone,
      birth: new Date(birth),
      email,
      address
    });
  }
  user({ email, password }, { firstname, lastname, avatar, phone, birth, address }) {
    const dataUser = {
      ...this.personalData({ email, firstname, lastname, phone, birth, address }),
      firstname,
      lastname,
      avatar,
      password,
      myCarts: []
    }
    delete dataUser.fullName;
    return dataUser;
  }
  order({ order, email, items, address }) {
    return ({
      order: +order,
      author: email,
      items,
      status: "generada",
      address
    })
  }

  message(idUser, { author, nickname, type, message, route }) {
    const response = {
      renderUserAccount: idUser,
      author,
      nickname: nickname || "e-Commerce",
      type: type || "sistema",
      message
    }
    if(route) response.route = route;
    return response;
  }
};

module.exports = GenerateDto;