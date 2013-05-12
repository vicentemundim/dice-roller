(function(root, Backbone, _) {
  if (_(root.DiceRoller).isUndefined()) {
    root.DiceRoller = {}
  }

  Die = Backbone.Model.extend({
    roll: function () {
      var sides   = this.get('sides'),
          initial = this.get('initial'),
          face    = Math.floor((Math.random() * sides)) + initial

      this.set({ face: face })
    }
  })

  root.DiceRoller.Die = Die
})(window, Backbone, _)