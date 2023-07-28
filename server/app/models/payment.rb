class Payment < ApplicationRecord
    belongs_to :order
    enum status: [:paid, :failed]
    attribute :payment_method, :string
end
