const GenerateDto = require("./generate.dto");
const GenericDto = require("./generic.dto");

class Dto {
  get generic() {
    return new GenericDto();
  }
  get generate() {
    return new GenerateDto();
  }
}

module.exports = Dto;