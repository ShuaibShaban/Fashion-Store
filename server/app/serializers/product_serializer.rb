class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_url, :gender, :description
  has_many :reviews
  has_many :categories
end
