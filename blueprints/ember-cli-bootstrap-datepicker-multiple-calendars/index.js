module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-bootstrap-datepicker');
  }
};
