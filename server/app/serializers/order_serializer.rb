class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status
  belongs_to :user
  belongs_to :product
end
