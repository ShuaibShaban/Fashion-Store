class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comments, :rating, :created_at
  belongs_to :user
  belongs_to :product
end
