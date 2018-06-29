# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create(
  [
    {
      username: 'Eduardo',
      password: '125'
    },
    {
      username: 'edugz94',
      password: '521'
    },
    {
      username: 'cbrzn',
      password: '653'
    },
    {
      username: 'Jean',
      password: '753'
    }
  ])