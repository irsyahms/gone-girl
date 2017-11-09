module.exports =  {
  convertAge: function(birthYear, releasedYear) {
    let age = releasedYear - birthYear;
    return `${age} years old`;
  }
}
