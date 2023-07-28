class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :status, :amount
  belongs_to :order
end
