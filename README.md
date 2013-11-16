# DiceRoller

DiceRoller is an AngularJS component that adds a `<dice-roller>` directive.

In order to use it, you need to inject it as a dependency for you app or controller:

    angular.module('myApp', ['diceRoller'])

Then you just add a directive in you HTML:

    <dice-roller sides="10" name="my-dice"></dice-roller>

It will generate a 3d 10-sided dice that rolls when clicked. For now there are only 10 and 20 sides dices implemented.

Check out usage examples in the `spec/dummy` application.

## Installing

Add gem to your gemfile:

    gem 'dice-roller', git: "https://github.com/vicentemundim/dice-roller.git"

Then run `bundle install`.

Add to your `application.js`:

    //= require dice-roller/all

And in your `application.css`:

    *= require dice-roller

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

[MIT-LICENSE](https://github.com/vicentemundim/dice-roller/blob/master/LICENSE.txt)

