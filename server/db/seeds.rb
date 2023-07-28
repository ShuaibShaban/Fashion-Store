# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"

puts "Creating seed data..."

# Create some categories
Category.create!(name: "Shirts")
Category.create!(name: "Pants")
Category.create!(name: "Shoes")
Category.create!(name: "Dresses")

# Create some roles
Role.create!(name: "admin")
Role.create!(name: "customer")

# Create some users
10.times do
 username = Faker::Internet.username
  until username.length >= 4
    username = Faker::Internet.username
  end

  User.create!(
    username: username,
    email: Faker::Internet.email,
    password: "password",
  )
end

# Assign roles to users
 User.all.each do |user|
  user.roles << Role.find_by(name: "customer")
end

admin = User.create(username: "admin", email: "admin@example.com", password: "password")
admin.roles << Role.find_by(name: "admin")

3.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10..100.0),
    image_url: "https://images.pexels.com/photos/5771897/pexels-photo-5771897.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: Faker::Lorem.paragraph,
    gender: ["male", "female"].sample,
  )
end
3.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10..100.0),
    image_url:"https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: Faker::Lorem.paragraph,
    gender: ["male", "female"].sample,
  )
end
3.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10..100.0),
    image_url: "https://images.pexels.com/photos/609771/pexels-photo-609771.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: Faker::Lorem.paragraph,
    gender: ["male", "female"].sample,
  )
end
3.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 10..100.0),
    image_url: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: Faker::Lorem.paragraph,
    gender: "female",
  )
end

ProductsCategory.create!(product_id:1, category_id:1)
ProductsCategory.create!(product_id:2, category_id:1)
ProductsCategory.create!(product_id:3, category_id:1)
ProductsCategory.create!(product_id:4, category_id:2)
ProductsCategory.create!(product_id:5, category_id:2)
ProductsCategory.create!(product_id:6, category_id:2)
ProductsCategory.create!(product_id:7, category_id:3)
ProductsCategory.create!(product_id:8, category_id:3)
ProductsCategory.create!(product_id:9, category_id:3)
ProductsCategory.create!(product_id:10, category_id:4)
ProductsCategory.create!(product_id:11, category_id:4)
ProductsCategory.create!(product_id:12, category_id:4)



# Create some reviews
User.all.each do |user|
  3.times do
    product = Product.all.sample
    Review.create!(
      comments: Faker::Lorem.sentence,
      rating: rand(1..5),
      user_id: user.id,
      product_id: product.id,
    )
  end
end

#create orders
order1 = Order.create(total_amount: 31.98, status: "pending", address: "123 Main St.")
order2 = Order.create(total_amount: 41.98, status: "shipped", address: "456 Elm St.")


 
# Create some payments
Order.all.each do |order|
  Payment.create!(
    order_id: order.id,
    payment_method: ["credit card", "paypal", "cash"].sample,
    amount: order.total_amount,
    status: ["paid", "pending", "failed"].sample,
  )
end
puts "Done seeding!"
