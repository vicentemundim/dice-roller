$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "dice-roller/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "dice-roller"
  s.version     = DiceRoller::VERSION
  s.authors     = ["Vicente Mundim"]
  s.email       = ["vicente.mundim@gmail.com"]
  s.summary     = "A javascript dice roller component."
  s.description = "A javascript dice roller component."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 3.2.13"

  s.add_development_dependency "sqlite3"
end
