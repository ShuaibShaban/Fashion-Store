class Category < ApplicationRecord
    has_many :products_categories
    has_many :products, through: :products_categories

    validates :name, {
        presence: true,
        length: {minimum:3}
    }
end
